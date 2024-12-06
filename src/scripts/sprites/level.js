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
    distance,
    rotate
} from "../lib.js";

const Grid = new Sprite("Grid", 240, 180, 370, 202, ["Grid"], [], {
    centered: true,
    visible: false
});
Grid.setVariable("turn", 0);
Grid.setAnimation("grow", new LoopAnimation(function() {
    this.properties.size += (100 - this.properties.size) / 4;
    if (Math.round(this.size) === 100) {
        this.getAnimation("grow").end();
    }
}, Grid, 0.033));

// In game menu elements 

const Score = new Sprite("Score", 86 + 240, 140 + 180, 150, 150, ["Score"], [], {
    centered: true,
    visible: false
});
Score.setAnimation("grow", new LoopAnimation(function() {
    this.properties.size += (100 - this.properties.size) / 4;
    let breakline2 = this.project.getSprite("InGame_Break_Line_2");
    breakline2.properties.size += (100 - breakline2.properties.size) / 4;
    if (Math.round(this.properties.size) === 100) {
        this.getAnimation("grow").end();
    }
}, Score, 0.033));
const Score_Box = new Sprite("Score_Box", 166 + 240, 140 + 180, 150, 150, ["Score_Box"], [], {
    centered: true,
    visible: false
});
const Digit1 = new Sprite("Digit1", 135 + 240, 140 + 180, 150, 150, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], [], {
    centered: true,
    visible: false,
    contrast: 81
});
Digit1.setAnimation("pop-update", new MultiFrameLinearAnimation([function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    },
    function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    },
    function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    }
], Digit1, [0.01, 0.01, 0.01, 0.01]));
const Digit2 = Digit1.createClone("Digit2", 147 + 240, 140 + 180);
Digit2.setAnimation("pop-update", new MultiFrameLinearAnimation([function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    },
    function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    },
    function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    }
], Digit2, [0.01, 0.01, 0.01, 0.01]));
const Digit3 = Digit1.createClone("Digit3", 159 + 240, 140 + 180);
Digit3.setAnimation("pop-update", new MultiFrameLinearAnimation([function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    },
    function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    },
    function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    }
], Digit3, [0.01, 0.01, 0.01, 0.01]));
const Digit4 = Digit1.createClone("Digit4", 171 + 240, 140 + 180);
Digit4.setAnimation("pop-update", new MultiFrameLinearAnimation([function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    },
    function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    },
    function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    }
], Digit4, [0.01, 0.01, 0.01, 0.01]));
const Digit5 = Digit1.createClone("Digit5", 183 + 240, 140 + 180);
Digit5.setAnimation("pop-update", new MultiFrameLinearAnimation([function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    },
    function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    },
    function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    }
], Digit5, [0.01, 0.01, 0.01, 0.01]));
const Digit6 = Digit1.createClone("Digit6", 195 + 240, 140 + 180);
Digit6.setAnimation("pop-update", new MultiFrameLinearAnimation([function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    },
    function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    },
    function() {
        this.y -= 3.33;
        this.properties.transparency -= 20;
        this.properties.brightness -= 23.33;
    }
], Digit6, [0.01, 0.01, 0.01, 0.01]));

let digits = [Digit1, Digit2, Digit3, Digit4, Digit5, Digit6];

function updateDigit(d) {
    let score = String(Math.round(Level.Current.score + Level.Score)),
        firstDigit = undefined;

    let num = score[digits.indexOf(d)];
    if (!num) {
        d.properties.visible = false;
        return;
    }
    if (parseInt(num) !== d.properties.costume) {
        d.properties.costume = parseInt(num);
        if (d === Digit1 || (!firstDigit && d !== Digit1)) {
            firstDigit = d;
            d.properties.transparency = 60;
            d.properties.brightness = 70;
            d.y = 255;
            d.properties.visible = true;
            d.getAnimation("pop-update").end();
            d.getAnimation("pop-update").start();
        }
    }

    if (!d.properties.visible) {
        d.properties.transparency = 60;
        d.properties.brightness = 70;
        d.y = 255;
        d.properties.visible = true;
        d.getAnimation("pop-update").end();
        d.getAnimation("pop-update").start();
    }
}
Digit1.setAnimation("update-score", new MultiFrameLinearAnimation([function() {
        updateDigit(Digit1);
    },
    function() {
        updateDigit(Digit2);
    },
    function() {
        updateDigit(Digit3);
    },
    function() {
        updateDigit(Digit4);
    },
    function() {
        updateDigit(Digit5);
    },
    function() {
        updateDigit(Digit6);
    }
], Digit1, [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01]));
Digit1.setListener("update-score", function() {
    Digit1.getAnimation("update-score").end();
    Digit1.getAnimation("update-score").start();
});
Digit1.project.createGroup("score-digits", ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"]);

const Hint = new Sprite("Hint", -118 + 240, 140 + 180, 100, 50, ["InGame_Hint", "InGame_Hint_2", "InGame_Hint_3"], [], {
    centered: true,
    size: 0,
    visible: false
});
Hint.setUserEventListener("hover", "mousemove", function(event) {
    if (!this.properties.visible || this.properties.costume === 2) return;
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }
});
Hint.setUserEventListener("click", "click", function(event) {
    if (!this.properties.visible || this.properties.costume === 2) return;
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        Level.Current.hint.properties.size = 130;
        Level.Current.hint.properties.rotation = -10;
        Level.Current.hint.properties.transparency = 90;
        Level.Current.hint.getAnimation("show").start();
        Level.Current.levelBonus -= 25;
        this.properties.costume = 2;
        this.project.audio["ding"].start();
    }
});
Hint.setAnimation("grow", new LoopAnimation(function() {
    this.properties.size += (100 - this.properties.size) / 4;
    if (Math.round(this.properties.size) === 100) {
        this.getAnimation("grow").end();
    }
}, Hint, 0.033));
const InGame_Break_Line_1 = new Sprite("InGame_Break_Line_1", -84 + 240, 140 + 180, 80, 80, ["InGame_Break_Line"], [], {
    centered: true,
    visible: false,
    brightness: 100,
    contrast: 81,
    size: 0
});
const InGame_Break_Line_2 = InGame_Break_Line_1.createClone("InGame_Break_Line_2", 34 + 240, 140 + 180);
const InGame_Play = new Sprite("InGame_Play", -50 + 240, 140 + 180, 60, 60, ["InGame_Play", "InGame_Play_2", "InGame_Play_3"], [], {
    centered: true,
    visible: false,
    size: 0
});
InGame_Play.setUserEventListener("keydown", "keydown", function(event) {
    if (!InGame_Play.properties.visible || InGame_Play.properties.costume === 2) return;
    if (event.key === " ") {
        Level.Current.play();
        progressTutorial();
    }
});
InGame_Play.setUserEventListener("hover", "mousemove", function(event) {
    if (!this.properties.visible || this.properties.costume === 2) return;

    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }
});
InGame_Play.setUserEventListener("click", "click", function(event) {
    if (!this.properties.visible || this.properties.costume === 2) return;
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        Level.Current.play();
        progressTutorial();
    }
});
const Help_Shortcut = new Sprite("Help_Shortcut", 0 + 240, 140 + 180, 60, 60, ["Help_Shortcut", "Help_Shortcut_2", "Help_Shortcut_3"], [], {
    centered: true,
    visible: false,
    size: 0
});
Help_Shortcut.setUserEventListener("hover", "mousemove", function(event) {
    if (!this.properties.visible || this.properties.costume === 2) return;
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }
});
Help_Shortcut.setUserEventListener("click", "click", function(event) {
    if (!this.properties.visible || this.properties.costume === 2) return;
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.project.audio["mouse-click"].play();
        this.project.broadcast("help");
    }
});
Help_Shortcut.setAnimation("grow", new LoopAnimation(function() {
    this.properties.size += (100 - this.properties.size) / 4;
    InGame_Play.properties.size += (100 - InGame_Play.properties.size) / 4;
    InGame_Break_Line_1.properties.size += (100 - InGame_Break_Line_1.properties.size) / 4;
    if (!this.project.state.tutorial) Hint.properties.size += (100 - Hint.properties.size) / 4;
    if (Math.round(this.properties.size) === 100) {
        this.getAnimation("grow").end();
    }
}, Help_Shortcut, 0.033));
Help_Shortcut.setAnimation("activate-delay", new MultiFrameLinearAnimation([function() {
    this.properties.costume = 0;
    InGame_Play.properties.costume = 0;
    Hint.properties.costume = 0;
    if (Level.Level) {
        Hint.getAnimation("grow").start();
    }
}], Help_Shortcut, [1]));
const Redo = new Sprite("Redo", -50 + 240, 140 + 180, 100, 100, ["Redo", "Redo_2", "Redo_3"], [], {
    centered: true,
    visible: false,
});
Redo.setUserEventListener("hover", "mousemove", function(event) {
    if (!this.properties.visible) return;
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }
});
Redo.setUserEventListener("click", "click", function(event) {
    if (!this.properties.visible) return;
    if (testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.visible = false;
        InGame_Play.properties.visible = true;
        // coolmathgames integration
        //parent.cmgGameEvent("replay", String(Level.Level));
        Level.Current.restart();
    }
});
Redo.setUserEventListener("keydown", "keydown", function(event) {
    if (!this.properties.visible) return;
    if (event.key === "r") {
        this.properties.visible = false;
        InGame_Play.properties.visible = true;
        Level.Current.restart();
    }
});
Redo.setAnimation("show-delay", new MultiFrameLinearAnimation([function() {
    if (Level.Current.playing) {
        InGame_Play.properties.visible = false;
        this.properties.visible = true;
    }
}], Redo, [1.5]));
const Character = new Sprite("Character", -210 + 240, 130 + 180, 100, 125, ["Character"], [], {
    centered: true,
    visible: true,
    transparency: 100
});
const Tutorial_Text = new Sprite("Tutorial_Text", 0 + 240, -125 + 180, 460, 80, ["Line_1", "Line_2", "Line_3", "Line_4", "Line_5", "Line_6", "Line_7"], [], {
    centered: true,
    visible: true,
    transparency: 100
});
Tutorial_Text.setAnimation("fade-in", new MultiFrameLinearAnimation([function() {
    this.properties.transparency -= 15;
    this.y -= 3;
}, function() {
    this.properties.transparency -= 15;
    this.y -= 3;
}, function() {
    this.properties.transparency -= 15;
    this.y -= 3;
}, function() {
    this.properties.transparency -= 15;
    this.y -= 3;
}, function() {
    this.properties.transparency -= 15;
    this.y -= 3;
}, function() {
    this.properties.transparency = 0;
    this.y -= 3;
}], Tutorial_Text, [2.5, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02]));
Tutorial_Text.setAnimation("fade-out", new MultiFrameLinearAnimation([function() {
    this.properties.transparency += 15;
    this.y += 3;
}, function() {
    this.properties.transparency += 15;
    this.y += 3;
}, function() {
    this.properties.transparency += 15;
    this.y += 3;
}, function() {
    this.properties.transparency += 15;
    this.y += 3;
}, function() {
    this.properties.transparency += 15;
    this.y += 3;
}, function() {
    this.properties.transparency = 100;
    this.y += 3;
}], Tutorial_Text, [2.5, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02]));
const Skip = new Sprite("Skip", -60 + 240, 140 + 180, 460, 320, ["Skip", "Skip_2"], [], {
    centered: true,
    visible: true,
    transparency: 100,
    hitbox: {
        width: 35,
        height: 19
    }
});
Skip.setUserEventListener("hover", "mousemove", function(event) {
    if (testMouseCollision(event.pageX, event.pageY, this) && this.properties.visible) {
        this.properties.costume = 1;
    } else {
        this.properties.costume = 0;
    }
});
Skip.setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this) && this.project.state.tutorial) {
        this.project.state.tutorial = false;
        this.project.getSprite("Character").properties.visible = false;
        this.project.getSprite("Character").getAnimation("fade-in").end(false);
        this.project.getSprite("Tutorial_Text").properties.visible = false;
        this.project.getSprite("Tutorial_Text").getAnimation("fade-in").end(false);

        this.project.getSprite("Help_Shortcut").properties.visible = true;
        this.project.getSprite("InGame_Play").properties.visible = true;
        this.project.getSprite("InGame_Break_Line_1").properties.visible = true;
        this.project.getSprite("Help_Shortcut").getAnimation("grow").start();
        this.project.getSprite("Ripple").getAnimation("ripple").end();
        this.project.getSprite("Ripple").properties.visible = false;
        Level.Edit = true;
        this.properties.visible = false;
        this.project.audio["mouse-click"].play();
    }
});
Skip.setAnimation("fade-in", new MultiFrameLinearAnimation([function() {
    this.properties.transparency -= 15;
}, function() {
    this.properties.transparency -= 15;
}, function() {
    this.properties.transparency -= 15;
}, function() {
    this.properties.transparency -= 15;
}, function() {
    this.properties.transparency -= 15;
}, function() {
    this.properties.transparency = 0;
}], Skip, [2.5, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02]));
Skip.setAnimation("fade-out", new MultiFrameLinearAnimation([function() {
    this.properties.transparency += 15;
}, function() {
    this.properties.transparency += 15;
}, function() {
    this.properties.transparency += 15;
}, function() {
    this.properties.transparency += 15;
}, function() {
    this.properties.transparency += 15;
}, function() {
    this.properties.transparency = 100;
}], Skip, [2.5, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02]));

