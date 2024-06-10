import {
    aofb,
    aisofb,
    LoopAnimation,
    MultiFrameLoopAnimation,
    MultiFrameLinearAnimation,
    toDegrees,
    toRadians,
    centerObject,
    testMouseCollision
} from "/src/scripts/lib.js";

const gameArea = document.querySelector("#gameArea");
gameArea.width = 480;
gameArea.height = 360;

const coordDisplay = document.querySelector("#coordDisplay");

const ctx = gameArea.getContext("2d");
ctx.width = 480;
ctx.height = 360;

const {
    IMAGES,
    AUDIO
} = await import("/src/scripts/assets.js");

class Project {

    static Main = undefined;

    constructor(name, width, height, properties = {}, context, main = true) {
        this.name = name;
        this.main = main;
        this.width = width;
        this.height = height;
        this.context = context;
        this.spritesList = [];
        this.spritesIndex = {};
        this.userEvents = {
            "click": [],
            "mousemove": []
        };
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

    broadcast(name) {
        for (let sprite in this.spritesIndex) {
            sprite = this.spritesIndex[sprite];
            if (sprite.listeners[name]) sprite.listeners[name]();
        }
    }

    addSprite(sprite) {
        sprite.project = this;
        this.spritesList.push(sprite);
        this.spritesIndex[sprite.name] = sprite;
    }

    deleteSprite(sprite) {
        this.spritesList.splice(this.spritesList.indexOf(sprite), 1);
    }

    render() {
        let ctx = this.context;

        ctx.globalAlpha = 1;
        ctx.fillStyle = this.properties.backgroundColor;
        ctx.filter = "contrast(100%) brightness(100%) grayscale(0%) saturate(100%)";
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillRect(0, 0, this.width, this.height);

        for (let sprite of this.spritesList) {
            sprite.render();
        }
        requestAnimationFrame(this.render.bind(this));
    }

    start() {
        requestAnimationFrame(this.render.bind(this));
    }
}

export const MainProject = new Project("DJ Ricochet", 480, 360, {
    backgroundColor: "#b6a3ff"
}, ctx);

function connectUserEvent(event) {
    Project.Main.broadcastUserEvent(event.type, event);
}

gameArea.addEventListener("click", connectUserEvent);
gameArea.addEventListener("mousemove", function(event) {
    connectUserEvent(event);
    Project.Main.userProperties.mouse.x = event.pageX;
    Project.Main.userProperties.mouse.y = event.pageY;
    coordDisplay.innerText = `x:${event.pageX}, y:${event.pageY}`;
});

class Sprite {

    static all = {};

    constructor(name, x, y, width, height, costumes, sounds, properties = {}) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.x = (properties.centered) ? x - width / 2 : x;
        this.y = (properties.centered) ? y - height / 2 : y;
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
            hitbox: {
                width: width,
                height: height
            }
        }, properties);
        this.customRender = undefined;
        this.costumes = costumes;
        this.sounds = sounds;
        this.variables = {};
        this.animations = {};
        this.listeners = {};
        this.userEventListeners = {};

        if (this.properties.setup) this.properties.setup();
        Project.Main.addSprite(this);
        this.layer = Project.Main.spritesList.indexOf(this);
    }

    render() {
        for (let animation in this.animations) {
            animation = this.animations[animation];
            if ((animation instanceof MultiFrameLinearAnimation && animation.reset) || ((animation instanceof LoopAnimation || animation instanceof MultiFrameLoopAnimation) && animation.running)) animation.run();
        }

        if (this.properties.preRender) this.properties.preRender.call(this);

        if (this.properties.visible) {
            let transparency = 1 - aofb(this.properties.transparency, 1);
            transparency = (transparency > 1 || transparency < 0) ? (transparency > 1) ? 1 : 0 : transparency;
            ctx.globalAlpha = transparency;
            ctx.filter = `contrast(${this.properties.contrast}%) saturate(${this.properties.saturation}%) brightness(${100 + (this.properties.brightness * 9)}%) grayscale(${this.properties.grayscale}%)`;

            let rotation = this.properties.rotation * Math.PI / 180,
                size = aofb(this.properties.size, 1),
                center = {
                    x: this.x + this.width / 2,
                    y: this.y + this.height / 2
                };

            ctx.translate(center.x, center.y);
            ctx.rotate(rotation);
            ctx.scale(size, size);
            ctx.translate(-center.x, -center.y);

            (this.customRender) ? this.customRender(): ctx.drawImage(this.costumes[this.properties.costume], this.x, this.y, this.width, this.height);

            ctx.resetTransform();
        }
    }

    setVariable(name, value) {
        return this.variables[name] = value;
    }

    getVariable(name) {
        return this.variables[name];
    }

    setAnimation(name, animation) {
        return this.animations[name] = animation;
    }

    getAnimation(name) {
        return this.animations[name];
    }

    setCustomRender(func) {
        this.customRender = func.bind(this);
    }

    setListener(name, callback) {
        this.listeners[name] = callback.bind(this);
    }

    removeListener(name) {
        delete this.listeners[name];
    }

    setUserEventListener(name, eventName, callback) {
        this.userEventListeners[name] = {
            name: name,
            eventName: eventName,
            callback: callback
        };
        this.project.userEvents[eventName].push(this.userEventListeners[name]);
    }

    removeUserEventListener(name) {
        let userEvent = this.project.userEvents[this.userEventListeners[name].eventName];
        userEvent.splice(userEvent.indexOf(this.userEventListeners[name]), 1);
        delete this.userEventListeners[name];
    }

    adjustLayer(amount) {
        let index = this.project.spritesList.indexOf(this);
        amount > 0 && (amount += 1);

        this.project.spritesList.splice(index, 1);
        this.project.spritesList.splice(index + amount, 0, this);

        this.layer = this.project.spritesList.indexOf(this);
    }

    translate(x, y) {
        this.x += x;
        this.y += y;
    }

    remove() {
        Project.Main.deleteSprite(this);
        delete this;
    }
}

