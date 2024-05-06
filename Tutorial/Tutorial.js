/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Tutorial extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Null", "./Tutorial/costumes/Null.svg", { x: 0, y: 0 }),
      new Costume("Line 1", "./Tutorial/costumes/Line 1.png", {
        x: 460,
        y: 80,
      }),
      new Costume("Line 2", "./Tutorial/costumes/Line 2.png", {
        x: 460,
        y: 80,
      }),
      new Costume("Line 3", "./Tutorial/costumes/Line 3.png", {
        x: 460,
        y: 80,
      }),
      new Costume("Line 4", "./Tutorial/costumes/Line 4.png", {
        x: 460,
        y: 80,
      }),
      new Costume("Line 5", "./Tutorial/costumes/Line 5.png", {
        x: 460,
        y: 80,
      }),
      new Costume("Line 6", "./Tutorial/costumes/Line 6.png", {
        x: 460,
        y: 80,
      }),
      new Costume("Line 7", "./Tutorial/costumes/Line 7.png", {
        x: 460,
        y: 80,
      }),
      new Costume("Back Block", "./Tutorial/costumes/Back Block.png", {
        x: 460,
        y: 80,
      }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Hide Block" },
        this.whenIReceiveHideBlock
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel2
      ),
      new Trigger(Trigger.BROADCAST, { name: "Help" }, this.whenIReceiveHelp),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Return Game" },
        this.whenIReceiveReturnGame
      ),
      new Trigger(Trigger.BROADCAST, { name: "Skip" }, this.whenIReceiveSkip),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Menu Return" },
        this.whenIReceiveMenuReturn
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart" },
        this.whenIReceiveRestart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart" },
        this.whenIReceiveRestart2
      ),
    ];
  }

  *whenIReceiveNextLevel() {
    this.visible = false;
    if (this.toString(this.stage.vars.skipped) === "No") {
      if (this.toNumber(this.stage.vars.line) === 0) {
        yield* this.runLineWaitSetVariableTo(3, 0);
        while (!(this.toNumber(this.stage.vars.clicks) === 8)) {
          yield;
        }
        yield* this.wait(2);
        yield* this.hideLine();
        yield* this.runLineWaitSetVariableTo(1, 0);
        while (!(this.toString(this.stage.vars.indicate) === "No")) {
          yield;
        }
        yield* this.wait(2);
        yield* this.hideLine();
        this.stage.vars.ready = "Yes";
        yield* this.runLineWaitSetVariableTo(1, 0);
        this.stage.vars.helpEnabled = "Yes";
        this.stage.vars.playEnabled = "Yes";
        while (!(this.toString(this.stage.vars.running) === "Yes")) {
          yield;
        }
        this.stage.vars.helpEnabled = "No";
        this.stage.vars.playEnabled = "No";
        yield* this.hideLine();
        while (!(this.toString(this.stage.vars.running) === "No")) {
          yield;
        }
      } else {
        if (this.toNumber(this.stage.vars.level) === 4) {
          yield* this.runLineWaitSetVariableTo(3, 0);
          while (!(this.toNumber(this.stage.vars.clicks) === 5)) {
            yield;
          }
          yield* this.wait(5);
          yield* this.hideLine();
        } else {
          if (this.toNumber(this.stage.vars.level) === 2) {
            yield* this.runLineWaitSetVariableTo(3, 0);
            while (
              !(
                this.toNumber(this.stage.vars.clicks) === 5 ||
                this.toString(this.stage.vars.running) === "Yes"
              )
            ) {
              yield;
            }
            yield* this.wait(6);
            this.stage.vars.runLine = "No";
            yield* this.hideLine();
          }
        }
      }
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.effects.clear();
    this.effects.brightness = 10;
    this.size = 100;
    this.costume = "Null";
    this.stage.vars.runLine = "Yes";
    this.stage.vars.line = 0;
  }

  *runLineWaitSetVariableTo(seconds, value) {
    if (this.compare(this.stage.vars.line, 3) < 0) {
      this.stage.vars.runLine = "Yes";
    }
    yield* this.wait(this.toNumber(seconds));
    if (this.compare(this.stage.vars.level, 3) < 0) {
      this.stage.vars.line++;
      if (this.compare(this.stage.vars.line, 6) > 0) {
        this.costume = "Line 6";
        this.stage.vars.line = 6;
      } else {
        this.costumeNumber++;
      }
    }
    if (this.toNumber(this.stage.vars.level) === 4) {
      this.stage.vars.line = 7;
      this.costume = "Line 7";
    }
    this.effects.ghost = 100;
    this.moveAhead();
    this.visible = false;
    this.goto(0, 125);
    if (this.toNumber(this.stage.vars.helpClones) === 0) {
      this.visible = true;
      this.broadcast("Show Block");
      this.createClone();
      for (let i = 0; i < 5; i++) {
        this.y += 3;
        this.effects.ghost -= 15;
        yield;
      }
      this.effects.ghost = 0;
      this.stage.vars.clicks = value;
    }
  }

  *hideLine() {
    yield* this.wait(1);
    this.broadcast("Hide Block");
    for (let i = 0; i < 5; i++) {
      this.y -= 3;
      this.effects.ghost += 20;
      yield;
    }
    this.visible = false;
    this.stage.vars.runLine = "No";
  }

  *startAsClone() {
    this.goto(0, 140);
    this.costume = "Back Block";
    this.moveBehind();
    this.size = 110;
    this.effects.ghost = 100;
    if (this.toNumber(this.stage.vars.helpClones) === 0) {
      this.visible = true;
      for (let i = 0; i < 5; i++) {
        this.effects.ghost -= 3;
        yield;
      }
    }
  }

  *whenIReceiveHideBlock() {
    if (this.costume.name === "Back Block") {
      for (let i = 0; i < 5; i++) {
        this.effects.ghost += 3;
        yield;
      }
      this.visible = false;
    }
  }

  *whenIReceiveNextLevel2() {
    if (this.costume.name === "Back Block") {
      for (let i = 0; i < 5; i++) {
        this.effects.ghost += 3;
        yield;
      }
      this.visible = false;
      this.deleteThisClone();
    }
  }

  *whenIReceiveHelp() {
    if (this.toString(this.stage.vars.runLine) === "Yes") {
      this.visible = false;
    } else {
      if (this.toString(this.stage.vars.runLine) === "No") {
        if (this.compare(this.stage.vars.line, 3) > 0) {
          this.visible = false;
        }
      }
    }
  }

  *whenIReceiveReturnGame() {
    if (this.toString(this.stage.vars.runLine) === "Yes") {
      this.visible = true;
    } else {
      if (this.toString(this.stage.vars.runLine) === "No") {
        if (this.compare(this.stage.vars.line, 3) > 0) {
          this.visible = true;
        }
      }
    }
  }

  *whenIReceiveSkip() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.stage.vars.runLine = "No";
    this.visible = false;
  }

  *whenIReceiveMenuReturn() {
    this.visible = false;
    this.effects.clear();
    this.effects.brightness = 10;
    this.size = 100;
    this.costume = "Null";
    this.stage.vars.runLine = "Yes";
    this.stage.vars.line = 0;
    this.deleteThisClone();
  }

  *whenIReceiveRestart() {
    if (this.toNumber(this.stage.vars.line) === 3) {
      this.stage.vars.runLine = "No";
      yield* this.runLineWaitSetVariableTo(1, 0);
      this.stage.vars.helpEnabled = "No";
      this.stage.vars.playEnabled = "No";
      this.stage.vars.clicks = 0;
      yield* this.wait(9);
      yield* this.hideLine();
      this.stage.vars.helpEnabled = "Yes";
      this.stage.vars.playEnabled = "Yes";
      yield* this.runLineWaitSetVariableTo(1, 0);
      this.stage.vars.ready = "Yes";
      while (!(this.toString(this.stage.vars.running) === "Yes")) {
        yield;
      }
      yield* this.wait(1);
      yield* this.hideLine();
    } else {
      null;
    }
  }

  *whenIReceiveRestart2() {
    if (this.costume.name === "Back Block") {
      for (let i = 0; i < 5; i++) {
        this.effects.ghost += 3;
        yield;
      }
      this.visible = false;
      this.deleteThisClone();
    }
  }
}
