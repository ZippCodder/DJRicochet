export function aofb(a, b) {
    return a / 100 * b;
}

export function aisofb(a, b) {
    return a * 100 / b;
}

export function random(max, mirror) {
    let n = Math.floor(Math.random() * (max - 0)) + 0;

    return (!mirror) ? n : (Math.random() < 0.5) ? n : -n;
}

export function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

export function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

export function centerObject(x, y, width, height) {
 return {x: x - width/2, y: y - height/2};
}

export function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function testMouseCollision(mouseX, mouseY, sprite) {
 let result = false;
 let {x, y} = {x: (sprite.x + sprite.width/2) - sprite.properties.hitbox.width/2, y: (sprite.y + sprite.height/2) - sprite.properties.hitbox.height/2};
 let {width, height} = sprite.properties.hitbox;
 
 if ((Math.abs(mouseX - (x + width/2)) < width/2) && (Math.abs(mouseY - (y + height/2)) < height/2)) result = true; 

 return result; 
}

export class LoopAnimation {
    constructor(frame, object, rate, animationMultFactor) {
        this.frame = frame.bind(object, this);
        this.object = object;
        this.running = false;
        this.used = false;
        this.lastFrameDraw = undefined;
        this.animationMultFactor = animationMultFactor || 1;
        this.rate = rate;
    }
    lapsedTime;

    run() {
        if (!this.running) {
            this.lastFrameDraw = Date.now();
            this.running = true;
            this.used = true;
            this.frame();
        }

        this.lapsedTime = (Date.now() - this.lastFrameDraw) / 1000;
        if (this.lapsedTime >= this.rate * this.animationMultFactor) {
            this.frame();
            this.lastFrameDraw = Date.now();
        }
    }

    start() {
        this.run();
    }

    end() {
        this.running = false;
        this.lastFrameDraw = undefined;
    }
}

export class MultiFrameLoopAnimation {
    constructor(frames, object, timingConfig, endFunc, animationMultFactor) {
        this.frames = frames;
        this.object = object;
        this.nextFrame = 0;
        this.running = false;
        this.active = false;
        this.used = false;
        this.animationMultFactor = animationMultFactor || 1;
        this.timingConfig = timingConfig;
        this.duration = timingConfig.reduce((p, c) => p + c, 0);
        this.lastFrameDraw = undefined;
        if (endFunc) this.endFunc = endFunc.bind(object, this);

        for (let i = 0; i < frames.length; i++) {
            this.frames[i] = frames[i].bind(object, this);
        }
    }
    lapsedTime;

    run() {
        if (!this.running) {
            this.used = true;
            this.running = true;
            this.lastFrameDraw = Date.now();
        }

        this.active = true;

        this.lapsedTime = (Date.now() - this.lastFrameDraw) / 1000;
        if (this.lapsedTime >= this.timingConfig[this.nextFrame] * this.animationMultFactor) {
            this.frames[this.nextFrame]();
            this.lastFrameDraw = Date.now();
            this.nextFrame++;
        }
        if (this.nextFrame === this.frames.length) {
            this.nextFrame = 0;
            this.active = false;
        }
    }

    start() {
        this.run();
    }

    end() {
        if (this.endFunc) this.endFunc();
        this.running = false;
    }
}

export class MultiFrameLinearAnimation {
    constructor(frames, object, timingConfig, endFunc, animationMultFactor = 1, fill = false) {
        this.frames = frames;
        this.object = object;
        this.nextFrame = 0;
        this.running = false;
        this.reset = false;
        this.used = false;
        this.animationMultFactor = animationMultFactor;
        this.fill = fill;
        this.timingConfig = timingConfig;
        this.duration = timingConfig.reduce((p, c) => p + c, 0);
        this.lastFrameDraw = undefined;
        if (endFunc) this.endFunc = endFunc.bind(object, this);

        for (let i = 0; i < frames.length; i++) {
            this.frames[i] = frames[i].bind(object, this);
        }
    }
    lapsedTime;

    run() {
        if (this.reset) {
            if (!this.running) {
                this.running = true;
                this.lastFrameDraw = Date.now();
            }

            if (this.fill) this.frames[this.nextFrame]();

            this.lapsedTime = (Date.now() - this.lastFrameDraw) / 1000;
            if (this.lapsedTime >= this.timingConfig[this.nextFrame] * this.animationMultFactor) {
                this.frames[this.nextFrame]();
                this.lastFrameDraw = Date.now();
                this.nextFrame++;
            }
            if (this.nextFrame === this.frames.length) {
                this.end();
            }
        }
    }

    start() {
        if (!this.running) {
            this.reset = true;
            this.used = true;
        }
    }

    end() {
        if (this.endFunc) this.endFunc();
        this.nextFrame = 0;
        this.reset = false;
        this.running = false;
    }
}
