import {
    MultiFrameLoopAnimation,
    MultiFrameLinearAnimation,
    LoopAnimation,
    aofb,
    aisofb,
    genObjectId
} from "./lib.js";

import {
    IMAGES,
    AUDIO
} from "./assets.js";

export class Project {

    static Main = undefined;

    constructor(name, width, height, properties = {}, canvas, main = true) {
        this.name = name;
        this.main = main;
        this.width = width;
        this.height = height;
        this.images = IMAGES;
        this.audio = AUDIO;
        this.audioContext = new AudioContext();
        this.audioBuffers = {};
        this.darkness = 0;
        this.spritesList = [];
        this.spritesIndex = {};
        this.groups = {};
        this.animations = {};
        this.state = {};
        this.loaded = false;
        this.started = false;
        this.userEvents = {
            "click": [],
            "mousemove": [],
            "keydown": []
        };
        if (canvas) {
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext("2d");
            this.context.width = this.width;
            this.context.height = this.height;
        }
        this.userProperties = {
            mouse: {
                x: 0,
                y: 0
            }
        };
        this.properties = Object.assign({
            backgroundColor: "#ffffff"
        }, properties);
        if (main) Project.Main = this;
    }

    broadcastUserEvent(eventName, eventObject) {
        for (let event of this.userEvents[eventName]) {
            event.callback(eventObject);
        }
    }

    connectCanvas(canvas) {
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
        this.context.width = this.width;
        this.context.height = this.height;
    }

    broadcast(name) {
        for (let sprite in this.spritesIndex) {
            sprite = this.spritesIndex[sprite];
            if (sprite.listeners[name]) {
                sprite.listeners[name]();
            }
        }
    }

    createAnimation(name, animation) {
        animation.name = name;
        this.animations[name] = animation;
    }

    createGroup(name, sprites) {
        this.groups[String(name)] = sprites.map(s => this.spritesIndex[s]);
    }

    modifyGroup(name, properties = {}, exclude = []) {
        for (let sprite of this.groups[name]) {
            if (exclude.includes(sprite.name)) continue;
            sprite.properties = Object.assign(sprite.properties, properties);
        }
    }

    hideGroup(name, exclude = []) {
        for (let sprite of this.groups[name]) {
            if (exclude.includes(sprite.name)) continue;
            sprite.visible = false;
        }
    }

    showGroup(name, exclude = []) {
        for (let sprite of this.groups[name]) {
            if (exclude.includes(sprite.name)) continue;
            sprite.visible = true;
        }
    }

    addSprite(sprite) {
        sprite.project = this;
        this.spritesList.push(sprite);
        this.spritesIndex[sprite.name] = sprite;
    }

    getSprite(name) {
        return this.spritesIndex[name];
    }

    modifySprites(sprites = [], properties = {}) {
        for (let sprite of sprites) {
            sprite = ((typeof sprite === "object") ? sprite : this.spritesIndex[sprite]);
            sprite.properties = Object.assign(sprite.properties, properties);
        }
    }

    adjustSprites(sprites = [], expression) {
        for (let sprite of sprites) {
            sprite = ((typeof sprite === "string") ? sprite : sprite.name);
            eval(expression.replace("sprite", `this.spritesIndex["${sprite}"]`));
        }
    }

    deleteSprite(sprite) {
        this.spritesList.splice(this.spritesList.indexOf(sprite), 1);
    }

    connectUserEvent(event) {
        this.broadcastUserEvent(event.type, event);
    }

    addSound(name, url) {
        fetch(url).then(res => res.arrayBuffer()).then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer)).then(buffer => {
            this.audioBuffers[name] = buffer;
        });
    }

    playSound(name) {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.audioBuffers[name];
        source.connect(this.audioContext.destination);
        source.start();
    }

    render() {
        this.context.globalAlpha = 1;
        this.context.fillStyle = this.properties.backgroundColor;
        this.context.filter = "contrast(100%) brightness(100%) grayscale(0%) saturate(100%)";
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillRect(0, 0, this.width, this.height);

        for (let sprite of this.spritesList) {
            sprite.render();
        }

        this.context.globalAlpha = this.darkness * 0.01;
        this.context.filter = "none";
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.width, this.height);
        requestAnimationFrame(this.render.bind(this));
    }

    start(callback) {
        this.started = true;
        requestAnimationFrame(this.render.bind(this));
        if (callback) callback();
    }
}

export class Sprite {

    static all = {};