const foreground1 = new Sprite("Foreground_1", 40, -40, 480, 360, [IMAGES["Foreground"]], [], {
    transparency: 94,
    size: 132,
    rotation: -135
});
const foreground2 = new Sprite("Foreground_2", -296, 296, 480, 360, [IMAGES["Foreground"]], [], {
    transparency: 94,
    size: 132,
    rotation: -135
});
const foreground3 = new Sprite("Foreground_3", -632, 632, 480, 360, [IMAGES["Foreground"]], [], {
    transparency: 94,
    size: 132,
    rotation: -135
});

foreground1.setAnimation("climb", new LoopAnimation(function() {
    for (let clone of [foreground1, foreground2, foreground3]) {
        clone.x += 1;
        clone.y -= 1;
        if (clone.x === 375 && clone.y === -375) {
            clone.x = -632;
            clone.y = 632;
        }
    }
}, foreground1, 0.033)).start();




const nameTitle = new Sprite("ProbabIy_Not", 0, 0, 480, 360, [IMAGES["ProbabIy_Not"], IMAGES["Title_1"]], [], {
    size: 0
});

nameTitle.setVariable("turn", 0);

nameTitle.setAnimation("pop-in", new LoopAnimation(function() {
    this.properties.size += (100 - this.properties.size) / 6;
}, nameTitle, 0.033)).start();

nameTitle.setAnimation("float", new LoopAnimation(function() {
  if (this.properties.visible) {
    this.variables.turn += 4;
    this.y -= Math.sin(toRadians(this.getVariable("turn"))) / 3;
    this.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 3;
  }
}, nameTitle, 0.033)).start();

nameTitle.setAnimation("drift-out", new LoopAnimation(function() {
    this.x += 9 + (this.x / 4);
    if (this.x > this.width) {
        this.getAnimation("drift-out").end();
        this.getAnimation("pop-in").end();
        this.x = -this.width;
        this.y = -20;
        this.properties.costume = 1;
        this.properties.size = 100;
        this.getAnimation("drift-in").start();
    }
}, nameTitle, 0.033));

nameTitle.setAnimation("drift-out-delay", new MultiFrameLinearAnimation([function() {
    this.getAnimation("drift-out").start();
}], nameTitle, [3])).start();




const clickAnywhereToStart = new Sprite("Click_Anywhere_To_Start", 100, 210, 280, 100, [IMAGES["Click_Anywhere_To_Start"], IMAGES["Headphones_Recommended"]], [], {
    visible: false
});

clickAnywhereToStart.setAnimation("blink", new MultiFrameLoopAnimation([function() {
    this.properties.visible = false;
}, function() {
    this.properties.visible = true;
}], clickAnywhereToStart, [1, 0.5]));

