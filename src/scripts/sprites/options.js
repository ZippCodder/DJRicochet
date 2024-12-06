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
    testMouseCollision,
    distance
} from "../lib.js";

const Credits = new Sprite("Credits", 10, 100 + 90, 460, 160, ["Credits"], [], {
    size: 0,
    visible: false
});
Credits.setAnimation("grow-delay", new MultiFrameLinearAnimation([function() {
    this.getAnimation("grow").start();
}], Credits, [0.3]));
Credits.setAnimation("grow", new LoopAnimation(function() {
    let elements = [this, this.project.getSprite("Credits_Button_1"), this.project.getSprite("Credits_Button_2"), this.project.getSprite("Credits_Button_3")]
    for (let element of elements) {
        element.properties.size += (100 - element.properties.size) / 4;
    }
    if (Math.round(this.properties.size) === 100) {
        this.getAnimation("grow").end();
    }
}, Credits, 0.033));
const Settings = new Sprite("Settings", 10, 100 - 90, 460, 160, ["Settings"], [], {
    size: 0,
    visible: false
});
Settings.setAnimation("grow", new LoopAnimation(function() {
    let Break_Line = this.project.getSprite("Break_Line"),
        Options_Close = this.project.getSprite("Options_Close"),
        Trail_Color_Switch = this.project.getSprite("Trail_Color_Switch"),
        Floating_Effect_Switch = this.project.getSprite("Floating_Effect_Switch"),
        Background_Music_Switch = this.project.getSprite("Background_Music_Switch");

    let elements = [this, Break_Line, Options_Close, Trail_Color_Switch, Background_Music_Switch, Floating_Effect_Switch];
    for (let element of elements) {
        element.properties.size += (100 - element.properties.size) / 4;
    }
    if (Math.round(this.properties.size) === 100) {
        this.getAnimation("grow").end();
    }
}, Settings, 0.033));
Settings.setVariable("turn", 0);
Settings.setAnimation("float", new LoopAnimation(function() {
    if (this.properties.visible) {
        this.variables.turn += 4;
        this.project.adjustSprites([this, "Break_Line", "Credits", "Options_Close", "Background_Music_Switch", "Trail_Color_Switch", "Floating_Effect_Switch", "Credits_Button_1", "Credits_Button_2", "Credits_Button_3"], `sprite.y -= ${Math.sin(toRadians(this.getVariable("turn"))) / 6}`);
        this.project.modifySprites(["Break_Line", "Credits", "Options_Close", this], {
            rotation: Math.sin(toRadians(this.getVariable("turn"))) * 1
        });
    }
}, Settings, 0.033)).start();
Settings.setListener("options", function() {
    this.project.modifySprites(["Options_Close", "Break_Line", "Credits", "Background_Music_Switch", "Floating_Effect_Switch", "Trail_Color_Switch", "Credits_Button_1", "Credits_Button_2", "Credits_Button_3", this], {
        visible: true,
        size: 0
    });
    this.getAnimation("grow").start();
    this.project.getSprite("Credits").getAnimation("grow-delay").start();
});
const Options_Close = new Sprite("Options_Close", 240 - 25 + 218, 180 - 25 - 162, 50, 50, ["Close"], [], {
    size: 0,
    visible: false,
    hitbox: {
        width: 50,
        height: 50
    }
});
Options_Close.setUserEventListener("close-options", "click", function() {
    if (testMouseCollision(event.pageX, event.pageY, this) && this.properties.visible) {
        this.project.audio["close-click"].play();
        this.project.broadcast("close-help");
        this.project.broadcast("glow-strip");
        this.project.modifySprites(["Settings", "Break_Line", "Credits", "Background_Music_Switch", "Floating_Effect_Switch", "Trail_Color_Switch", "Credits_Button_1", "Credits_Button_2", "Credits_Button_3", this], {
            visible: false,
            size: 0
        });
        this.project.getSprite("Credits_Button_1").properties.open = false;
        this.project.getSprite("Credits_Button_2").properties.open = false;
        this.project.getSprite("Credits_Button_3").properties.open = false;
    }
});

const Background_Music_Switch = new Sprite("Background_Music_Switch", 146 + 240 - 30, 24 + 5, 100, 100, ["On", "Off"], [], {
    size: 0,
    visible: false,
    hitbox: {
        width: 100,
        height: 40
    }
});
Background_Music_Switch.setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this)) {
        this.project.state.settings.backgroundMusic = !this.project.state.settings.backgroundMusic;
        this.properties.costume = (this.properties.costume) ? 0 : 1;
        this.project.audio[(this.properties.costume) ? "switch-off" : "switch-on"].play();
    }
});
const Floating_Effect_Switch = new Sprite("Floating_Effect_Switch", 146 + 240 - 30, 100 + 5, 100, 100, ["On", "Off"], [], {
    size: 0,
    visible: false,
    hitbox: {
        width: 100,
        height: 40
    }

});
Floating_Effect_Switch.setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this)) {
        this.project.state.settings.floatEffect = !this.project.state.settings.floatEffect;
        this.properties.costume = (this.properties.costume) ? 0 : 1;
        this.project.audio[(this.properties.costume) ? "switch-off" : "switch-on"].play();
    }
});
const Trail_Color_Switch = new Sprite("Trail_Color_Switch", 146 + 240 - 30, 62 + 5, 100, 100, ["Trail_Switch_1", "Trail_Switch_2"], [], {
    size: 0,
    visible: false,
    hitbox: {
        width: 100,
        height: 40
    }

});
Trail_Color_Switch.setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = (this.properties.costume) ? 0 : 1;
        this.project.state.settings.trailColor = this.properties.costume;
        this.project.audio["switch-on"].play();
    }
});