Project.Main.createGroup("game", ["Grid", "Player_Arrow", "Disc", "Score", "Score_Box", "InGame_Break_Line_1", "InGame_Break_Line_2", "InGame_Play", "Help_Shortcut", "Hint", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"]);

Character.setAnimation("scene-cut", new LoopAnimation(function() {
    Project.Main.darkness -= 10;
    if (Project.Main.darkness === 0) {
        this.getAnimation("scene-cut").end();
    }
}, Character, 0.033));
Character.setAnimation("tilt", new LoopAnimation(function() {
    Character.properties.rotation = (Math.sin(toRadians(this.project.getSprite("Backlight_2").getVariable("turn"))) * 2) - 5;
}, Character, 0.033));
Character.setAnimation("fade-in", new MultiFrameLinearAnimation([function() {
    this.getAnimation("tilt").start();
    this.properties.transparency -= 15;
    this.x += 3;
}, function() {
    this.properties.transparency -= 15;
    this.x += 3;
}, function() {
    this.properties.transparency -= 15;
    this.x += 3;
}, function() {
    this.properties.transparency -= 15;
    this.x += 3;
}, function() {
    this.properties.transparency -= 15;
    this.x += 3;
}, function() {
    this.properties.transparency = 0;
    this.x += 3;
}], Character, [2.5, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02]));
Character.setAnimation("fade-out", new MultiFrameLinearAnimation([function() {
    this.getAnimation("tilt").end();
    this.properties.transparency += 15;
    this.x -= 3;
}, function() {
    this.properties.transparency += 15;
    this.x -= 3;
}, function() {
    this.properties.transparency += 15;
    this.x -= 3;
}, function() {
    this.properties.transparency += 15;
    this.x -= 3;
}, function() {
    this.properties.transparency += 15;
    this.x -= 3;
}, function() {
    this.properties.transparency = 100;
    this.x -= 3;
}], Character, [2.5, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02]));

const Ripple = new Sprite("Ripple", -112 + 240, 28 + 180, 40, 40, ["Ripple"], [], {
    centered: true,
    visible: false,
    size: 50
});
Ripple.setAnimation("ripple", new LoopAnimation(function() {
    this.properties.size += (150 - this.properties.size) / 5;
    this.properties.transparency += 12;
    if (Math.round(this.properties.transparency) === 180) {
        this.properties.transparency = 0;
        this.properties.size = 50;
    }
}, Ripple, 0.033));
Ripple.setAnimation("ripple-2", new LoopAnimation(function() {
    this.properties.size += (150 - this.properties.size) / 5;
    this.properties.transparency += 12;
    if (Math.round(this.properties.transparency) === 180) {
        this.properties.transparency = 0;
        this.properties.size = 50;
        this.getAnimation("ripple-2").end();
        this.properties.visible = false;
    }
}, Ripple, 0.033));

const Good_Run = new Sprite("Good_Run", 240, 180 - 70, 480, 360, ["Good_Run"], [], {
    centered: true,
    visible: false
});

const End_Break_Line = new Sprite("End_Break_Line", 240, 180 - 40, 480, 360, ["End_Break_Line"], [], {
    centered: true,
    visible: false,
    brightness: 100,
    contrast: 81,
    size: 0
});
End_Break_Line.setAnimation("grow", new LoopAnimation(function() {
    this.properties.size += (100 - this.properties.size) / 4;
    if (Math.round(this.properties.size) === 100) {
        this.getAnimation("grow").end();
    }
}, End_Break_Line, 0.033));

class Level {

    static Elements = [
        new Sprite("Element1", 120, 100, 50, 50, ["01", "02", "03", "04"], [], {
            centered: true,
            visible: false,
            size: 0,
            direction: 0,
            value: 100,
            type: 1,
            hit: false,
            sound: "Kick 1",
            hitbox: {
                width: 24,
                height: 24
            }
        }),
        new Sprite("Element2", 140, 100, 460, 80, ["05", "06"], [], {
            centered: true,
            visible: false,
            costume: 0,
            size: 0,
            type: 2,
            value: 150,
            hit: false,
            sound: "OpenHat 1",
            hitbox: {
                width: 20,
                height: 20
            }
        }),
        new Sprite("Element3", 160, 100, 56, 56, ["07"], [], {
            centered: true,
            visible: false,
            size: 0,
            type: 3,
            value: 15,
            hit: false,
            sound: "HiHat 4",
            hitbox: {
                width: 20,
                height: 20
            }
        }),
        new Sprite("Element4", 180, 100, 56, 56, ["08"], [], {
            centered: true,
            visible: false,
            size: 0,
            type: 4,
            hit: false,
            value: 15,
            sound: "HiHat 4",
            hitbox: {
                width: 20,
                height: 20
            }
        }),
        new Sprite("Element5", 200, 100, 30, 26, ["09", "10", "11", "12"], [], {
            centered: true,
            visible: false,
            size: 0,
            value: 75,
            type: 5,
            hit: false,
            sound: "Snare 1"
        }),
        new Sprite("Element6", 220, 100, 30, 24, ["13", "14"], [], {
            centered: true,
            visible: false,
            size: 0,
            value: 10,
            hit: false,
            type: 6,
            sound: "HiHat 1"
        }),
        new Sprite("Element7", 240, 100, 36, 36, ["16", "17", "18", "19", "33", "34", "35", "36"], [], {
            centered: true,
            visible: false,
            size: 0,
            active: true,
            hit: false,
            hits: 0,
            type: 7,
            value: 80,
            sound: "Snare 2"
        }),
        new Sprite("Element8", 260, 100, 36, 36, ["20", "21", "22", "23"], [], {
            centered: true,
            visible: false,
            hit: false,
            size: 0,
            type: 8,
            sound: "Riser 1",
            value: 180
        }),
        new Sprite("Element9", 360, 100, 56, 56, ["39", "40"], [], {
            centered: true,
            visible: false,
            hit: false,
            size: 0,
            type: 9,
            value: 125,
            sound: "AdLib 2",
            hitbox: {
                width: 20,
                height: 20
            }
        }),
    ];
    static Player_Arrow = new Sprite("Player_Arrow", 0, 0, 12, 18, ["Player_Arrow"], [], {
        centered: true,
        visible: false,
        rotation: -90,
        speed: 4,
        direction: 0
    });
    static Trail_1 = new Sprite("Trail_1", 0, 0, 2, 14, ["Trail_1", "Trail_2"], [], {
        centered: true,
        visible: true,
        brightness: 20,
        contrast: 81,
        size: 130,
        transparency: 30
    });
    static Disc = new Sprite("Disc", 0, 0, 32, 32, ["15"], [], {
        centered: false,
        visible: false,
        size: 0
    });
    static Level = 0;
    static All = [];
    static TutorialStage = 0;
    static Current;
    static Edit = false;
    static Score = 0;

    constructor(x, y, setup) {
        Project.Main.createGroup("game-elements", ["Player_Arrow", "Disc"]);
        this.elements = [];
        this.beatElement = undefined;
        this.halfBeatElement = undefined;
        this.outOfBounds = false;
        this.lastElementHit = undefined;
        this.playing = false;
        this.score = 0;
        this.levelBonus = 200;
        this.timeBonus = 200;
        this.hint = null;
        this.startPoint = {
            x: null,
            y: null,
            direction: null
        };
        this.endPoint = {
            x: null,
            y: null
        };
        this.setup = setup;

        this.level = Level.All.length;
        Level.All.push(this);

        if (this.level) {
            let costume = Project.Main.images[`Hint_${this.level}`];
            this.hint = new Sprite("Path", x + 240, y + 180, costume.width, costume.height, [`Hint_${this.level}`], [], {
                centered: true,
                visible: false,
                size: 130,
                transparency: 100,
                rotation: -10
            });

            this.hint.setAnimation("show", new MultiFrameLinearAnimation([function() {}, function() {
                this.properties.size += (100 - this.properties.size) / 2;
                this.properties.transparency -= 18;
                this.properties.rotation += 1;
                this.properties.visible = true;
            }, function() {
                this.properties.size += (100 - this.properties.size) / 2;
                this.properties.transparency -= 18;
                this.properties.rotation += 1;
            }, function() {
                this.properties.size += (100 - this.properties.size) / 2;
                this.properties.transparency -= 18;
                this.properties.rotation += 1;
            }, function() {
                this.properties.size += (100 - this.properties.size) / 2;
                this.properties.transparency -= 18;
                this.properties.rotation += 1;
            }, function() {
                this.properties.size += (100 - this.properties.size) / 2;
                this.properties.transparency -= 18;
                this.properties.rotation += 1;
            }, function() {
                this.properties.size += (100 - this.properties.size) / 2;
                this.properties.transparency -= 18;
                this.properties.rotation += 1;
            }, function() {
                this.properties.size += (100 - this.properties.size) / 2;
                this.properties.transparency -= 18;
                this.properties.rotation += 1;
            }, function() {
                this.properties.size += (100 - this.properties.size) / 2;
                this.properties.transparency -= 18;
                this.properties.rotation += 1;
            }, function() {
                this.properties.size += (100 - this.properties.size) / 2;
                this.properties.transparency -= 18;
                this.properties.rotation += 1;
            }, function() {
                this.properties.size += (100 - this.properties.size) / 2;
                this.properties.transparency -= 18;
                this.properties.rotation += 1;
            }, function() {
                this.properties.size = 100;
                this.properties.transparency = 0;
            }], this.hint, [0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025]));

            this.hint.setAnimation("hide", new MultiFrameLinearAnimation([function() {}, function() {
                this.properties.size += (130 - this.properties.size) / 3;
                this.properties.transparency += 18;
            }, function() {
                this.properties.size += (130 - this.properties.size) / 3;
                this.properties.transparency += 18;
            }, function() {
                this.properties.size += (130 - this.properties.size) / 3;
                this.properties.transparency += 18;
            }, function() {
                this.properties.size += (130 - this.properties.size) / 3;
                this.properties.transparency += 18;
            }, function() {
                this.properties.size += (130 - this.properties.size) / 3;
                this.properties.transparency += 18;
            }, function() {
                this.properties.size += (130 - this.properties.size) / 3;
                this.properties.transparency += 18;
            }, function() {
                this.properties.size += (130 - this.properties.size) / 3;
                this.properties.transparency += 18;
            }, function() {
                this.properties.size += (130 - this.properties.size) / 3;
                this.properties.transparency += 18;
            }, function() {
                this.properties.size += (130 - this.properties.size) / 3;
                this.properties.transparency += 18;
            }, function() {
                this.properties.size += (130 - this.properties.size) / 3;
                this.properties.transparency += 18;
            }, function() {
                this.properties.transparency = 100;
                this.properties.size = 150;
                this.properties.rotation = -10;
                this.properties.visible = false;
            }], this.hint, [0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025]));
        }
    }

    addElement(element, x, y, costume, portal, sound) {
        let clone = Level.Elements[element].createClone(undefined, (x * 28) + 240, (y * 28) + 180, {
            visible: false,
            size: 0,
            costume: costume || 0
        });

        let {
            width,
            height
        } = Project.Main.images[clone.costumes[clone.properties.costume]];
        if (clone.properties.centered) {
            clone.x = (clone.x + clone.width / 2) - width / 2;
            clone.y = (clone.y + clone.height / 2) - height / 2;
        }
        clone.width = width;
        clone.height = height;

        clone.playSound = function() {
            if (clone.properties.visible) {
                Project.Main.playSound(Level.Elements[clone.properties.type - 1].properties.sound);
            }
        }

        this.elements.push(clone);
        if (clone.properties.type === 9) clone.portalPartner = portal;
        if (clone.properties.type === 3) this.beatElement = clone;
        if (clone.properties.type === 4) this.halfBeatElement = clone;

        function def() {
            this.properties.brightness = 84;
            this.getAnimation("light-up").start();
            Level.Current.score += (this.properties.value || 0);
            this.project.broadcast("update-score");
            this.properties.hit = true;
            this.playSound();
        }

        switch (element) {
            case 0: {
                clone.hit = function() {
                    Grid.properties.size = 106;
                    Grid.getAnimation("grow").start();

                    let {
                        x,
                        y
                    } = Level.Player_Arrow;
                    Ripple.getAnimation("ripple-2").end();
                    Ripple.properties.visible = true;
                    Ripple.setPosition(x, y);
                    Ripple.getAnimation("ripple-2").start();

                    Level.Player_Arrow.pulse();

                    let rotation = Level.Player_Arrow.properties.rotation,
                        costume = this.properties.costume;

                    if ((rotation === -90 && costume === 2) || (rotation === 0 && costume === 3) || (rotation === 90 && costume === 0) || (rotation === 180 && costume === 1)) {
                        Level.Player_Arrow.setDirection(rotation);
                    } else if ((rotation === -90 && costume === 1) || (rotation === 0 && costume === 2) || (rotation === 90 && costume === 3) || (rotation === 180 && costume === 0)) {
                        Level.Player_Arrow.setDirection(rotation + 180);
                    } else if ((costume === 0 && rotation === 135) || (costume === 1 && rotation === 225) || (costume === 2 && rotation === -45) || (costume === 3 && rotation === 45)) {
                        Level.Player_Arrow.setDirection(rotation + 270);
                    }
                    def.call(this);
                }
            };
            break;
            case 1: {
                clone.hit = function() {
                    Grid.properties.size = 106;
                    Grid.getAnimation("grow").start();
                    let {
                        x,
                        y
                    } = Level.Player_Arrow;

                    Level.Player_Arrow.pulse();
                    let rotation = Level.Player_Arrow.properties.rotation,
                        costume = this.properties.costume;

                    if ((costume === 0 && rotation === -90) || (costume === 0 && rotation === 90) || (costume === 1 && rotation === 0) || (costume === 1 && rotation === 180)) {
                        Level.Player_Arrow.setDirection(rotation + 135);
                    } else if ((costume === 0 && rotation === 0) || (costume === 0 && rotation === 180) || (costume === 1 && rotation === -90) || (costume === 1 && rotation === 90)) {
                        Level.Player_Arrow.setDirection(rotation + 45);
                    }
                    def.call(this);
                }
            };
            break;
            case 2: {
                clone.setAnimation("light-up-3", new MultiFrameLinearAnimation([function() {
                    clone.properties.brightness -= 28;
                }, function() {
                    clone.properties.brightness -= 28;
                }, function() {
                    clone.properties.brightness -= 28;
                }], clone, [0.001, 0.001, 0.001, 0.001]));
                clone.hit = function() {
                    Level.Current.score += (this.properties.value || 0);
                    this.properties.hit = true;
                    this.project.broadcast("update-score");
                    this.playSound();
                    this.properties.brightness = 84;
                    this.getAnimation("light-up-3").start();
                }
            };
            break;
            case 3: {
                clone.setAnimation("light-up-3", new MultiFrameLinearAnimation([function() {
                    clone.properties.brightness -= 28;
                }, function() {
                    clone.properties.brightness -= 28;
                }, function() {
                    clone.properties.brightness -= 28;
                }], clone, [0.001, 0.001, 0.001, 0.001]));
                clone.hit = function() {
                    Level.Current.score += (this.properties.value || 0);
                    this.properties.hit = true;
                    this.project.broadcast("update-score");
                    this.playSound();
                    this.properties.brightness = 84;
                    this.getAnimation("light-up-3").start();
                }
            };
            break;
            case 4: {
                clone.hit = function() {
                    switch (this.properties.costume) {
                        case 0:
                            Level.Player_Arrow.setDirection(-90);
                            break;
                        case 1:
                            Level.Player_Arrow.setDirection(0);
                            break;
                        case 2:
                            Level.Player_Arrow.setDirection(90);
                            break;
                        case 3:
                            Level.Player_Arrow.setDirection(180);
                            break;
                    }
                    let {
                        x,
                        y
                    } = Level.Player_Arrow;

                    Ripple.getAnimation("ripple-2").end();
                    Ripple.properties.visible = true;
                    Ripple.setPosition(x, y);
                    Ripple.getAnimation("ripple-2").start();
                    Level.Player_Arrow.pulse();
                    def.call(this);
                }
            };
            break;
            case 5: {
                clone.hit = function() {
                    def.call(this);
                }
            };
            break;
            case 6: {
                clone.hit = function() {
                    if (!this.properties.active) return;

                    switch (this.properties.costume) {
                        case 3:
                            Level.Player_Arrow.setDirection(-90);
                            break;
                        case 0:
                            Level.Player_Arrow.setDirection(0);
                            break;
                        case 1:
                            Level.Player_Arrow.setDirection(90);
                            break;
                        case 2:
                            Level.Player_Arrow.setDirection(180);
                            break;
                    }
                    let {
                        x,
                        y
                    } = Level.Player_Arrow;
                    Level.Player_Arrow.pulse();

                    if (this.properties.hits === 2) {
                        this.properties.costume += 4;
                        this.properties.active = false;
                        this.properties.transparency = 50;
                    }
                    this.properties.hits++;
                    def.call(this);
                }
            };
            break;
            case 7: {
                clone.hit = function() {
                    let {
                        x,
                        y
                    } = Level.Player_Arrow;

                    Level.Player_Arrow.properties.speed = 7;
                    Level.Player_Arrow.setDirection(Level.Player_Arrow.direction);

                    Ripple.getAnimation("ripple-2").end();
                    Ripple.properties.visible = true;
                    Ripple.setPosition(x, y);
                    Ripple.getAnimation("ripple-2").start();
                    Level.Player_Arrow.pulse();
                    def.call(this);
                }
            };
            break;
            case 8: {
                clone.hit = function() {
                    let {
                        x,
                        y
                    } = Level.Player_Arrow;
                    Ripple.getAnimation("ripple-2").end();
                    Ripple.properties.visible = true;
                    Ripple.setPosition(x, y);
                    Ripple.getAnimation("ripple-2").start();

                    let rotation = Level.Player_Arrow.properties.rotation;
                    if (((rotation === -90 || rotation === 90) && this.properties.costume === 0) || ((rotation === 0 || rotation === 180) && this.properties.costume === 1)) {
                        Level.Player_Arrow.setPosition(this.portalPartner.x + this.portalPartner.width / 2, this.portalPartner.y + this.portalPartner.height / 2);
                        Level.Current.lastElementHit = this.portalPartner;
                        def.call(this.portalPartner);

                        if (this.properties.costume === this.portalPartner.properties.costume) {
                            Level.Player_Arrow.setDirection(rotation + 270);
                        } else {
                            Level.Player_Arrow.setDirection(rotation);
                        }
                    }
                    def.call(this);
                }
            };
            break;
        }

        clone.setAnimation("light-up", new MultiFrameLinearAnimation([function() {
            this.properties.brightness -= 14;
        }, function() {
            this.properties.brightness -= 14;
        }, function() {
            this.properties.brightness -= 14;
        }, function() {
            this.properties.brightness -= 14;
        }, function() {
            this.properties.brightness -= 14;
        }, function() {
            this.properties.brightness -= 14;
        }, function() {
            this.properties.brightness = 0;
        }], clone, [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01]));
        clone.setAnimation("light-up-2", new MultiFrameLinearAnimation([function() {
            this.properties.brightness -= 14;
        }, function() {
            this.properties.brightness -= 14;
        }, function() {
            this.properties.brightness -= 14;
        }, function() {
            this.properties.brightness -= 14;
        }, function() {
            this.properties.brightness -= 14;
        }, function() {
            this.properties.brightness -= 14;
        }, function() {
            this.properties.brightness = 0;
        }], clone, [0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005]));

        clone.setUserEventListener("click", "click", function(event) {
            if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this)) {
                if (Level.Edit || this.properties.active === true) {
                    switch (element) {
                        case 0: {
                            this.properties.costume = (this.properties.costume === this.costumes.length - 1) ? 0 : this.properties.costume + 1;
                        };
                        break;
                        case 1: {
                            this.properties.costume = (this.properties.costume === this.costumes.length - 1) ? 0 : this.properties.costume + 1;
                        };
                        break;
                        case 2: {};
                        break;
                        case 3: {};
                        break;
                        case 4: {
                            this.properties.costume = (this.properties.costume === this.costumes.length - 1) ? 0 : this.properties.costume + 1;
                        };
                        break;
                        case 5: {};
                        break;
                        case 6: {
                            if (this.properties.active) {
                                this.properties.costume = (this.properties.costume === 3) ? 0 : this.properties.costume + 1;
                            }
                        };
                        break;
                        case 7: {};
                        break;
                        case 8: {
                            this.properties.costume = (this.properties.costume === this.costumes.length - 1) ? 0 : this.properties.costume + 1;
                        };
                        break;
                    }
                    let costume = this.project.images[this.costumes[this.properties.costume]];
                    if (this.properties.centered) {
                        this.x = (this.x + this.width / 2) - costume.width / 2;
                        this.y = (this.y + this.height / 2) - costume.height / 2;
                    }
                    this.width = costume.width;
                    this.height = costume.height;
                }
                this.properties.size = 0;
                this.getAnimation("grow").start();
                if (!Level.Current.playing) this.playSound();
            }
        });
        clone.setAnimation("grow", new LoopAnimation(function() {
            this.properties.size += (100 - this.properties.size) / 4;
            if (Math.round(this.properties.size) === 100) {
                this.getAnimation("grow").end();
            }
        }, clone, 0.033));

        return clone;
    }

    setStart(x, y, direction) {
        if (!this.startPoint.x) {
            this.startPoint = {
                x: (x * 28) + 240,
                y: (y * 28) + 180,
                direction: direction
            };
        }
        if (this === Level.Current) {
            Level.Player_Arrow.setPosition(this.startPoint.x, this.startPoint.y);
            Level.Player_Arrow.setDirection(this.startPoint.direction);
        }
    }

    setEnd(x, y) {
        if (!this.endPoint.x) {
            this.endPoint = {
                x: (x * 28) - 16 + 240,
                y: (y * 28) - 16 + 180
            };
        }
        if (this === Level.Current) {
            Level.Disc.setPosition(this.endPoint.x, this.endPoint.y);
        }
    }

    start() {
        if (this.setup) this.setup();
        Level.Current = this;
        Level.Player_Arrow.properties.visible = true;
        Level.Player_Arrow.adjustLayer(this.elements.length);
        Level.Disc.adjustLayer(this.elements.length);
        Project.Main.deleteSprite(Level.Disc);
        Project.Main.deleteSprite(Level.Player_Arrow);
        Project.Main.addSprite(Level.Disc);
        Project.Main.addSprite(Level.Player_Arrow);
        if (Project.Main.state.settings.floatEffect) {
            Level.Player_Arrow.getAnimation("float").start();
        } else {
            Grid.properties.rotation = 0;
        }
        Level.Disc.properties.visible = true;
        this.setStart(this.startPoint.x, this.startPoint.y, this.startPoint.direction);
        this.setEnd(this.endPoint.x, this.endPoint.y);
        Level.Player_Arrow.properties.currentHalfBeat = {
            x: this.startPoint.x,
            y: this.startPoint.y
        };
        Level.Disc.setVariable("loadIndex", 0);
        Level.Disc.getAnimation("load-delay").start();
    }

    restart() {
        for (let element of this.elements) {
            element.properties.hit = false;
            element.properties.size = 0;
            element.getAnimation("grow").start();
            if (element.properties.type === 7) {
                if (!element.properties.active) {
                    element.properties.costume -= 4;
                    element.properties.active = true;
                    element.properties.transparency = 0;
                }
                element.properties.hits = 0;
            }
        }
        Level.Player_Arrow.project.modifySprites(["Disc", "Hint", "Score", "InGame_Break_Line_1", "InGame_Break_Line_2", "Help_Shortcut", "InGame_Play"], {
            size: 0
        });
        Level.Player_Arrow.properties.speed = 4;
        Level.Player_Arrow.properties.visible = true;
        Level.Player_Arrow.getAnimation("run").end();
        Score.getAnimation("grow").start();
        Help_Shortcut.getAnimation("grow").start();
        Level.Disc.getAnimation("grow").start();
        Level.Player_Arrow.getAnimation("run").end();
        Level.Player_Arrow.getAnimation("trail").end();
        this.setStart(this.startPoint.x, this.startPoint.y, this.startPoint.direction);
        this.lastElementHit = undefined;
        this.playing = false;
        this.score = 0;
        Project.Main.broadcast("update-score");
        Redo.properties.visible = false;
        InGame_Play.properties.visible = true;
        Level.Player_Arrow.properties.transparency = 100;
        Level.Player_Arrow.getAnimation("fade-in").start();
        Help_Shortcut.getAnimation("activate-delay").start();
        Level.Edit = true;
        Project.Main.audio["tape-player"].play();
        Level.Player_Arrow.getAnimation("raise-volume").start();
        Level.Player_Arrow.getAnimation("time-bonus").start();

        progressTutorial();
    }

    next() {
        Level.Level++;

        // coolmathgames integration
        //parent.cmgGameEvent("start", String(Level.Level));

        Level.Score += (this.score + this.levelBonus + this.timeBonus);
        localStorage.setItem("level", Level.Level);
        localStorage.setItem("score", Level.Score);
        localStorage.setItem("tutorial-stage", (Project.Main.state.tutorial) ? Level.TutorialStage : -1);

        Level.Edit = true;
        if (this.hint) this.hint.remove();
        Level.Player_Arrow.getAnimation("run").end();
        Level.Player_Arrow.getAnimation("trail").end();
        Level.Player_Arrow.getAnimation("float").end();
        Level.Player_Arrow.getAnimation("time-bonus").start();
        Level.Player_Arrow.properties.visible = false;
        Level.Player_Arrow.properties.speed = 4;
        Level.Disc.properties.size = 0;
        for (let element of this.elements) {
            element.properties.visible = false;
            element.remove();
        }
        Project.Main.darkness = 100;
        Score.properties.size = 0;
        InGame_Break_Line_2.properties.size = 0;
        Redo.properties.visible = false;
        InGame_Play.properties.visible = true;
        InGame_Play.properties.costume = 2;
        Help_Shortcut.properties.costume = 2;
        Hint.properties.costume = 0;
        Hint.properties.size = 0;
        Hint.properties.visible = true;
        Help_Shortcut.getAnimation("activate-delay").start();
        Score.getAnimation("grow").start();
        Grid.setProperties({
            visible: true,
            size: 0
        }).getAnimation("grow").start();
        Project.Main.audio["swoosh"].play();
        Project.Main.modifySprites(["Score", "Score_Box", "InGame_Break_Line_2", "Digit1"], {
            visible: true
        });
        Character.getAnimation("scene-cut").start();
        Level.Player_Arrow.getAnimation("raise-volume").start();


        if (Level.Level === 20) {
            Project.Main.modifySprites(["Grid", "Backlight", "InGame_Play", "Disc", "Backlight_2", "Hint", "InGame_Break_Line_1", "InGame_Break_Line_2", "Help_Shortcut"], {
                visible: false
            });
            Good_Run.properties.visible = true;
            End_Break_Line.properties.visible = true;
            End_Break_Line.getAnimation("grow").start();
            Score.translate(-180, -110);
            Project.Main.adjustSprites(["Score_Box", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"], "sprite.translate(-80, -110)");
            localStorage.removeItem("level");
            localStorage.removeItem("score");
            localStorage.removeItem("tutorial-stage");
            Level.Player_Arrow.getAnimation("lower-volume").start();
            Project.Main.audio["endmusic"].start(function() {
                Project.Main.audio["endmusic"].start();
            });
        } else {
            Project.Main.broadcast("update-score");
            Level.All[Level.Level].start();
        }

        progressTutorial();
    }

    play() {
        Level.Player_Arrow.getAnimation("run").start();
        Level.Player_Arrow.getAnimation("trail").start();
        Redo.getAnimation("show-delay").start();
        this.playing = true;
        Level.Edit = false;
        InGame_Play.properties.costume = 2;
        Help_Shortcut.properties.costume = 2;
        Hint.properties.costume = 2;
        if (this.hint) Level.Current.hint.getAnimation("hide").start();
        Level.Player_Arrow.getAnimation("lower-volume").start();
        Level.Player_Arrow.getAnimation("time-bonus").end();
    }
}
Project.Main.Levels = Level;

Level.Player_Arrow.setDirection = function(angle) {

    if (angle < 0) {
        angle = 360 - Math.abs(angle);
    } else if (angle > 360) {
        angle = angle - 360;
    }

    if (angle === 360) angle = 0;

    switch (angle) {
        case 0: {
            this.directionX = 0;
            this.directionY = -this.properties.speed;
        };
        break;
        case 45: {
            this.directionX = this.properties.speed;
            this.directionY = -this.properties.speed;
        };
        break;
        case 90: {
            this.directionX = this.properties.speed;
            this.directionY = 0;
        };
        break;
        case 135: {
            this.directionX = this.properties.speed;
            this.directionY = this.properties.speed;
        };
        break;
        case 180: {
            this.directionX = 0;
            this.directionY = this.properties.speed;
        }
        break;
        case 225: {
            this.directionX = -this.properties.speed;
            this.directionY = this.properties.speed;
        }
        break;
        case 270: {
            this.directionX = -this.properties.speed;
            this.directionY = 0;
        }
        break;
        case 315: {
            this.directionX = -this.properties.speed;
            this.directionY = -this.properties.speed;
        }
        break;
    }
    this.direction = angle;
    this.properties.rotation = angle - 90;
}
Level.Trail_1.setPosition(Level.Player_Arrow.x, Level.Player_Arrow.y);

Level.Player_Arrow.setAnimation("time-bonus", new LoopAnimation(function() {
    Level.Current.timeBonus -= 1.5;
}, Level.Player_Arrow, 1));

Level.Player_Arrow.setAnimation("lower-volume", new LoopAnimation(function() {
    let audio1 = this.project.audio["jazy"],
        audio2 = this.project.audio["jazy2"];
    if (audio1.volume - 0.1 < 0) {
        audio1.volume = 0;
        audio2.volume = 0;
        this.getAnimation("lower-volume").end();
        return;
    }
    audio1.volume -= 0.1;
    audio2.volume -= 0.1;
}, Level.Player_Arrow, 0.033));
Level.Player_Arrow.setAnimation("raise-volume", new LoopAnimation(function() {
    let audio1 = this.project.audio["jazy"],
        audio2 = this.project.audio["jazy2"];
    if (audio1.volume + 0.1 > 1) {
        audio1.volume = 1;
        audio2.volume = 1;
        this.getAnimation("raise-volume").end();
        return;
    }
    audio1.volume += 0.1;
    audio2.volume += 0.1;
}, Level.Player_Arrow, 0.033));
Level.Player_Arrow.pulse = function() {
    this.properties.size = 170;
    this.getAnimation("shrink").start();
}
Level.Player_Arrow.setAnimation("trail", new LoopAnimation(function() {
    let trailClone = Level.Trail_1.createClone(false, (this.x + (this.width / 2)), (this.y + (this.height / 2)), {
        visible: true,
        rotation: this.properties.rotation
    });
    trailClone.setAnimation("shrink", new MultiFrameLinearAnimation([function() {}, function() {
        this.properties.size += (100 + this.properties.size) / -40;
        this.properties.transparency += 7;
    }, function() {
        this.properties.size += (100 + this.properties.size) / -40;
        this.properties.transparency += 7;
    }, function() {
        this.properties.size += (100 + this.properties.size) / -40;
        this.properties.transparency += 7;
    }, function() {
        this.properties.size += (100 + this.properties.size) / -40;
        this.properties.transparency += 7;
    }, function() {
        this.properties.size += (100 + this.properties.size) / -40;
        this.properties.transparency += 7;
    }, function() {
        this.properties.size += (100 + this.properties.size) / -40;
        this.properties.transparency += 7;
    }, function() {
        this.properties.size += (100 + this.properties.size) / -40;
        this.properties.transparency += 7;
    }, function() {
        this.properties.size += (100 + this.properties.size) / -40;
        this.properties.transparency += 7;
    }, function() {
        this.properties.size += (100 + this.properties.size) / -40;
        this.properties.transparency += 7;
    }, function() {
        this.remove();
    }], trailClone, [0.033, 0.033, 0.033, 0.033, 0.033, 0.033, 0.033, 0.033, 0.033, 0.033, 0.033]));
    trailClone.getAnimation("shrink").start();
}, Level.Player_Arrow, 0.033));
Level.Player_Arrow.setAnimation("run", new LoopAnimation(function() {
    this.translate(this.directionX ?? 0, this.directionY ?? -4);

    for (let element of [...Level.Current.elements, Level.Disc]) {
        if (Level.Current.lastElementHit !== element && distance(this.x + (this.width / 2), this.y + (this.height / 2), element.x + (element.width / 2), element.y + (element.height / 2)) < 4) {
            if (element === Level.Disc) {
                Project.Main.playSound("Fanfare");
                Level.Player_Arrow.properties.visible = false;
                Level.Player_Arrow.getAnimation("run").end();
                for (let i of Level.Current.elements) {
                    if (!i.properties.hit && i !== Level.Disc) {
                        Level.Disc.getAnimation("show-misses").start(function() {
                            Level.Current.restart();
                        });
                        return;
                    }
                }
                Level.Current.next();
            }
            Level.Current.lastElementHit = element;
            if (element.hit) element.hit();
        }

        let x = (this.x + (this.width / 2)) - 240,
            y = (this.y + (this.height / 2)) - 180;
        let hbx = Level.Player_Arrow.properties.currentHalfBeat.x,
            hby = Level.Player_Arrow.properties.currentHalfBeat.y;
        if ((Math.abs(Math.round(x)) % 28 === 0) && (Math.abs(Math.round(y)) % 28 === 0) && (hbx !== x || hby !== y)) {
            Level.Player_Arrow.properties.currentHalfBeat = {
                x: x,
                y: y
            };
            let beatElement = Level.Current.beatElement,
                halfBeatElement = Level.Current.halfBeatElement;
            if (beatElement) {
                if (beatElement.properties.hit && !beatElement.properties.skip) {
                    beatElement.properties.skip = true;
                    beatElement.playSound();
                    beatElement.properties.brightness = 84;
                    beatElement.getAnimation("light-up-3").start();
                } else if (beatElement.properties.skip) {
                    beatElement.properties.skip = false;
                }
            }
            if (halfBeatElement) {
                if (halfBeatElement.properties.hit) {
                    halfBeatElement.playSound();
                    halfBeatElement.properties.brightness = 84;
                    halfBeatElement.getAnimation("light-up-3").start();
                }
            }
        }
        if (x < -180 || x > 185 || y < -100 || y > 100) {
            Level.Current.restart();
        }
    }
}, Level.Player_Arrow, 0.025));
Level.Player_Arrow.setAnimation("shrink", new LoopAnimation(function() {
    this.properties.size += (100 - this.properties.size) / 4;
    if (Math.round(this.properties.size) === 100) {
        this.getAnimation("shrink").end();
    }
}, Level.Player_Arrow, 0.033));
Level.Player_Arrow.setAnimation("float", new LoopAnimation(function() {
    let offset = this.project.getSprite("Backlight_2").getVariable("float-offset-2");
    Level.Disc.offsetY = offset;
    for (let element of Level.Current.elements) {
        element.offsetY = offset;
    }
}, Level.Player_Arrow, 0.033));
Level.Player_Arrow.setAnimation("fade-in", new MultiFrameLinearAnimation([function() {
    this.properties.transparency -= 15;
}, function() {
    this.properties.transparency -= 15;
}, function() {
    this.properties.transparency -= 15;
}, function() {
    this.properties.transparency -= 15;
}, function() {
    this.properties.transparency -= 15;
}, function() {
    this.properties.transparency = 0;
}], Level.Player_Arrow, [0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02]));
Level.Disc.setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this)) {
        this.properties.size = 0;
        this.getAnimation("grow").start();
        if (!Level.Current.playing) Project.Main.playSound("Fanfare");
    }
});
Level.Disc.setAnimation("grow", new LoopAnimation(function() {
    this.properties.size += (100 - this.properties.size) / 4;
    if (Math.round(this.properties.size) === 100) {
        this.getAnimation("grow").end();
    }
}, Level.Disc, 0.033));