    constructor(name, x, y, width, height, costumes, sounds, properties = {}, project) {
        this.name = name || genObjectId();
        this.width = width;
        this.height = height;
        this.x = (properties.centered) ? x - width / 2 : x;
        this.y = (properties.centered) ? y - height / 2 : y;
        this.offsetX = 0;
        this.offsetY = 0;

        if (properties.applyOffset) {
            this.x += 280;
            this.y += 180;
        }

        this.properties = Object.assign({
            transparency: 0,
            size: 100,
            brightness: 0,
            saturation: 100,
            contrast: 100,
            grayscale: 0,
            rotation: 0,
            visible: true,
            preRender: undefined,
            costume: 0,
            centered: false,
            sound: undefined,
            hitbox: {
                width: width,
                height: height
            }
        }, properties);
        this.customRender = undefined;
        this.project = project || Project.Main;
        this.costumes = costumes;
        this.sounds = sounds;
        this.variables = {};
        this.animations = {};
        this.listeners = {};
        this.userEventListeners = {};

        if (this.properties.setup) this.properties.setup();
        if (this.properties.preRender) this.properties.preRender = this.properties.preRender.bind(this);
        this.project.addSprite(this);
        this.layer = this.project.spritesList.indexOf(this);
    }

    render() {
        for (let animation in this.animations) {
            animation = this.animations[animation];
            if ((animation instanceof MultiFrameLinearAnimation && animation.reset) || ((animation instanceof LoopAnimation || animation instanceof MultiFrameLoopAnimation) && animation.running)) animation.run();
        }

        if (this.properties.preRender) this.properties.preRender(this.project.context);

        if (this.properties.visible) {
            let ctx = this.project.context,
                transparency = 1 - aofb(this.properties.transparency, 1);
            transparency = (transparency > 1 || transparency < 0) ? (transparency > 1) ? 1 : 0 : transparency;
            ctx.globalAlpha = transparency;
            ctx.filter = `contrast(${this.properties.contrast}%) saturate(${this.properties.saturation}%) brightness(${100 + (this.properties.brightness * 9)}%) grayscale(${this.properties.grayscale}%)`;
            let rotation = this.properties.rotation * Math.PI / 180,
                size = aofb(this.properties.size, 1),
                center = {
                    x: (this.x + this.offsetX) + this.width / 2,
                    y: (this.y + this.offsetY) + this.height / 2
                };
            ctx.translate(center.x, center.y);
            ctx.rotate(rotation);
            ctx.scale(size, size);
            ctx.translate(-center.x, -center.y);
            (this.customRender) ? this.customRender(): ctx.drawImage(IMAGES[this.costumes[this.properties.costume]], (this.x + this.offsetX), (this.y + this.offsetY), this.width, this.height);
            ctx.resetTransform();
        }
    }

    setVariable(name, value) {
        this.variables[name] = value;
        return this;
    }

    getVariable(name) {
        return this.variables[name];
    }

    addToGroup(name) {
        this.project.groups[name].push(this);
    }

    createClone(name, x, y, properties = {}) {
        return new Sprite(name || genObjectId(), x || this.x, y, this.width, this.height, JSON.parse(JSON.stringify(this.costumes)), JSON.parse(JSON.stringify(this.sounds)), Object.assign(JSON.parse(JSON.stringify(this.properties)), properties), this.project);
    }

    setAnimation(name, animation) {
        animation.name = name;
        return this.animations[name] = animation;
    }

    copyAnimation(sprite, name) {
        this.setAnimation(name, Object.create(sprite.getAnimation(name)).bind(this));
    }

    useAnimation(name) {
        this.setAnimation(name, Object.create(this.project.animations[name]));
    }

    setCostume(costume) {
        this.properties.costume = (typeof costume === "number") ? costume : this.costumes.indexOf(costume);
        return this;
    }

    setProperties(properties) {
        this.properties = Object.assign(this.properties, properties);
        return this;
    }

    getAnimation(name) {
        return this.animations[name];
    }

    setCustomRender(func) {
        this.customRender = func.bind(this);
        return this;
    }

    setListener(name, callback) {
        this.listeners[name] = callback.bind(this);
        return this;
    }

    removeListener(name) {
        delete this.listeners[name];
    }

    setUserEventListener(name, eventName, callback) {
        this.userEventListeners[name] = {
            name: name,
            eventName: eventName,
            callback: callback.bind(this)
        };
        this.project.userEvents[eventName].push(this.userEventListeners[name]);
        return this;
    }

    removeUserEventListener(name) {
        let userEvent = this.project.userEvents[this.userEventListeners[name].eventName];
        userEvent.splice(userEvent.indexOf(this.userEventListeners[name]), 1);
        delete this.userEventListeners[name];
        return this;
    }

    adjustLayer(amount) {
        let index = this.project.spritesList.indexOf(this);
        amount > 0 && (amount += 1);

        this.project.spritesList.splice(index, 1);
        this.project.spritesList.splice(index + amount, 0, this);

        this.layer = this.project.spritesList.indexOf(this);
        return this;
    }

    translate(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }

    setPosition(x, y) {
        this.x = (this.properties.centered) ? x - this.width / 2 : x;
        this.y = (this.properties.centered) ? y - this.height / 2 : y;
        return this;
    }

    setOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
    }

    adjustOffset(x, y) {
        this.offsetX += x;
        this.offsetY += y;
    }

    remove() {
        this.project.deleteSprite(this);
        delete this;
    }
}