clickAnywhereToStart.setAnimation("fade-in", new MultiFrameLinearAnimation([function() {
    this.properties.transparency -= 20;
}, function() {
    this.properties.transparency -= 20;
}, function() {
    this.properties.transparency -= 20;
}], clickAnywhereToStart, [2, 0.25, 0.25]));

clickAnywhereToStart.setListener("start", function() {
    this.getAnimation("blink").end();
    this.properties.visible = true;
    this.properties.transparency = 100;
    this.properties.costume = 1;
    this.x = 100;
    this.y = 290;
    this.getAnimation("fade-in").start();
});


nameTitle.setAnimation("glow-strip-delay", new MultiFrameLinearAnimation([function() {
    MainProject.broadcast("glow-strip");
}], nameTitle, [0.2]));

nameTitle.setAnimation("drift-in", new LoopAnimation(function() {
    this.x += 1 - (this.x / 6);
    let glowStripDelay = this.getAnimation("glow-strip-delay");
    if (!glowStripDelay.used) glowStripDelay.start();
    if (this.x > 5) {
        this.getAnimation("drift-in").end();
        clickAnywhereToStart.getAnimation("blink").start();
        this.setUserEventListener("start-click", "click", (function() {
            this.project.broadcast("start");
            this.removeUserEventListener("start-click");
        }).bind(this));
    }
}, nameTitle, 0.033));

nameTitle.setAnimation("drift-up", new LoopAnimation(function() {
    this.y -= 15 + (this.y / 6);
    if (this.y < -88) {
        this.getAnimation("drift-up").end();
        this.removeListener("start");
    }
}, nameTitle, 0.033));

nameTitle.setListener("start", function() {
    this.getAnimation("drift-up").start();
});

nameTitle.setAnimation("grow", new LoopAnimation(function() {
 this.properties.size += (100-this.properties.size)/4; 
 this.project.spritesIndex["Click_Anywhere_To_Start"].properties.size += (100-this.project.spritesIndex["Click_Anywhere_To_Start"].properties.size)/4; 

 if (Math.round(this.size) === 100) {
  this.getAnimation("grow").end();
 }
}, nameTitle, 0.033));

nameTitle.setListener("close-help", function() {
  this.properties.visible = true; 
  this.properties.size = 0; 
  this.project.spritesIndex["Click_Anywhere_To_Start"].properties.visible = true; 
  this.project.spritesIndex["Click_Anywhere_To_Start"].properties.size = 0;
  this.getAnimation("grow").start();
});


const Background_Art = new Sprite("Background_Art", 0, 0, 480, 360, [IMAGES["Background_Art"]], [], {
    size: 200,
    transparency: 100
});

Background_Art.setVariable("turn", 0);

Background_Art.setAnimation("float", new LoopAnimation(function() {
  if (this.properties.visible) {
    this.variables.turn += 4;
    this.y -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
    this.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;
  }
}, Background_Art, 0.033)).start();

Background_Art.setAnimation("initial-fade-in", new LoopAnimation(function() {
    this.properties.size += (108 - this.properties.size) / 4;
    this.properties.transparency += -6.67;
    if (Math.round(this.properties.size) === 109) {
        this.getAnimation("initial-fade-in").end();
    }
}, Background_Art, 0.033));

Background_Art.setListener("glow-strip", function() {
    this.properties.visible = true; 
    this.properties.size = 200; 
    this.properties.transparency = 100;
    this.getAnimation("initial-fade-in").start();
});




const Backlight = new Sprite("Backlight", 0, 144, 480, 72, [IMAGES["Backlight"]], [], {
    brightness: 100,
    contrast: 81,
    size: 70,
    visible: false
});
Backlight.adjustLayer(-3);

Backlight.setAnimation("initial-fade-in", new LoopAnimation(function() {
    this.properties.size += (130 - this.properties.size) / 4;
    if (Math.round(this.properties.size) === 130) this.getAnimation("initial-fade-in").end();
}, Backlight, 0.033));

Backlight.setVariable("turn", 0);
Backlight.setAnimation("float", new LoopAnimation(function() {
  if (this.properties.visible) {
    this.variables.turn += 4;
    this.y -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
    this.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;
  }
}, Backlight, 0.033)).start();

Backlight.setListener("glow-strip", function() {
    this.properties.visible = true;
    this.properties.size = 70; 
    this.getAnimation("initial-fade-in").start();
});