function lightUpMisses() {
    for (let element of Level.Current.elements) {
        Project.Main.playSound("misses");
        if (!element.properties.hit) {
            element.properties.contrast = 90;
            element.properties.brightness = 84;
            element.getAnimation("light-up-2").end();
            element.getAnimation("light-up-2").start();
        }
    }
}

Level.Disc.setAnimation("show-misses", new MultiFrameLinearAnimation([function() {
    lightUpMisses();
}, function() {
    lightUpMisses();
}, function() {
    lightUpMisses();
}, function() {
    lightUpMisses();
}, function() {
    lightUpMisses();
}, function() {
    for (let elem of Level.Current.elements) {
        if (!elem.properties.hit) {
            elem.properties.contrast = 100;
            elem.properties.brightness = 0;
        }
    }
}], Level.Disc, [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3]));
Level.Disc.setAnimation("load-delay", new MultiFrameLinearAnimation([function() {
    this.getAnimation("load").start();
}], Level.Disc, [1]));

Level.Disc.setAnimation("load", new LoopAnimation(function() {
    if (this.variables.loadIndex === Level.Current.elements.length) {
        Level.Disc.getAnimation("grow").start();
        Project.Main.playSound("element-popup");
        this.getAnimation("load").end();
        return;
    }
    Level.Current.elements[this.variables.loadIndex].properties.visible = true;
    Level.Current.elements[this.variables.loadIndex].getAnimation("grow").start();
    this.variables.loadIndex++;
}, Level.Disc, 0.033));