const Credits_Button_1 = new Sprite("Credits_Button_1", 150 + 240 - 30, 190 + 38 - 20, 100, 100, ["Info", "Info_2"], [], {
    size: 0,
    visible: false,
    open: false,
    hitbox: {
        width: 30,
        height: 30
    },
    preRender: function(ctx) {
        if (this.properties.visible && this.properties.open) {
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "black";
            ctx.fillRect(10, 240, 230, 110);
            ctx.fillRect(10, 240, 10, 110);
            ctx.font = "12px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText("@Vubobinali - In-Game Music", 30, 260);
            ctx.fillText("Tysu - please be nice", 30, 275);
            ctx.fillText("pixabay", 30, 290);
            ctx.fillText("zapsplat", 30, 305);
            ctx.fillText("cymatics.fm, samplefocus, FL Studio", 30, 320);
        }
    }
});
Credits_Button_1.setUserEventListener("hover", "mousemove", function(event) {
    if (!this.properties.visible) return;
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }
});
Credits_Button_1.setUserEventListener("click", "click", function(event) {
    if (testMouseCollision(event.pageX, event.pageY, this) && this.properties.visible) {
        if (this.properties.open) {
            this.properties.open = false;
            Project.Main.playSound("credits-click-2");
        } else {
            this.properties.open = true;
            this.project.getSprite("Credits_Button_2").properties.open = false;
            this.project.getSprite("Credits_Button_3").properties.open = false;
            Project.Main.playSound("credits-click-1");
        }
    }
});
const Credits_Button_2 = new Sprite("Credits_Button_2", 150 + 240 - 30, 190 + 76 - 20, 100, 100, ["Info", "Info_2"], [], {
    size: 0,
    visible: false,
    open: false,
    hitbox: {
        width: 30,
        height: 30
    },
    preRender: function(ctx) {
        if (this.properties.visible && this.properties.open) {
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "black";
            ctx.fillRect(10, 240, 230, 110);
            ctx.fillRect(10, 240, 10, 110);
            ctx.font = "12px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText("ProbabIy_Not (Dante Rich)", 30, 260);
        }
    }
});
Credits_Button_2.setUserEventListener("hover", "mousemove", function(event) {
    if (!this.properties.visible) return;
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }
});
Credits_Button_2.setUserEventListener("click", "click", function(event) {
    if (testMouseCollision(event.pageX, event.pageY, this) && this.properties.visible) {
        if (this.properties.open) {
            this.properties.open = false;
            Project.Main.playSound("credits-click-2");
        } else {
            this.properties.open = true;
            this.project.getSprite("Credits_Button_1").properties.open = false;
            this.project.getSprite("Credits_Button_3").properties.open = false;
            Project.Main.playSound("credits-click-1");
        }
    }
});
const Credits_Button_3 = new Sprite("Credits_Button_3", 150 + 240 - 30, 190 + 114 - 20, 100, 100, ["Info", "Info_2"], [], {
    size: 0,
    visible: false,
    open: false,
    hitbox: {
        width: 30,
        height: 30
    },
    preRender: function(ctx) {
        if (this.properties.visible && this.properties.open) {
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "black";
            ctx.fillRect(10, 240, 280, 110);
            ctx.fillRect(10, 240, 10, 110);
            ctx.font = "12px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText("ProbabIy_Not (Dante Rich) - Main programmer", 30, 260);
            ctx.fillText("Castle_Hippopotamus - Help & Bug Fixes", 30, 275);
            ctx.fillText("Deon Rich - Adaptation to HTML5", 30, 290);
        }
    }
});
Credits_Button_3.setUserEventListener("hover", "mousemove", function(event) {
    if (!this.properties.visible) return;
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }
});
Credits_Button_3.setUserEventListener("click", "click", function(event) {
    if (testMouseCollision(event.pageX, event.pageY, this) && this.properties.visible) {
        if (this.properties.open) {
            this.properties.open = false;
            Project.Main.playSound("credits-click-2");
        } else {
            this.properties.open = true;
            this.project.getSprite("Credits_Button_1").properties.open = false;
            this.project.getSprite("Credits_Button_2").properties.open = false;
            Project.Main.playSound("credits-click-1");
        }
    }
});

Project.Main.addSound("credits-click-1", "/public/Submenu/sounds/menu-select-sound-2.wav");
Project.Main.addSound("credits-click-2", "/public/Submenu/sounds/menu-select-sound-100466.wav");