const Backlight_2 = new Sprite("Backlight_2", 0, 0, 480, 360, [IMAGES["Backlight_2"]], [], {
    brightness: 100,
    size: 70,
    visible: false,
    contrast: 0
});
Backlight_2.adjustLayer(-4);

Backlight_2.setAnimation("initial-fade-in", new LoopAnimation(function() {
    this.properties.size += (160 - this.properties.size) / 4;
    if (Math.round(this.properties.size) === 160) this.getAnimation("initial-fade-in").end();
}, Backlight_2, 0.033));

Backlight_2.setVariable("turn", 0);
Backlight_2.setAnimation("float", new LoopAnimation(function() {
  if (this.properties.visible) {
    this.variables.turn += 4;
    this.y -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
    this.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;
  }
}, Backlight_2, 0.033)).start();

Backlight_2.setListener("glow-strip", function() {
    this.properties.size = 70; 
    this.properties.visible = true;
    this.getAnimation("initial-fade-in").start();
});

Background_Art.adjustLayer(-4);



const Play = new Sprite("Play", (Math.floor(0 / -20) - 4) + 240 - 52, ((0 / -80) + 50) + 180 - 25, 144, 50, [IMAGES["Play"], IMAGES["Play_2"]], [], {
    hitbox: {
        width: 124,
        height: 36
    },
    visible: false,
    size: 25
});
Play.setUserEventListener("hover", "mousemove", (function(event) {
    if (testMouseCollision(event.pageX, event.pageY, this) && this.properties.visible) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }

    this.x = (Math.floor((event.pageX - 240) / -20) - 4) + 240 - 52;
    this.y = (((event.pageY - 180) / -80) + 50) + 180 - 25;

}).bind(Play));

const Options = new Sprite("Options", (Math.floor(0 / -40) - 160) + 240 - 230, ((0 / -100) + 65) + 180 - 40, 460, 80, [IMAGES["Options"], IMAGES["Options_2"]], [], {
    hitbox: {
        width: 103,
        height: 25
    },
    visible: false,
    size: 25
});
Options.setUserEventListener("hover", "mousemove", (function(event) {
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }

    this.x = (Math.floor((event.pageX - 240) / -40) - 160) + 240 - 230;
    this.y = (((event.pageY - 180) / -100) + 65) + 180 - 40;

}).bind(Options));
Options.setUserEventListener("click", "click", (function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this)) {
        this.project.broadcast("options");
    } 
}).bind(Options));

const Help = new Sprite("Help", (Math.floor(0 / -40) + 180) + 240 - 230, ((0 / -100) + 65) + 180 - 40, 460, 80, [IMAGES["Help"], IMAGES["Help_2"]], [], {
    hitbox: {
        width: 64,
        height: 24
    },
    visible: false,
    size: 25
});
Help.setUserEventListener("hover", "mousemove", (function(event) {
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }

    this.x = (Math.floor((event.pageX - 240) / -40) + 180) + 240 - 230;
    this.y = (((event.pageY - 180) / -100) + 65) + 180 - 40;

}).bind(Help));

Help.setUserEventListener("click", "click", (function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this)) {
        this.project.broadcast("help");
    } 
}).bind(Help));

const Resume = new Sprite("Resume", (Math.floor(0 / -60) + 4) + 240 - 90, ((0 / -100) + 110) + 180 - 40, 180, 80, [IMAGES["Resume"], IMAGES["Resume_2"]], [], {
    hitbox: {
        width: 100,
        height: 18
    },
    visible: false,
    size: 25
});
Resume.setUserEventListener("hover", "mousemove", (function(event) {
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }

    this.x = (Math.floor((event.pageX - 240) / -60) + 4) + 240 - 90;
    this.y = (((event.pageY - 180) / -100) + 110) + 180 - 40;

}).bind(Resume));

Play.setAnimation("pop-up", new LoopAnimation(function() {
    this.properties.size += (100 - this.properties.size) / 2;
    Options.properties.size += (100 - Options.properties.size) / 2;
    Help.properties.size += (100 - Help.properties.size) / 2;
    Resume.properties.size += (100 - Resume.properties.size) / 2;
    if (Math.round(this.properties.size) === 100) {
        Play.getAnimation("pop-up").end();
    }
}, Play, 0.033));

Play.setAnimation("pop-up-delay", new MultiFrameLinearAnimation([function() {
    this.properties.visible = true;
    Options.properties.visible = true;
    Help.properties.visible = true;
    Resume.properties.visible = true;
    this.getAnimation("pop-up").start();
}], Play, [1.2]));