let Level1 = new Level();
let symbolsClicked = {
    "1": false,
    "2": false,
    "3": false,
    "4": false
};

function progressTutorial() {
    if (!Project.Main.state.tutorial) return;
    if (!Level.TutorialStage && symbolsClicked["1"] && symbolsClicked["2"] && symbolsClicked["3"] && symbolsClicked["4"]) {
        Level.TutorialStage++;
        Tutorial_Text.getAnimation("fade-out").start(function() {
            Tutorial_Text.properties.costume = 1;
            Tutorial_Text.getAnimation("fade-in").start(function() {
                Ripple.properties.visible = true;
                Ripple.setPosition(-112 + 240, 28 + 180);
                Ripple.getAnimation("ripple").start();
                Level.TutorialStage++;
                Level.Disc.getAnimation("tutorial-delay").start(function() {
                    Ripple.properties.visible = false;
                    Ripple.getAnimation("ripple").end();
                    Tutorial_Text.getAnimation("fade-out").start(function() {
                        Tutorial_Text.properties.costume = 2;
                        Tutorial_Text.getAnimation("fade-in").start(function() {
                            Skip.properties.visible = false;
                            Help_Shortcut.properties.visible = true;
                            InGame_Break_Line_1.properties.visible = true;
                            InGame_Play.properties.visible = true;
                            Help_Shortcut.getAnimation("grow").start();
                            Level.TutorialStage++;
                        });
                    });
                    Character.getAnimation("fade-out").start();
                });
            });
        });
        Character.getAnimation("fade-out").start(function() {
            Character.getAnimation("fade-in").start();
        });
    } else if (Level.TutorialStage === 3) {
        Level.TutorialStage++;
    } else if (Level.TutorialStage === 4) {
        Tutorial_Text.getAnimation("fade-out").timingConfig[0] = 0.5;
        Tutorial_Text.getAnimation("fade-in").timingConfig[0] = 0.8;
        Character.getAnimation("fade-out").timingConfig[0] = 0.5;
        Character.getAnimation("fade-in").timingConfig[0] = 0.8;

        Tutorial_Text.getAnimation("fade-out").start(function() {
            Tutorial_Text.properties.costume = 3;
            Tutorial_Text.getAnimation("fade-in").start(function() {
                Level.Edit = true;
                Level.TutorialStage++;
                Help_Shortcut.properties.costume = 2;
                InGame_Play.properties.costume = 2;
                Level.Disc.getAnimation("tutorial-delay").timingConfig[0] = 5;
                Level.Disc.getAnimation("tutorial-delay").start(function() {
                    Tutorial_Text.getAnimation("fade-out").start(function() {
                        Tutorial_Text.properties.costume = 4;
                        Tutorial_Text.getAnimation("fade-in").start(function() {
                            Level.TutorialStage++;
                            Help_Shortcut.properties.costume = 0;
                            InGame_Play.properties.costume = 0;
                            Ripple.properties.visible = true;
                            Ripple.setPosition(Level.Disc.x + 16, Level.Disc.y + 13);
                            Ripple.getAnimation("ripple").start();
                            Level.Disc.getAnimation("tutorial-delay").timingConfig[0] = 4;
                            Level.Disc.getAnimation("tutorial-delay").start(function() {
                                Ripple.getAnimation("ripple").end();
                                Ripple.properties.visible = false;
                            });
                        });
                    });
                    Character.getAnimation("fade-out").start();
                })
            });
            Tutorial_Text.properties.costume = 3;
        });
        Character.getAnimation("fade-out").start();
    } else if (Level.TutorialStage === 6) {
        Level.Disc.getAnimation("tutorial-delay").timingConfig[0] = 2;
        Level.Disc.getAnimation("tutorial-delay").start(function() {
            Character.getAnimation("fade-out").start(false);
            Tutorial_Text.getAnimation("fade-out").start(function() {
                Level.TutorialStage++;
            });
        });
    } else if (Level.TutorialStage === 7 && Level.Level === 1) {
        Tutorial_Text.getAnimation("fade-in").timingConfig[0] = 2;
        Character.getAnimation("fade-in").timingConfig[0] = 2;
        Level.TutorialStage++;

        Character.getAnimation("fade-in").start(false);
        Tutorial_Text.properties.costume = 5;
        Tutorial_Text.getAnimation("fade-in").start(function() {
            Level.Disc.getAnimation("tutorial-delay").timingConfig[0] = 8;
            Level.Disc.getAnimation("tutorial-delay").start(function() {
                Character.getAnimation("fade-out").start(false);
                Tutorial_Text.getAnimation("fade-out").start(function() {
                    Level.TutorialStage++;
                });
            });
        });
    } else if (Level.TutorialStage === 9 && Level.Level === 3) {
        Tutorial_Text.getAnimation("fade-in").timingConfig[0] = 2;
        Character.getAnimation("fade-in").timingConfig[0] = 2;
        Level.TutorialStage++;

        Character.getAnimation("fade-in").start(false);
        Tutorial_Text.properties.costume = 6;
        Tutorial_Text.getAnimation("fade-in").start(function() {
            Level.Disc.getAnimation("tutorial-delay").timingConfig[0] = 8;
            Level.Disc.getAnimation("tutorial-delay").start(function() {
                Character.getAnimation("fade-out").start(false);
                Tutorial_Text.getAnimation("fade-out").start(function() {
                    Project.Main.state.tutorial = false;
                });
            });
        });
    }
}

