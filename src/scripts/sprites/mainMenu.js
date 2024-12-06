import {
    Sprite,
    Project
} from "../project.js";

import {
    LoopAnimation,
    MultiFrameLoopAnimation,
    MultiFrameLinearAnimation,
    aisofb,
    aofb,
    toRadians,
    testMouseCollision
} from "../lib.js";




const Foreground_1 = new Sprite("Foreground_1", 40, -40, 480, 360, ["Foreground"], [], {
    transparency: 94,
    size: 132,
    rotation: -135
});
const Foreground_2 = Foreground_1.createClone("Foreground_2", -296, 296);
const Foreground_3 = Foreground_1.createClone("Foreground_3", -632, 632);
Foreground_1.setAnimation("checkered-background-scroll", new LoopAnimation(function() {
    for (let clone of [Foreground_1, Foreground_2, Foreground_3]) {
        clone.x += 1;
        clone.y -= 1;
        if (clone.x === 375 && clone.y === -375) {
            clone.x = -632;
            clone.y = 632;
        }
    }
}, Foreground_1, 0.033)).start();




const nameTitle = new Sprite("ProbabIy_Not", 0, 0, 480, 360, ["ProbabIy_Not", "Title_1"], [], {
    size: 0,
});
nameTitle.setAnimation("initial-pop-in", new LoopAnimation(function() {
    this.properties.size += (100 - this.properties.size) / 6;
}, nameTitle, 0.033)).start();
nameTitle.setAnimation("drift-out", new LoopAnimation(function() {
    this.x += 9 + (this.x / 4);
    if (this.x > this.width) {
        this.getAnimation("drift-out").end();
        this.getAnimation("initial-pop-in").end();
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
nameTitle.setAnimation("glow-strip-delay", new MultiFrameLinearAnimation([function() {
    this.project.broadcast("glow-strip");
}], nameTitle, [0.2]));
nameTitle.setAnimation("drift-in", new LoopAnimation(function() {
    this.x += 1 - (this.x / 6);
    let glowStripDelay = this.getAnimation("glow-strip-delay");
    if (!glowStripDelay.used) glowStripDelay.start();
    if (this.x > 5) {
        this.getAnimation("drift-in").end();
        clickAnywhereToStart.getAnimation("blink").start();
        this.setUserEventListener("start-click", "click", function() {
            if (this.project.loaded) {
                this.project.broadcast("start");
                this.removeUserEventListener("start-click");
            }
        });
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
    this.properties.size += (100 - this.properties.size) / 4;
    this.project.spritesIndex["Click_Anywhere_To_Start"].properties.size += (100 - this.project.spritesIndex["Click_Anywhere_To_Start"].properties.size) / 4;
    if (Math.round(this.properties.size) === 100) {
        this.getAnimation("grow").end();
    }
}, nameTitle, 0.033));
nameTitle.setListener("close-help", function() {
    if (!this.project.state.page) {
        this.properties.visible = true;
        this.properties.size = 0;
        this.project.spritesIndex["Click_Anywhere_To_Start"].properties.visible = true;
        this.project.spritesIndex["Click_Anywhere_To_Start"].properties.size = 0;
        this.getAnimation("grow").start();
    }
});




const clickAnywhereToStart = new Sprite("Click_Anywhere_To_Start", 100, 210, 280, 100, ["Click_Anywhere_To_Start", "Headphones_Recommended"], [], {
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




const Background_Art = new Sprite("Background_Art", 0, 0, 480, 360, ["Background_Art"], [], {
    size: 200,
    transparency: 100
});
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




const Backlight = new Sprite("Backlight", 0, 144, 480, 72, ["Backlight"], [], {
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
Backlight.setListener("glow-strip", function() {
    this.properties.visible = true;
    this.properties.size = 70;
    this.getAnimation("initial-fade-in").start();
});




const Backlight_2 = new Sprite("Backlight_2", 0, 0, 480, 360, ["Backlight_2"], [], {
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
Backlight_2.setVariable("float-offset", 0);
Backlight_2.setVariable("float-offset-2", 0);
Backlight_2.setAnimation("float", new LoopAnimation(function() {
    this.variables.turn += 4;
    this.variables["float-offset"] -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
    this.variables["float-offset-2"] -= Math.sin(toRadians(this.getVariable("turn"))) / 4;

    this.offsetY = this.getVariable("float-offset");

    this.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;
    if (nameTitle.properties.visible) {
        nameTitle.y -= Math.sin(toRadians(this.getVariable("turn"))) / 3;
        nameTitle.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 3;
    }
    Background_Art.offsetY = this.getVariable("float-offset");
    Background_Art.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;
    Backlight.offsetY = this.getVariable("float-offset");
    Backlight.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;

    let Grid = this.project.spritesIndex["Grid"];
    if (Grid) {
        if (this.project.state.settings.floatEffect) {
            Grid.offsetY = this.getVariable("float-offset");
            Grid.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;
        }
    }

    let Good_Run = this.project.spritesIndex["Good_Run"],
        End_Break_Line = this.project.spritesIndex["End_Break_Line"];
    if (Good_Run) {
        if (Good_Run.properties.visible) {
            Good_Run.offsetY = this.getVariable("float-offset");
            Good_Run.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;
            End_Break_Line.offsetY = this.getVariable("float-offset");
            End_Break_Line.properties.rotation = Math.sin(toRadians(this.getVariable("turn"))) * 1;
        }
    }
}, Backlight_2, 0.033)).start();
Backlight_2.setListener("glow-strip", function() {
    this.properties.size = 70;
    this.properties.visible = true;
    this.getAnimation("initial-fade-in").start();
});
Background_Art.adjustLayer(-4);




const Play = new Sprite("Play", (Math.floor(0 / -20) - 4) + 240 - 52, ((0 / -80) + 50) + 180 - 25, 144, 50, ["Play", "Play_2"], [], {
    hitbox: {
        width: 124,
        height: 36
    },
    visible: false,
    size: 25
});
Play.setUserEventListener("hover", "mousemove", function(event) {
    if (testMouseCollision(event.pageX, event.pageY, this) && this.properties.visible) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }

    this.x = (Math.floor((event.pageX - 240) / -20) - 4) + 240 - 52;
    this.y = (((event.pageY - 180) / -80) + 50) + 180 - 25;

});

const Options = new Sprite("Options", (Math.floor(0 / -40) - 160) + 240 - 230, ((0 / -100) + 65) + 180 - 40, 460, 80, ["Options", "Options_2"], [], {
    hitbox: {
        width: 103,
        height: 25
    },
    visible: false,
    size: 25
});
Options.setUserEventListener("hover", "mousemove", function(event) {
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }

    this.x = (Math.floor((event.pageX - 240) / -40) - 160) + 240 - 230;
    this.y = (((event.pageY - 180) / -100) + 65) + 180 - 40;

});
Options.setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this)) {
        this.project.audio["mouse-click"].play();
        this.project.broadcast("options");
    }
});

const Help = new Sprite("Help", (Math.floor(0 / -40) + 180) + 240 - 230, ((0 / -100) + 65) + 180 - 40, 460, 80, ["Help", "Help_2"], [], {
    hitbox: {
        width: 64,
        height: 24
    },
    visible: false,
    size: 25
});
Help.setUserEventListener("hover", "mousemove", function(event) {
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }

    this.x = (Math.floor((event.pageX - 240) / -40) + 180) + 240 - 230;
    this.y = (((event.pageY - 180) / -100) + 65) + 180 - 40;

});
Help.setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this)) {
        this.project.audio["mouse-click"].play();
        this.project.broadcast("help");
    }
});
Help.setAnimation("lower-volume", new LoopAnimation(function() {
    let audio = this.project.audio["please-be-nice"];
    audio.volume -= 0.03;
    if (audio.volume < 0.4) {
        audio.volume = 0.4;
        this.getAnimation("lower-volume").end();
    }
}, Help, 0.033));
Help.setAnimation("raise-volume", new LoopAnimation(function() {
    let audio = this.project.audio["please-be-nice"];
    audio.volume += 0.03;
    if (audio.volume + 0.03 > 1) {
        audio.volume = 1.0;
        this.getAnimation("raise-volume").end();
    }
}, Help, 0.033));

