/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Ripple extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Null", "./Ripple/costumes/Null.svg", { x: 0, y: 0 }),
      new Costume("Ripple", "./Ripple/costumes/Ripple.png", { x: 40, y: 40 }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Ripple" },
        this.whenIReceiveRipple
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel2
      ),
      new Trigger(Trigger.BROADCAST, { name: "Skip" }, this.whenIReceiveSkip),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Return Game" },
        this.whenIReceiveReturnGame
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.costume = "Null";
    this.goto(0, 0);
    this.visible = false;
    this.size = 50;
    this.effects.ghost = 0;
  }

  *whenIReceiveRipple() {
    if (this.costumeNumber === 1) {
      this.createClone();
    }
  }

  *startAsClone() {
    this.costume = "Ripple";
    this.goto(this.sprites["PlayerArrow"].x, this.sprites["PlayerArrow"].y);
    this.visible = true;
    this.size = 50;
    this.effects.ghost = 0;
    for (let i = 0; i < 10; i++) {
      this.size += (150 - this.size) / 5;
      this.effects.ghost += 12;
      yield;
    }
    this.deleteThisClone();
  }

  *whenGreenFlagClicked2() {
    this.stage.vars.indicate = "No";
    this.stage.vars.indications = 0;
    this.visible = false;
    this.goto(0, 0);
  }

  *gridPositionTimes(x, y, value) {
    this.stage.vars.indicate = "Yes";
    this.stage.vars.indications++;
    yield* this.wait(1);
    if (this.toNumber(this.stage.vars.helpClones) === 0) {
      this.visible = true;
      this.moveAhead();
      this.effects.clear();
      this.goto(this.toNumber(x) * 28, this.toNumber(y) * 28);
      for (let i = 0; i < this.toNumber(value); i++) {
        this.costume = "Ripple";
        this.visible = true;
        this.size = 50;
        this.effects.ghost = 0;
        for (let i = 0; i < 10; i++) {
          this.size += (150 - this.size) / 5;
          this.effects.ghost += 12;
          yield;
        }
        yield* this.wait(0.2);
        yield;
      }
      this.visible = false;
      yield* this.wait(0.5);
      this.stage.vars.indicate = "No";
      this.costume = "Null";
    }
  }

  *whenIReceiveNextLevel() {
    this.visible = false;
    this.costume = "Null";
    while (!(this.toNumber(this.stage.vars.line) === 2)) {
      yield;
    }
    if (this.toString(this.stage.vars.skipped) === "No") {
      yield* this.gridPositionTimes(-4, -1, 12);
    }
  }

  *whenIReceiveNextLevel2() {
    while (!(this.toNumber(this.stage.vars.line) === 5)) {
      yield;
    }
    if (
      this.toNumber(this.stage.vars.indications) === 1 &&
      this.toString(this.stage.vars.skipped) === "No"
    ) {
      yield* this.gridPositionTimes(-2, -1, 12);
    }
  }

  *whenIReceiveSkip() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveReturnGame() {
    if (this.toString(this.stage.vars.skipped) === "No") {
      this.visible = true;
    }
  }
}