Level.Disc.setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this) && !Level.TutorialStage) {
        symbolsClicked["4"] = true;
        progressTutorial();
    }
});

Level.Disc.setAnimation("tutorial-delay", new MultiFrameLinearAnimation([function() {
    progressTutorial();
}], Level.Disc, [6]));
Level1.addElement(0, -4, -1, 2).setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this) && !Level.TutorialStage) {
        symbolsClicked["1"] = true;
        progressTutorial();
    }
});
Level1.addElement(5, -2, -1).setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this) && !Level.TutorialStage) {
        symbolsClicked["2"] = true;
        progressTutorial();
    }
});
Level1.addElement(4, 0, -1).setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this) && !Level.TutorialStage) {
        symbolsClicked["3"] = true;
        progressTutorial();
    }
});
Level1.addElement(5, 2, -1).setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this) && !Level.TutorialStage) {
        symbolsClicked["2"] = true;
        progressTutorial();
    }
});
Level1.addElement(0, 4, -1, 3).setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this) && !Level.TutorialStage) {
        symbolsClicked["1"] = true;
        progressTutorial();
    }
});
Level1.addElement(0, 4, 1, 3).setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this) && !Level.TutorialStage) {
        symbolsClicked["1"] = true;
        progressTutorial();
    }
});
Level1.addElement(4, 2, 1, 2).setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this) && !Level.TutorialStage) {
        symbolsClicked["3"] = true;
        progressTutorial();
    }
});
Level1.addElement(5, 0, 1).setUserEventListener("click", "click", function(event) {
    if (this.properties.visible && testMouseCollision(event.pageX, event.pageY, this) && !Level.TutorialStage) {
        symbolsClicked["2"] = true;
        progressTutorial();
    }
});
Level1.setStart(-4, 1, 0);
Level1.setEnd(-2, 1);
Level.Edit = false;

Character.setListener("resume", function() {
    let level = parseInt(localStorage.getItem("level")),
        score = parseFloat(localStorage.getItem("score")),
        tutorialStage = parseInt(localStorage.getItem("tutorial-stage"));
    if (level !== null) {
        // coolmathgames integration
        //parent.cmgGameEvent("start");

        Level.Level = level;
        Level.Score = score;
        Level.TutorialStage = tutorialStage;
        this.project.properties.tutorial = (tutorialStage === -1) ? false : true;
        Digit1.getAnimation("update-score").start();
        this.project.getSprite("Help_Shortcut").properties.visible = true;
        this.project.getSprite("InGame_Play").properties.visible = true;
        this.project.getSprite("InGame_Break_Line_1").properties.visible = true;
        this.project.getSprite("Help_Shortcut").getAnimation("grow").start(function() {
            Help_Shortcut.properties.costume = 0;
            InGame_Play.properties.costume = 0;
        });
        this.project.getSprite("Hint").properties.visible = true;
        Help_Shortcut.properties.costume = 2;
        InGame_Play.properties.costume = 2;
        this.project.getSprite("Hint").getAnimation("grow").start();
        Level.Edit = true;
    }
});

Character.setListener("play", function() {
    // coolmathgames integration
    //parent.cmgGameEvent("start");

    this.project.audio["mouse-click"].play();
    this.project.audio["please-be-nice"].pause();
    if (this.project.state.settings.backgroundMusic) {
        this.project.audio["jazy"].start(function() {
            Project.Main.audio["jazy2"].start(function() {
                Project.Main.audio["jazy"].start();
            });
        });
    }
    Level.Trail_1.properties.costume = Project.Main.state.settings.trailColor;

    Project.Main.darkness = 100;
    Score.properties.size = 0;
    InGame_Break_Line_2.properties.size = 0;
    Score.getAnimation("grow").start();
    Grid.setProperties({
        visible: true,
        size: 0
    }).getAnimation("grow").start();
    Project.Main.modifySprites(["Score", "Score_Box", "InGame_Break_Line_2", "Digit1"], {
        visible: true
    });
    this.getAnimation("scene-cut").start();
    Level.All[Level.Level].start();

    if (!Level.TutorialStage) {
        Skip.getAnimation("fade-in").start();
        Character.getAnimation("fade-in").start();
        Tutorial_Text.getAnimation("fade-in").start();
    }
});

Grid.setListener("help", function() {
    if (this.project.state.page === 1) {
        this.project.modifyGroup("background-art", {
            visible: false
        });
        this.project.modifyGroup("score-digits", {
            visible: false
        });
        this.project.modifySprites(["Character", "Grid", "Tutorial_Text", "Help_Shortcut", "InGame_Break_Line_1", "InGame_Break_Line_2", "InGame_Play", "Score", "Score_Box", "Ripple"], {
            visible: false
        });
        Level.Disc.properties.visible = false;
        Level.Disc.properties.size = 0;
        Level.Player_Arrow.properties.visible = false;
        if (Level.Current.level) {
            Level.Current.hint.properties.visible = false;
            this.project.getSprite("Hint").properties.visible = false;
        }
        for (let element of Level.Current.elements) {
            element.properties.visible = false;
            element.properties.size = 0;
        }
    }
});

