/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Descriptions extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Box", "./Descriptions/costumes/Box.png", { x: 480, y: 360 }),
      new Costume(
        "Description 1",
        "./Descriptions/costumes/Description 1.png",
        { x: 300, y: 300 }
      ),
      new Costume(
        "Description 2",
        "./Descriptions/costumes/Description 2.png",
        { x: 300, y: 300 }
      ),
      new Costume(
        "Description 3",
        "./Descriptions/costumes/Description 3.png",
        { x: 480, y: 360 }
      ),
      new Costume(
        "Description 4",
        "./Descriptions/costumes/Description 4.png",
        { x: 480, y: 360 }
      ),
      new Costume(
        "Description 5",
        "./Descriptions/costumes/Description 5.png",
        { x: 480, y: 360 }
      ),
      new Costume(
        "Description 6",
        "./Descriptions/costumes/Description 6.png",
        { x: 480, y: 360 }
      ),
      new Costume(
        "Description 7",
        "./Descriptions/costumes/Description 7.png",
        { x: 480, y: 360 }
      ),
      new Costume(
        "Description 8",
        "./Descriptions/costumes/Description 8.png",
        { x: 480, y: 360 }
      ),
      new Costume(
        "Description 9",
        "./Descriptions/costumes/Description 9.png",
        { x: 480, y: 360 }
      ),
      new Costume(
        "Description 10",
        "./Descriptions/costumes/Description 10.png",
        { x: 480, y: 360 }
      ),
      new Costume(
        "Description 11",
        "./Descriptions/costumes/Description 11.png",
        { x: 480, y: 360 }
      ),
      new Costume(
        "Description 12",
        "./Descriptions/costumes/Description 12.png",
        { x: 480, y: 360 }
      ),
    ];

    this.sounds = [
      new Sound(
        "194362321-card-swipe",
        "./Descriptions/sounds/194362321-card-swipe.wav"
      ),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Description" },
        this.whenIReceiveDescription
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Hide Description" },
        this.whenIReceiveHideDescription
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(0, 0);
    this.costume = "Box";
    this.stage.vars.description = 0;
  }

  *startAsClone() {
    this.effects.clear();
    this.effects.ghost = 30;
    this.moveAhead();
    this.visible = true;
    this.costume = "Description " + this.toString(this.stage.vars.description);
    this.goto(this.sprites["Descriptions"].x, this.sprites["Descriptions"].y);
  }

  *whenIReceiveDescription() {
    if (this.costumeNumber === 1) {
      this.effects.ghost = 15;
      this.moveAhead();
      this.visible = true;
      yield* this.startSound("194362321-card-swipe");
      if (this.toNumber(this.stage.vars.description) === 1) {
        this.goto(-197 + 90, -80 + 90);
      } else {
        if (this.toNumber(this.stage.vars.description) === 2) {
          this.goto(-197 + 90, -113 + 90);
        } else {
          if (this.toNumber(this.stage.vars.description) === 3) {
            this.goto(-197 + 90, -146 + 90);
          } else {
            if (this.toNumber(this.stage.vars.description) === 4) {
              this.goto(-65 + 90, -80 + 90);
            } else {
              if (this.toNumber(this.stage.vars.description) === 5) {
                this.goto(-65 + 90, -113 + 90);
              } else {
                if (this.toNumber(this.stage.vars.description) === 6) {
                  this.goto(-65 + 90, -146 + 90);
                } else {
                  if (this.toNumber(this.stage.vars.description) === 7) {
                    this.goto(67 - 90, -80 + 90);
                  } else {
                    if (this.toNumber(this.stage.vars.description) === 8) {
                      this.goto(67 - 90, -113 + 90);
                    } else {
                      if (this.toNumber(this.stage.vars.description) === 9) {
                        this.goto(67 - 90, -146 + 90);
                      } else {
                        if (this.toNumber(this.stage.vars.description) === 10) {
                          this.goto(199 - 90, -80 + 90);
                        } else {
                          if (
                            this.toNumber(this.stage.vars.description) === 11
                          ) {
                            this.goto(199 - 90, -113 + 90);
                          } else {
                            if (
                              this.toNumber(this.stage.vars.description) === 12
                            ) {
                              this.goto(199 - 90, -146 + 90);
                            } else {
                              null;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      this.createClone();
    }
  }

  *whenIReceiveHideDescription() {
    this.visible = false;
    this.deleteThisClone();
  }
}