const Resume = new Sprite("Resume", (Math.floor(0 / -60) + 4) + 240 - 90, ((0 / -100) + 110) + 180 - 40, 180, 80, ["Resume", "Resume_2"], [], {
    hitbox: {
        width: 100,
        height: 18
    },
    visible: false,
    transparency: (localStorage.getItem("level") !== null) ? 0 : 50,
    size: 25
});
Resume.setUserEventListener("hover", "mousemove", function(event) {
    if (testMouseCollision(event.pageX, event.pageY, this) && this.properties.transparency !== 50) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }

    this.x = (Math.floor((event.pageX - 240) / -60) + 4) + 240 - 90;
    this.y = (((event.pageY - 180) / -100) + 110) + 180 - 40;

});
Resume.setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this) && localStorage.getItem("level")) {
        this.project.broadcast("resume");
        this.project.broadcast("play");
    }
});

Play.project.createGroup("title-screen", ["Options", "Help", "Resume", "ProbabIy_Not", "Click_Anywhere_To_Start", "Play"]);
Play.project.createGroup("background-art", ["Backlight", "Backlight_2", "Background_Art"]);
Play.project.createGroup("title-screen-buttons", ["Options", "Help", "Resume", "Play"]);

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
    this.project.modifyGroup("title-screen-buttons", {
        visible: true
    });
    this.project.audio["whoosh"].play();
    this.getAnimation("pop-up").start();
}], Play, [1.2]));
Play.setListener("start", function() {
    Play.getAnimation("pop-up-delay").start();
});
Play.setListener("close-help", function() {
    if (!this.project.state.page) {
        this.project.modifyGroup("title-screen-buttons", {
            visible: true,
            size: 25
        });
        this.getAnimation("pop-up").start();
        Help.getAnimation("raise-volume").start();
    }
});

Play.setListener("help", function() {
    this.project.modifyGroup("background-art", {
        visible: false
    });
    this.project.modifyGroup("title-screen", {
        visible: false,
        size: 0
    });
    Help.getAnimation("lower-volume").start();
});
Play.setListener("options", function() {
    this.project.modifyGroup("background-art", {
        visible: false
    });
    this.project.modifyGroup("title-screen", {
        visible: false,
        size: 0
    });
    Help.getAnimation("lower-volume").start();
});
Play.setListener("play", function() {
    this.project.modifyGroup("title-screen", {
        visible: false,
        size: 0
    });
    this.project.state.page++;
});
Play.setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this)) {
        this.project.broadcast("play");
        this.project.state.tutorial = true;
    }
});