Grid.setListener("close-help", function() {
    if (this.project.state.page === 1) {
        this.project.modifyGroup("background-art", {
            visible: true
        });
        Digit1.getAnimation("update-score").start();
        this.project.modifySprites(["Grid", "Help_Shortcut", "InGame_Break_Line_1", "InGame_Break_Line_2", "InGame_Play", "Score", "Score_Box"], {
            visible: true
        });
        if (this.project.state.tutorial) {
            this.project.modifySprites(["Character", "Tutorial_Text"], {
                visible: true
            });
        }
        if (Level.Current.level) {
            Level.Current.hint.properties.visible = true;
            this.project.getSprite("Hint").properties.visible = true;
        }
        Level.Player_Arrow.properties.visible = true;
        Level.Disc.properties.visible = true;
        Level.Disc.properties.size = 0;
        Level.Disc.getAnimation("grow").start();
        for (let element of Level.Current.elements) {
            element.properties.visible = true;
            element.properties.size = 0;
            element.getAnimation("grow").start();
        }
    }
});

let Level2 = new Level(-28, -14);
Level2.addElement(0, -3, 1, 2);
Level2.addElement(5, -3, -1, 1);
Level2.addElement(0, -3, -2, 3);
Level2.addElement(4, -2, -2, 3);
Level2.addElement(5, 0, -2, 0);
Level2.addElement(0, 1, -2, 0);
Level2.addElement(0, 1, -1, 3);
Level2.addElement(0, 3, -1, 1);
Level2.addElement(4, 3, 1, 2);
Level2.addElement(5, 1, 1, 0);
Level2.addElement(0, 0, 1, 0);
Level2.setStart(-5, 1, 90);
Level2.setEnd(0, 0);

let Level3 = new Level(0, 0, function() {
    Level.Elements[0].properties.sound = "Kick 1";
    Level.Elements[5].properties.sound = "HiHat 1";
    Level.Elements[4].properties.sound = "Snare 1";
});
Level3.addElement(0, 5, 0, 0);
Level3.addElement(5, 4, 0, 0);
Level3.addElement(5, 3, 0, 0);
Level3.addElement(5, 2, 0, 0);
Level3.addElement(4, 1, 0, 0);
Level3.addElement(5, 1, -1, 1);
Level3.addElement(4, 1, -2, 3);
Level3.addElement(4, 0, -2, 0);
Level3.addElement(5, -1, -2, 0);
Level3.addElement(0, -2, -2, 1);
Level3.addElement(4, -2, -1, 1);
Level3.addElement(5, -2, 0, 1);
Level3.addElement(4, -2, 1, 0);
Level3.addElement(5, -3, 1, 0);
Level3.addElement(0, -4, 1, 1);
Level3.addElement(0, -4, 2, 0);
Level3.setStart(5, -2, 180);
Level3.setEnd(-5, 2);

let Level4 = new Level(-14, 14, function() {
    Level.Elements[0].properties.sound = "Kick 2";
    Level.Elements[5].properties.sound = "HiHat 2";
    Level.Elements[4].properties.sound = "Snap 1";
    Level.Elements[6].properties.sound = "Snare 2";
});
Level4.addElement(0, -1, 2, 1);
Level4.addElement(5, 0, 2, 0);
Level4.addElement(6, 1, 2, 1);
Level4.addElement(5, 1, 1, 1);
Level4.addElement(4, 1, 0, 3);
Level4.addElement(5, 0, 0, 0);
Level4.addElement(6, -1, 0, 2);
Level4.addElement(5, -2, 0, 0);
Level4.addElement(0, -3, 0, 1);
Level4.addElement(0, -3, 1, 1);
Level4.addElement(4, -4, 1, 0);
Level4.addElement(5, -1, -1, 1);
Level4.addElement(0, -1, -2, 2);
Level4.addElement(5, 0, -2, 0);
Level4.addElement(6, 1, -2, 2);
Level4.addElement(5, 2, -2, 0);
Level4.addElement(4, 3, -2, 3);
Level4.addElement(5, 3, -1, 1);
Level4.setStart(-1, 3, 0);
Level4.setEnd(3, 0);


let Level5 = new Level(14, -14, function() {
    Level.Elements[0].properties.sound = "Kick 2";
    Level.Elements[5].properties.sound = "HiHat 2";
    Level.Elements[4].properties.sound = "Snap 1";
    Level.Elements[6].properties.sound = "Snare 2";
});
Level5.addElement(0, -4, -1, 0);
Level5.addElement(6, -3, -1, 0);
Level5.addElement(5, -2, -1, 0);
Level5.addElement(5, -1, -1, 0);
Level5.addElement(4, 0, -1, 1);
Level5.addElement(5, 0, 0, 1);
Level5.addElement(5, 0, 1, 1);
Level5.addElement(5, -1, 1, 0);
Level5.addElement(4, -2, 1, 2);
Level5.addElement(6, 0, 2, 3);
Level5.addElement(6, 1, 1, 0);
Level5.addElement(0, 1, 2, 3);
Level5.addElement(5, 2, 1, 0);
Level5.addElement(0, 3, 1, 2);
Level5.addElement(0, 3, 0, 1);
Level5.addElement(5, 4, 0, 0);
Level5.addElement(4, 5, 0, 2);
Level5.addElement(5, 5, -1, 1);
Level5.addElement(0, 5, -2, 0);
Level5.addElement(5, 4, -2, 0);
Level5.setStart(-4, -3, 180);
Level5.setEnd(3, -2);

let Level6 = new Level(-14, 0, function() {
    Level.Elements[0].properties.sound = "Kick 2";
    Level.Elements[5].properties.sound = "HiHat 2";
    Level.Elements[4].properties.sound = "Snap 1";
    Level.Elements[6].properties.sound = "Snare 2";
});
Level6.addElement(0, -4, -2, 2);
Level6.addElement(5, -4, -1, 1);
Level6.addElement(6, -4, 0, 1);
Level6.addElement(6, -4, 1, 0);
Level6.addElement(4, -4, 2, 0);
Level6.addElement(0, -3, 2, 3);
Level6.addElement(5, -3, 0, 1);
Level6.addElement(5, -3, 1, 1);
Level6.addElement(0, -3, -1, 0);
Level6.addElement(5, -2, -1, 0);
Level6.addElement(6, -1, -1, 0);
Level6.addElement(6, 0, -1, 1);
Level6.addElement(4, 0, 0, 3);
Level6.addElement(0, 0, 1, 3);
Level6.addElement(5, 1, 1, 0);
Level6.addElement(0, 2, 1, 1);
Level6.addElement(0, 2, 0, 1);
Level6.addElement(5, 3, 0, 0);
Level6.addElement(6, 4, 0, 1);
Level6.addElement(6, 4, 1, 0);
Level6.setStart(-5, -2, 90);
Level6.setEnd(4, 2);

let Level7 = new Level(-14, 0, function() {
    Level.Elements[0].properties.sound = "Kick 3";
    Level.Elements[4].properties.sound = "Snare 3";
    Level.Elements[5].properties.sound = "HiHat 3";
    Level.Elements[1].properties.sound = "OpenHat 1";
});
Level7.addElement(0, -3, -2, 1);
Level7.addElement(5, -2, -2, 0);
Level7.addElement(4, -1, -2, 2);
Level7.addElement(5, 0, -2, 0);
Level7.addElement(0, 1, -2, 2);
Level7.addElement(5, 1, -1, 1);
Level7.addElement(5, 1, 0, 1);
Level7.addElement(4, 0, -1, 1);
Level7.addElement(5, -1, -1, 0);
Level7.addElement(0, 0, 0, 0);
Level7.addElement(5, 1, 0, 1);
Level7.addElement(4, 2, 0, 0);
Level7.addElement(1, 1, 1, 0);
Level7.addElement(0, 0, 2, 0);
Level7.setStart(-3, 0, 0);
Level7.setEnd(-2, -1);

let Level8 = new Level(-14, 0, function() {
    Level.Elements[0].properties.sound = "Kick 3";
    Level.Elements[1].properties.sound = "OpenHat 1";
    Level.Elements[4].properties.sound = "Snare 3";
    Level.Elements[5].properties.sound = "HiHat 3";
    Level.Elements[6].properties.sound = "WoodBlock 1";
});
Level8.addElement(0, -4, 2, 1);
Level8.addElement(1, -4, 0, 1);
Level8.addElement(4, -4, -1, 1);
Level8.addElement(4, -4, -2, 3);
Level8.addElement(0, -3, -2, 0);
Level8.addElement(0, -3, -1, 0);
Level8.addElement(5, -2, -1, 0);
Level8.addElement(6, -1, -1, 3);
Level8.addElement(5, 0, -1, 0);
Level8.addElement(4, 0, 0, 3);
Level8.addElement(6, 0, 1, 0);
Level8.addElement(6, 1, -1, 1);
Level8.addElement(4, 2, -1, 3);
Level8.addElement(5, 3, -1, 0);
Level8.addElement(0, 4, -1, 0);
Level8.addElement(4, 4, 0, 1);
Level8.addElement(1, 3, 1, 1);
Level8.addElement(6, 2, 1, 1);
Level8.addElement(1, -2, 2, 0);
Level8.setStart(-4, 1, 180);
Level8.setEnd(-5, 1);

let Level9 = new Level(14, 0, function() {
    Level.Elements[0].properties.sound = "Kick 3";
    Level.Elements[1].properties.sound = "OpenHat 1";
    Level.Elements[4].properties.sound = "Snare 3";
    Level.Elements[5].properties.sound = "HiHat 3";
    Level.Elements[6].properties.sound = "WoodBlock 1";
});
Level9.addElement(0, 6, 3, 1);
Level9.addElement(0, 6, 1, 2);
Level9.addElement(4, 4, 1, 1);
Level9.addElement(6, 3, 1, 1);
Level9.addElement(6, 2, 1, 0);
Level9.addElement(4, 2, 2, 1);
Level9.addElement(4, 1, 2, 3);
Level9.addElement(1, 1, 1, 0);
Level9.addElement(0, 0, 1, 1);
Level9.addElement(0, 0, 2, 0);
Level9.addElement(0, -1, 1, 1);
Level9.addElement(5, -1, 2, 1);
Level9.addElement(4, -1, 3, 3);
Level9.addElement(5, -2, 3, 0);
Level9.addElement(6, -3, 3, 3);
Level9.addElement(6, -4, 3, 1);
Level9.addElement(0, -5, 3, 3);
Level9.addElement(4, -5, 2, 2);
Level9.addElement(0, -5, 1, 1);
Level9.addElement(0, -4, 1, 2);
Level9.addElement(4, -4, 0, 3);
Level9.addElement(1, -4, -1, 0);
Level9.addElement(0, -2, -2, 0);
Level9.addElement(5, -1, -1, 0);
Level9.addElement(5, 0, 0, 0);
Level9.setStart(4, 3, 90);
Level9.setEnd(-2, -3);

let Level10 = new Level(0, 14, function() {
    Level.Elements[0].properties.sound = "Kick 4";
    Level.Elements[1].properties.sound = "Echo 1";
    Level.Elements[4].properties.sound = "Snare 4";
    Level.Elements[5].properties.sound = "HiHatRoll 1";
    Level.Elements[6].properties.sound = "WoodBlock 2";
});
Level10.addElement(2, -4, 0, 0);
Level10.addElement(5, -2, 0, 0);
Level10.addElement(0, -1, 0, 3);
Level10.addElement(4, -1, -1, 2);
Level10.addElement(0, -1, -2, 3);
Level10.addElement(6, 0, -2, 1);
Level10.addElement(6, 1, -2, 1);
Level10.addElement(0, 1, -1, 0);
Level10.addElement(0, 2, -1, 3);
Level10.addElement(5, 2, 1, 1);
Level10.addElement(4, 2, 2, 1);
Level10.addElement(0, 5, 2, 1);
Level10.addElement(0, 5, 1, 0);
Level10.addElement(6, 6, 1, 0);
Level10.addElement(0, 6, 0, 2);
Level10.addElement(0, 5, 0, 0);
Level10.addElement(4, 5, -1, 3);
Level10.addElement(4, 5, -2, 1);
Level10.addElement(1, 4, -2, 0);
Level10.addElement(6, -1, 3, 3);
Level10.addElement(4, -2, 3, 2);
Level10.addElement(0, -3, 3, 0);
Level10.addElement(0, -3, 2, 1);
Level10.setStart(-6, 0, 90);
Level10.setEnd(-4, 2);