Play.setListener("start", function() {
    Play.getAnimation("pop-up-delay").start();
});

Play.setListener("close-help", function() {
  Resume.properties.size = 25; 
  Play.properties.size = 25; 
  Help.properties.size = 25; 
  Options.properties.size = 25; 
  Resume.properties.visible = true; 
  Play.properties.visible = true; 
  Help.properties.visible = true; 
  Options.properties.visible = true; 
  this.getAnimation("pop-up").start();
});

Play.setListener("help", function() {
    this.properties.visible = false; 
    this.properties.size = 0;
    Options.properties.visible = false; 
    Help.properties.visible = false; 
    Resume.properties.visible = false; 
    Options.properties.size = 0;
    Help.properties.size = 0;
    Resume.properties.size = 0;
    clickAnywhereToStart.properties.visible = false; 
    clickAnywhereToStart.properties.size = 0; 
    nameTitle.properties.visible = false; 
    nameTitle.properties.size = 0;
    Backlight.properties.visible = false; 
    Backlight_2.properties.visible = false; 
    Background_Art.properties.visible = false; 
});

Play.setListener("options", function() {
    this.properties.visible = false; 
    this.properties.size = 0;
    Options.properties.visible = false; 
    Help.properties.visible = false; 
    Resume.properties.visible = false; 
    Options.properties.size = 0;
    Help.properties.size = 0;
    Resume.properties.size = 0;
    clickAnywhereToStart.properties.visible = false; 
    clickAnywhereToStart.properties.size = 0; 
    nameTitle.properties.visible = false; 
    nameTitle.properties.size = 0;
    Backlight.properties.visible = false; 
    Backlight_2.properties.visible = false; 
    Background_Art.properties.visible = false; 
});


const Controls = new Sprite("Controls", 10, 100-90, 460, 160, [IMAGES["Controls"]], [], {size: 0, visible: false});
const Break_Line = new Sprite("Break_Line", 10, 140, 460, 80, [IMAGES["Break_Line"]], [], {size: 0, brightness: 100, contrast: 81, size: 0, visible: false});
const Functions = new Sprite("Functions", 10, 100+90, 460, 160, [IMAGES["Functions"]], [], {size: 0, visible: false});
const Close = new Sprite("Close", 240-25+218, 180-25-162, 50, 50, [IMAGES["Close"]], [], {size: 0, visible: false, hitbox: {width: 50, height: 50}});

Close.setUserEventListener("close-help", "click", (function() {
 if (testMouseCollision(event.pageX, event.pageY, this) && this.properties.visible) {
   this.project.broadcast("close-help"); 
   this.project.broadcast("glow-strip"); 
   this.properties.visible = false; 
   this.properties.size = 0; 
   Controls.properties.visible = false; 
   Controls.properties.size = 0; 
   Break_Line.properties.visible = false; 
   Break_Line.properties.size = 0; 
   Functions.properties.visible = false;  
   Functions.properties.size = 0; 
 }
}).bind(Close));

Controls.setAnimation("grow", new LoopAnimation(function() {
 this.properties.size += (100-this.properties.size)/4; 
 Break_Line.properties.size += (90-Break_Line.properties.size)/4; 
 Functions.properties.size += (100-Functions.properties.size)/4; 
 Close.properties.size += (100-Close.properties.size)/4; 

 if (Math.round(this.size) === 100) {
  Controls.getAnimation("grow").end();
 }
}, Controls, 0.033));

Controls.setVariable("turn", 0);
Controls.setAnimation("float", new LoopAnimation(function() {
  if (this.properties.visible) {
    this.variables.turn += 4;
    this.y -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
    this.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;

    Controls.y -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
    Controls.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;

    Break_Line.y -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
    Break_Line.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;

    Functions.y -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
    Functions.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;

    Close.y -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
    Close.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;
  }
}, Controls, 0.033)).start();

Controls.setListener("help", function() {
 this.properties.visible = true; 
 Functions.properties.visible = true; 
 Close.properties.visible = true; 
 Break_Line.properties.visible = true; 
 this.properties.size = 0; 
 Functions.properties.size = 0; 
 Close.properties.size = 0; 
 Break_Line.properties.size = 0; 
 this.getAnimation("grow").start(); 
});


export {
    ctx,
    gameArea
};
