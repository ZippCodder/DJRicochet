import {
    Sprite
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

const Controls = new Sprite("Controls", 10, 100 - 90, 460, 160, ["Controls"], [], {
    size: 0,
    visible: false
});
const Break_Line = new Sprite("Break_Line", 10, 140, 460, 80, ["Break_Line"], [], {
    size: 0,
    brightness: 100,
    contrast: 81,
    size: 0,
    visible: false
});
const Functions = new Sprite("Functions", 10, 100 + 90, 460, 160, ["Functions"], [], {
    size: 0,
    visible: false
});
Functions.setUserEventListener("show-description", "mousemove", (function(e) {
  if (this.properties.visible) {
     let clientX = e.pageX - this.project.width/2, clientY = e.pageY - this.project.height/2;  

     let helpIconPositions = [
       {x: -199, y: 82, costume: "Description_1"},
       {x: -199, y: 110, costume: "Description_2"},
       {x: -199, y: 146, costume: "Description_3"},
       {x: -65, y: 82, costume: "Description_4"},
       {x: -65, y: 110, costume: "Description_5"},
       {x: -65, y: 146, costume: "Description_6"},
       {x: 67, y: 82, costume: "Description_7"},
       {x: 67, y: 110, costume: "Description_8"},
       {x: 67, y: 146, costume: "Description_9"},
       {x: 199, y: 82, costume: "Description_10"},
       {x: 199, y: 110, costume: "Description_11"},
       {x: 199, y: 146, costume: "Description_12"}
     ]

     for (let position of helpIconPositions) {
       if (distance(position.x, position.y, clientX, clientY) < 15 && (!this.project.getSprite("Descriptions_1").properties.visible || !this.project.getSprite("Descriptions_2").properties.visible)) {
         let xOffset = (clientX < 0) ? 90:-90, isFirstDescriptionsSprite = (position.costume === "Description_1" || position.costume === "Description_2");

        ((isFirstDescriptionsSprite) ? this.project.getSprite("Descriptions_1"):this.project.getSprite("Descriptions_2")).setProperties({visible: true}).setPosition(position.x + xOffset, position.y - 90).setCostume(position.costume).translate((isFirstDescriptionsSprite) ? 90:0,0);
         this.project.getSprite("Box").setProperties({visible: true}).setPosition(position.x + xOffset, position.y - 90).translate(0,(isFirstDescriptionsSprite) ? -35:0);

         return;  
       }
     }
     this.project.getSprite("Box").setProperties({visible: false});
     this.project.getSprite("Descriptions_1").setProperties({visible: false});
     this.project.getSprite("Descriptions_2").setProperties({visible: false});
  }
}).bind(Functions));
const Box = new Sprite("Box", 0, 0, 480, 360, ["Box"],[],{visible: false, transparency: 15});
const Descriptions_1 = new Sprite("Descriptions_1", 0, 0, 300, 300, ["Description_1","Description_2"],[],{visible: false, transparency: 30});
const Descriptions_2 = new Sprite("Descriptions_2", 0, 0, 480, 360, ["Description_3","Description_4","Description_5","Description_6","Description_7","Description_8","Description_9","Description_10","Description_11","Description_12"],[],{visible: false, transparency: 30});

const Close = new Sprite("Close", 240 - 25 + 218, 180 - 25 - 162, 50, 50, ["Close"], [], {
    size: 0,
    visible: false,
    hitbox: {
        width: 50,
        height: 50
    }
});
Close.setUserEventListener("close-help", "click", (function() {
    if (testMouseCollision(event.pageX, event.pageY, this) && this.properties.visible) {
        this.project.broadcast("close-help");
        this.project.broadcast("glow-strip");
        this.project.modifySprites(["Controls", "Break_Line", "Functions", this], {
            visible: false,
            size: 0
        });
    }
}).bind(Close));
Controls.setAnimation("grow", new LoopAnimation(function() {
    this.properties.size += (100 - this.properties.size) / 4;
    Break_Line.properties.size += (90 - Break_Line.properties.size) / 4;
    Functions.properties.size += (100 - Functions.properties.size) / 4;
    Close.properties.size += (100 - Close.properties.size) / 4;

    if (Math.round(this.size) === 100) {
        Controls.getAnimation("grow").end();
    }
}, Controls, 0.033));
Controls.setVariable("turn", 0);
Controls.setAnimation("float", new LoopAnimation(function() {
    if (this.properties.visible) {
        this.variables.turn += 4;
        this.y -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
        Break_Line.y -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
        Functions.y -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
        Close.y -= Math.sin(toRadians(this.getVariable("turn"))) / 6;
        this.project.modifySprites(["Break_Line", "Functions", "Close", this], {
            rotation: Math.sin(toRadians(this.getVariable("turn"))) * 1
        });
    }
}, Controls, 0.033)).start();
Controls.setListener("help", function() {
    this.project.modifySprites(["Functions", "Close", "Break_Line", this], {
        visible: true,
        size: 0
    });
    this.getAnimation("grow").start();
});