let Level11 = new Level(14, 0, function() {
    Level.Elements[0].properties.sound = "Kick 4";
    Level.Elements[4].properties.sound = "Snare 4";
    Level.Elements[5].properties.sound = "HiHatRoll 1";
    Level.Elements[6].properties.sound = "WoodBlock 2";
    Level.Elements[1].properties.sound = "Echo 1";
});
Level11.addElement(0, 0, 2, 0);
Level11.addElement(0, 2, 2, 0);
Level11.addElement(6, 2, 1, 1);
Level11.addElement(4, 2, 0, 0);
Level11.addElement(6, 1, 0, 0);
Level11.addElement(5, 1, -1, 1);
Level11.addElement(0, 1, -2, 2);
Level11.addElement(0, 2, -2, 1);
Level11.addElement(4, 2, -3, 3);
Level11.addElement(5, 0, 0, 0);
Level11.addElement(0, -1, 0, 2);
Level11.addElement(3, -1, -1, 0);
Level11.addElement(6, -1, -2, 1);
Level11.addElement(0, -2, -2, 1);
Level11.addElement(0, -2, -1, 3);
Level11.addElement(4, -3, -1, 2);
Level11.addElement(4, -5, -1, 1);
Level11.addElement(1, -5, 0, 0);
Level11.addElement(4, -4, 1, 3);
Level11.addElement(5, -2, 1, 0);
Level11.setStart(0, 3, 0);
Level11.setEnd(6, -3);

let Level12 = new Level(0, 0, function() {
    Level.Elements[0].properties.sound = "Kick 5";
    Level.Elements[4].properties.sound = "Snare 5";
    Level.Elements[5].properties.sound = "AdLib 1";
    Level.Elements[6].properties.sound = "Clap 1";
    Level.Elements[2].properties.sound = "HiHat 5";
    Level.Elements[3].properties.sound = "HiHat 5";
    Level.Elements[7].properties.sound = "Riser 1";
});
Level12.addElement(0, 5, 2, 2);
Level12.addElement(0, 4, 2, 1);
Level12.addElement(0, 4, 1, 1);
Level12.addElement(4, 2, 1, 3);
Level12.addElement(6, 2, -1, 2);
Level12.addElement(3, 4, -1, 0);
Level12.addElement(0, 5, -1, 0);
Level12.addElement(0, 5, -3, 3);
Level12.addElement(4, 2, -3, 3);
Level12.addElement(0, -1, -3, 0);
Level12.addElement(0, -1, -2, 1);
Level12.addElement(5, 1, -2, 0);
Level12.addElement(4, 3, -2, 3);
Level12.addElement(7, 4, -2, 0);
Level12.addElement(6, 6, -2, 1);
Level12.addElement(4, 6, 2, 3);
Level12.addElement(0, 6, 3, 3);
Level12.addElement(6, 0, 3, 0);
Level12.addElement(0, -2, 3, 1);
Level12.addElement(0, -2, 1, 0);
Level12.addElement(0, -3, 1, 1);
Level12.addElement(0, -3, 3, 2);
Level12.addElement(4, -5, 3, 1);
Level12.addElement(5, -5, 1, 1);
Level12.addElement(0, -5, -1, 2);
Level12.addElement(0, -3, -1, 0);
Level12.addElement(6, -3, -3, 1);
Level12.addElement(0, -4, -3, 1);
Level12.addElement(0, -4, 0, 3);
Level12.addElement(0, -6, 0, 2);
Level12.addElement(4, -6, 2, 2);
Level12.setStart(5, 1, 180);
Level12.setEnd(-6, 3);

let Level13 = new Level(0, 0, function() {
    Level.Elements[5].properties.sound = "HiHat 6";
    Level.Elements[2].properties.sound = "Tamb 1";
    Level.Elements[1].properties.sound = "OpenHat 2";
    Level.Elements[7].properties.sound = "Riser 2";
    Level.Elements[0].properties.sound = "Kick 5";
    Level.Elements[4].properties.sound = "Snare 5";
    Level.Elements[6].properties.sound = "Clap 1";
});
Level13.addElement(7, -5, 2, 2);
Level13.addElement(0, -6, 2, 0);
Level13.addElement(5, -6, 0, 1);
Level13.addElement(4, -6, -2, 1);
Level13.addElement(0, -4, -2, 3);
Level13.addElement(5, -4, 0, 1);
Level13.addElement(0, -4, 1, 1);
Level13.addElement(4, -3, 1, 2);
Level13.addElement(6, -1, 1, 2);
Level13.addElement(2, -1, -1, 0);
Level13.addElement(0, -1, -3, 0);
Level13.addElement(5, 1, -3, 0);
Level13.addElement(4, 3, -3, 0);
Level13.addElement(0, -1, 3, 2);
Level13.addElement(0, 1, 3, 3);
Level13.addElement(5, 1, 1, 1);
Level13.addElement(4, 1, -1, 2);
Level13.addElement(1, 3, -1, 1);
Level13.addElement(0, 5, -3, 3);
Level13.addElement(4, 2, 0, 1);
Level13.addElement(6, 5, 0, 0);
Level13.addElement(6, 5, 3, 1);
Level13.addElement(4, 2, 3, 2);
Level13.addElement(0, 2, 1, 1);
Level13.addElement(0, 4, 1, 1);
Level13.addElement(0, 4, 2, 0);
Level13.setStart(-4, 2, 270);
Level13.setEnd(6, 2);

let Level14 = new Level(0, 0, function() {
    Level.Elements[0].properties.sound = "Kick 6";
    Level.Elements[4].properties.sound = "Snare 6";
    Level.Elements[5].properties.sound = "Triangle 1";
    Level.Elements[6].properties.sound = "Kick 7";
    Level.Elements[2].properties.sound = "HiHat 7";
    Level.Elements[1].properties.sound = "OpenHat 3";
    Level.Elements[7].properties.sound = "Echo 2";
});
Level14.addElement(0, 0, -3, 0);
Level14.addElement(3, 0, -3, 0);
Level14.addElement(0, -2, -3, 2);
Level14.addElement(0, -2, -2, 0);
Level14.addElement(4, -1, -2, 2);
Level14.addElement(4, 2, -2, 0);
Level14.addElement(0, 3, -2, 1);
Level14.addElement(5, 3, -2, 1);
Level14.addElement(0, 3, -1, 0);
Level14.addElement(0, 4, -1, 1);
Level14.addElement(6, 4, -2, 1);
Level14.addElement(4, 5, -2, 0);
Level14.addElement(4, 5, 0, 0);
Level14.addElement(1, 4, 0, 0);
Level14.addElement(6, 3, 1, 0);
Level14.addElement(0, 2, 1, 0);
Level14.addElement(0, 2, 0, 1);
Level14.addElement(5, 2, 0, 0);
Level14.addElement(4, 0, 0, 2);
Level14.addElement(1, -2, 0, 1);
Level14.addElement(4, -4, -2, 3);
Level14.addElement(5, -5, -2, 0);
Level14.addElement(4, -6, -2, 0);
Level14.addElement(5, -6, -1, 1);
Level14.addElement(4, -6, 0, 1);
Level14.addElement(5, -5, 0, 0);
Level14.addElement(0, -4, 0, 0);
Level14.addElement(6, -4, 1, 1);
Level14.addElement(0, -4, 2, 0);
Level14.addElement(6, -5, 2, 2);
Level14.addElement(0, -5, 3, 2);
Level14.addElement(7, -3, 3, 0);
Level14.setStart(0, -2, 0);
Level14.setEnd(6, 3);

let Level15 = new Level(14, 0, function() {
    Level.Elements[0].properties.sound = "Kick 6";
    Level.Elements[4].properties.sound = "Snare 6";
    Level.Elements[5].properties.sound = "Triangle 1";
    Level.Elements[6].properties.sound = "Tom 1";
    Level.Elements[2].properties.sound = "HiHat 7";
    Level.Elements[1].properties.sound = "OpenHat 3";
});
Level15.addElement(0, 4, -1, 0);
Level15.addElement(0, 1, -1, 0);
Level15.addElement(7, 1, 0, 1);
Level15.addElement(0, 1, 2, 1);
Level15.addElement(5, 1, 2, 0);
Level15.addElement(4, -1, 2, 3);
Level15.addElement(0, -3, 2, 1);
Level15.addElement(2, -3, 2, 0);
Level15.addElement(0, -3, 0, 3);
Level15.addElement(0, 0, 0, 3);
Level15.addElement(4, 0, -1, 2);
Level15.addElement(0, 0, -2, 1);
Level15.addElement(0, -3, -2, 0);
Level15.addElement(6, -3, -1, 1);
Level15.addElement(6, -5, -1, 0);
Level15.addElement(4, -5, 0, 1);
Level15.addElement(0, -5, 3, 3);
Level15.addElement(0, -4, 3, 1);
Level15.addElement(4, -4, -3, 2);
Level15.addElement(6, -1, -3, 2);
Level15.addElement(6, 1, -3, 1);
Level15.addElement(4, 2, -3, 0);
Level15.addElement(1, 4, -3, 0);
Level15.setStart(4, -2, 180);
Level15.setEnd(6, -1);

let Level16 = new Level(0, 0, function() {
    Level.Elements[0].properties.sound = "Kick 8";
    Level.Elements[4].properties.sound = "Snare 7";
    Level.Elements[6].properties.sound = "Tom 2";
    Level.Elements[5].properties.sound = "Snap 2";
    Level.Elements[1].properties.sound = "OpenHat 4";
    Level.Elements[3].properties.sound = "HiHat 8";
    Level.Elements[8].properties.sound = "AdLib 2";
});
Level16.addElement(0, -4, -3, 0);
Level16.addElement(3, -4, -2, 0);
Level16.addElement(0, -4, 0, 1);
Level16.addElement(4, -5, 0, 1);
Level16.addElement(5, -5, 2, 1);
Level16.addElement(0, -5, 3, 0);
Level16.addElement(0, -2, 3, 3);
Level16.addElement(0, -2, 2, 1);
Level16.addElement(4, -3, 2, 1);
Level16.addElement(6, -3, 0, 0);
Level16.addElement(6, -3, -1, 0);
let pp = Level16.addElement(8, -3, -2, 0);
let pp1 = Level16.addElement(8, 1, 1, 0, pp);
pp.portalPartner = pp1;
Level16.addElement(0, 1, 3, 1);
Level16.addElement(0, 2, 3, 2);
Level16.addElement(4, 2, 2, 2);
Level16.addElement(1, 2, 0, 1);
Level16.addElement(6, 1, -1, 3);
Level16.addElement(0, 1, -2, 1);
Level16.addElement(6, 2, -2, 0);
Level16.addElement(0, 3, -2, 1);
Level16.addElement(0, 3, -1, 1);
Level16.addElement(4, 4, -1, 0);
Level16.addElement(0, 5, -1, 2);
Level16.addElement(5, 5, 0, 1);
Level16.addElement(4, 5, 1, 3);
Level16.setStart(-5, -3, 90);
Level16.setEnd(5, 2);

let Level17 = new Level(-28, 14, function() {
    Level.Elements[0].properties.sound = "Kick 8";
    Level.Elements[4].properties.sound = "Snare 7";
    Level.Elements[6].properties.sound = "Tom 2";
    Level.Elements[5].properties.sound = "Snap 2";
    Level.Elements[7].properties.sound = "Riser 3";
    Level.Elements[2].properties.sound = "Shaker 1";
    Level.Elements[3].properties.sound = "HiHat 8";
    Level.Elements[8].properties.sound = "AdLib 2";
});
Level17.addElement(0, 3, 2, 0);
Level17.addElement(2, 3, 2, 0);
Level17.addElement(4, 3, -1, 0);
Level17.addElement(0, 4, -1, 2);
Level17.addElement(4, 4, 1, 3);
Level17.addElement(0, 2, 1, 1);
Level17.addElement(4, 2, -2, 2);
let p2 = Level17.addElement(8, 1, -2, 0);
let p3 = Level17.addElement(8, -1, 0, 1, p2);
p2.portalPartner = p3;
Level17.addElement(7, -1, 1, 1);
Level17.addElement(0, -1, 2, 0);
Level17.addElement(4, -4, 2, 2);
Level17.addElement(0, -5, 2, 2);
Level17.addElement(3, -5, 1, 0);
Level17.addElement(4, -5, 0, 0);
Level17.addElement(4, -3, 0, 0);
Level17.addElement(0, -3, -2, 3);
Level17.addElement(4, -2, -2, 1);
Level17.addElement(0, -2, -1, 0);
Level17.addElement(4, -4, -1, 3);
Level17.addElement(0, -6, -1, 1);
Level17.addElement(4, -6, 2, 3);
Level17.addElement(0, -6, 3, 0);
Level17.addElement(4, -4, 3, 0);
Level17.addElement(4, -2, 3, 3);
Level17.setStart(4, 2, 270);
Level17.setEnd(0, 3);

let Level18 = new Level(0, 0, function() {
    Level.Elements[0].properties.sound = "Kick 9";
    Level.Elements[4].properties.sound = "Snare 8";
    Level.Elements[5].properties.sound = "Tamb 2";
    Level.Elements[2].properties.sound = "HiHat 9";
    Level.Elements[3].properties.sound = "HiHat 10";
    Level.Elements[8].properties.sound = "HiHatRoll 2";
});
Level18.addElement(0, 0, 2, 0);
Level18.addElement(0, -2, 2, 1);
Level18.addElement(4, -2, 0, 3);
Level18.addElement(2, 0, 0, 0);
Level18.addElement(0, 2, 0, 1);
Level18.addElement(0, 2, 1, 3);
let p4 = Level18.addElement(8, 3, 1, 0);
let p5 = Level18.addElement(8, 1, -3, 0, p4);
p4.portalPartner = p5;
Level18.addElement(4, 0, -3, 1);
Level18.addElement(0, 0, -2, 1);
Level18.addElement(5, 0, -2, 0);
Level18.addElement(4, -2, -2, 2);
Level18.addElement(0, -2, -3, 2);
let p6 = Level18.addElement(8, -1, -3, 0);
let p7 = Level18.addElement(8, -5, 2, 1, p6);
p6.portalPartner = p7;
Level18.addElement(0, -6, 2, 2);
Level18.addElement(3, -6, 2, 0);
Level18.addElement(0, -6, 1, 0);
Level18.addElement(0, -5, 1, 3);
Level18.addElement(5, -5, 1, 1);
Level18.addElement(4, -5, 0, 0);
Level18.addElement(4, -5, -1, 1);
Level18.addElement(5, -4, -1, 0);
Level18.addElement(0, 5, -1, 0);
Level18.addElement(4, 5, 0, 2);
Level18.addElement(0, 4, 0, 0);
Level18.addElement(4, 4, -2, 2);
Level18.addElement(4, 5, -2, 3);
Level18.addElement(0, 6, -2, 3);
Level18.setStart(0, 3, 0);
Level18.setEnd(6, 1);

let Level19 = new Level(0, 0, function() {
    Level.Elements[0].properties.sound = "Kick 9";
    Level.Elements[4].properties.sound = "Snare 8";
    Level.Elements[6].properties.sound = "Snare 9";
    Level.Elements[5].properties.sound = "Tamb 2";
    Level.Elements[2].properties.sound = "Tamb 2";
    Level.Elements[3].properties.sound = "HiHat 10";
    Level.Elements[8].properties.sound = "AdLib 3";
    Level.Elements[7].properties.sound = "Riser 4";
});
Level19.addElement(5, -1, 0, 1);
Level19.addElement(5, -1, -1, 1);
Level19.addElement(0, -1, -2, 0);
Level19.addElement(7, 1, -2, 0);
Level19.addElement(0, 2, -2, 2);
Level19.addElement(3, 2, -1, 0);
Level19.addElement(4, 2, 0, 0);
Level19.addElement(0, 2, 1, 1);
Level19.addElement(0, 4, 1, 1);
Level19.addElement(4, 4, 1, 3);
Level19.addElement(0, 4, 0, 1);
Level19.addElement(4, 3, 0, 2);
Level19.addElement(0, 3, -1, 2);
Level19.addElement(4, 5, -1, 1);
Level19.addElement(0, 6, -1, 3);
Level19.addElement(0, 6, 1, 0);
Level19.addElement(4, 6, 1, 1);
Level19.addElement(0, 5, 1, 0);
let p8 = Level19.addElement(8, 5, 0, 1);
let p9 = Level19.addElement(8, -1, 2, 0, p8);
p8.portalPartner = p9;
Level19.addElement(2, -2, 2, 0);
Level19.addElement(0, -3, 2, 2);
Level19.addElement(4, -3, 1, 2);
Level19.addElement(6, -3, -1, 0);
Level19.addElement(6, -6, -1, 2);
Level19.addElement(4, -6, 2, 0);
Level19.setStart(-1, 1, 0);
Level19.setEnd(-2, -1);

let Level20 = new Level(-14, 0, function() {
    Level.Elements[0].properties.sound = "Kick 10";
    Level.Elements[4].properties.sound = "Snare 10";
    Level.Elements[6].properties.sound = "Tom 3";
    Level.Elements[5].properties.sound = "Tamb 2";
    Level.Elements[1].properties.sound = "OpenHat 5";
    Level.Elements[2].properties.sound = "HiHat 11";
    Level.Elements[8].properties.sound = "AdLib 4";
});
Level20.addElement(7, 1, -3, 0);
Level20.addElement(0, 3, -3, 1);
Level20.addElement(2, 3, -1, 0);
Level20.addElement(0, 3, 0, 2);
Level20.addElement(4, 2, 0, 2);
Level20.addElement(6, 0, 0, 0);
Level20.addElement(4, 0, -2, 0);
Level20.addElement(0, -1, 0, 0);
Level20.addElement(4, -1, 1, 1);
Level20.addElement(0, 4, 1, 1);
Level20.addElement(0, 4, -1, 1);
Level20.addElement(4, 5, -1, 3);
let p10 = Level20.addElement(8, 5, 0, 0);
Level20.addElement(0, -2, -3, 3);
Level20.addElement(0, -4, -3, 0);
Level20.addElement(4, -2, 2, 2);
Level20.addElement(0, -4, 2, 2);
Level20.addElement(6, -4, 0, 0);
Level20.addElement(4, -4, -2, 1);
Level20.addElement(0, -6, 0, 1);
Level20.addElement(1, -6, 2, 1);
let p11 = Level20.addElement(8, -6, 3, 1, p10);
p10.portalPartner = p11;
Level20.setStart(0, -3, 90);
Level20.setEnd(-6, -1);

/*
document.getElementById("skip").addEventListener("click", function() {
    Level.Current.next();
    Project.Main.audio["mouse-click"].play();
}); */
document.addEventListener("adBreakStart", () => {
Level.Player_Arrow.getAnimation("lower-volume").start();
});
document.addEventListener("adBreakComplete", () => {
Level.Player_Arrow.getAnimation("raise-volume").start();
});


Project.Main.addSound("AdLib 1", "/public/Elements/sounds/AdLib1.wav");
Project.Main.addSound("HiHat 7", "/public/Elements/sounds/HiHat7.wav");
Project.Main.addSound("OpenHat 1", "/public/Elements/sounds/OpenHat1.wav");
Project.Main.addSound("Snare 4", "/public/Elements/sounds/Snare4.wav");
Project.Main.addSound("AdLib 2", "/public/Elements/sounds/AdLib2.wav");
Project.Main.addSound("HiHat 8", "/public/Elements/sounds/HiHat8.wav");
Project.Main.addSound("OpenHat 2", "/public/Elements/sounds/OpenHat2.wav");
Project.Main.addSound("Snare 5", "/public/Elements/sounds/Snare5.wav");
Project.Main.addSound("AdLib 3", "/public/Elements/sounds/AdLib3.wav");
Project.Main.addSound("HiHat 9", "/public/Elements/sounds/HiHat9.wav");
Project.Main.addSound("OpenHat 3", "/public/Elements/sounds/OpenHat3.wav");
Project.Main.addSound("Snare 6", "/public/Elements/sounds/Snare6.wav");
Project.Main.addSound("AdLib 4", "/public/Elements/sounds/AdLib4.wav");
Project.Main.addSound("HiHatRoll 1", "/public/Elements/sounds/HiHatRoll1.wav");
Project.Main.addSound("OpenHat 4", "/public/Elements/sounds/OpenHat4.wav");
Project.Main.addSound("Snare 7", "/public/Elements/sounds/Snare7.wav");
Project.Main.addSound("Clap 1", "/public/Elements/sounds/Clap1.wav");
Project.Main.addSound("HiHatRoll 2", "/public/Elements/sounds/HiHatRoll2.wav");
Project.Main.addSound("OpenHat 5", "/public/Elements/sounds/OpenHat5.wav");
Project.Main.addSound("Snare 8", "/public/Elements/sounds/Snare8.wav");
Project.Main.addSound("Echo 1", "/public/Elements/sounds/Echo1.wav");
Project.Main.addSound("Kick 10", "/public/Elements/sounds/Kick10.wav");
Project.Main.addSound("Riser 1", "/public/Elements/sounds/Riser1.wav");
Project.Main.addSound("Snare 9", "/public/Elements/sounds/Snare9.wav");
Project.Main.addSound("Echo 2", "/public/Elements/sounds/Echo2.wav");
Project.Main.addSound("Kick 1", "/public/Elements/sounds/Kick1.wav");
Project.Main.addSound("Riser 2", "/public/Elements/sounds/Riser2.wav");
Project.Main.addSound("Tamb 1", "/public/Elements/sounds/Tamb1.wav");
Project.Main.addSound("Fanfare", "/public/Elements/sounds/Fanfare.wav");
Project.Main.addSound("Kick 2", "/public/Elements/sounds/Kick2.wav");
Project.Main.addSound("Riser 3", "/public/Elements/sounds/Riser3.wav");
Project.Main.addSound("Tamb 2", "/public/Elements/sounds/Tamb2.wav");
Project.Main.addSound("HiHat 10", "/public/Elements/sounds/HiHat10.wav");
Project.Main.addSound("Kick 3", "/public/Elements/sounds/Kick3.wav");
Project.Main.addSound("Riser 4", "/public/Elements/sounds/Riser4.wav");
Project.Main.addSound("Tom 1", "/public/Elements/sounds/Tom1.wav");
Project.Main.addSound("HiHat 11", "/public/Elements/sounds/HiHat11.wav");
Project.Main.addSound("Kick 4", "/public/Elements/sounds/Kick4.wav");
Project.Main.addSound("Shaker 1", "/public/Elements/sounds/Shaker1.wav");
Project.Main.addSound("Tom 2", "/public/Elements/sounds/Tom2.wav");
Project.Main.addSound("HiHat 1", "/public/Elements/sounds/HiHat1.wav");
Project.Main.addSound("Kick 5", "/public/Elements/sounds/Kick5.wav");
Project.Main.addSound("Snap 1", "/public/Elements/sounds/Snap1.wav");
Project.Main.addSound("Tom 3", "/public/Elements/sounds/Tom3.wav");
Project.Main.addSound("HiHat 2", "/public/Elements/sounds/HiHat2.wav");
Project.Main.addSound("Kick 6", "/public/Elements/sounds/Kick6.wav");
Project.Main.addSound("Snap 2", "/public/Elements/sounds/Snap2.wav");
Project.Main.addSound("Triangle 1", "/public/Elements/sounds/Triangle1.wav");
Project.Main.addSound("HiHat 3", "/public/Elements/sounds/HiHat3.wav");
Project.Main.addSound("Kick 7", "/public/Elements/sounds/Kick7.wav");
Project.Main.addSound("Snare 10", "/public/Elements/sounds/Snare10.wav");
Project.Main.addSound("WoodBlock 1", "/public/Elements/sounds/WoodBlock1.wav");
Project.Main.addSound("HiHat 4", "/public/Elements/sounds/HiHat4.wav");
Project.Main.addSound("Kick 8", "/public/Elements/sounds/Kick8.wav");
Project.Main.addSound("Snare 1", "/public/Elements/sounds/Snare1.wav");
Project.Main.addSound("WoodBlock 2", "/public/Elements/sounds/WoodBlock2.wav");
Project.Main.addSound("HiHat 5", "/public/Elements/sounds/HiHat5.wav");
Project.Main.addSound("Kick 9", "/public/Elements/sounds/Kick9.wav");
Project.Main.addSound("Snare 2", "/public/Elements/sounds/Snare2.wav");
Project.Main.addSound("zma", "/public/Elements/sounds/zapsplat_multimedia_alert_mallet_wood_simple_musical_negative_001_65490.wav");
Project.Main.addSound("HiHat 6", "/public/Elements/sounds/HiHat6.wav");
Project.Main.addSound("notification", "/public/Elements/sounds/notifications-sound-127856.wav");
Project.Main.addSound("Snare 3", "/public/Elements/sounds/Snare3.wav");
Project.Main.addSound("misses", "/public/Elements/sounds/misses.wav");
