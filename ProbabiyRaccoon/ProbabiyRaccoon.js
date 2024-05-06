/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ProbabiyRaccoon extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Character", "./ProbabiyRaccoon/costumes/Character.png", {
        x: 100,
        y: 125,
      }),
      new Costume("Skip", "./ProbabiyRaccoon/costumes/Skip.png", {
        x: 460,
        y: 320,
      }),
      new Costume("Skip 2", "./ProbabiyRaccoon/costumes/Skip 2.png", {
        x: 460,
        y: 320,
      }),
    ];

    this.sounds = [
      new Sound(
        "mouse-click-117076",
        "./ProbabiyRaccoon/sounds/mouse-click-117076.wav"
      ),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Show Block" },
        this.whenIReceiveShowBlock
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Hide Block" },
        this.whenIReceiveHideBlock
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.BROADCAST, { name: "Help" }, this.whenIReceiveHelp),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Return Game" },
        this.whenIReceiveReturnGame
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.BROADCAST, { name: "Skip" }, this.whenIReceiveSkip),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(-210, -130);
    this.direction = 85;
    this.costume = "Character";
    this.stage.vars.skipped = "No";
  }

  *whenIReceiveShowBlock() {
    this.moveAhead();
    if (this.costumeNumber === 1) {
      this.x = -210;
      this.effects.ghost = 100;
      if (this.toNumber(this.stage.vars.line) === 1) {
        this.createClone();
      }
      if (this.toNumber(this.stage.vars.helpClones) === 0) {
        this.visible = true;
        for (let i = 0; i < 5; i++) {
          this.x += 3;
          this.effects.ghost -= 15;
          yield;
        }
        this.effects.ghost = 0;
      }
    }
  }

  *whenIReceiveHideBlock() {
    if (this.costumeNumber === 1) {
      for (let i = 0; i < 5; i++) {
        this.x -= 3;
        this.effects.ghost += 20;
        yield;
      }
      this.visible = false;
    }
  }

  *whenIReceiveNextLevel() {
    if (this.costumeNumber === 1) {
      this.x = -210;
      this.visible = false;
      if (this.toString(this.stage.vars.floating) === "On") {
        while (true) {
          this.direction =
            85 +
            Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 1;
          yield;
        }
      }
    }
  }

  *whenIReceiveHelp() {
    if (this.costumeNumber === 1) {
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
  }

  *whenIReceiveReturnGame() {
    if (this.costumeNumber === 1) {
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
  }

  *startAsClone() {
    this.goto(-60, -140);
    this.costume = "Skip Tutorial";
    this.effects.ghost = 100;
    this.direction = 90;
    this.visible = true;
    for (let i = 0; i < 5; i++) {
      this.effects.ghost -= 15;
      yield;
    }
    this.effects.ghost = 0;
  }

  *startAsClone2() {
    while (!(this.toNumber(this.stage.vars.line) === 3)) {
      if (
        this.compare(this.mouse.x, this.x - 25) > 0 &&
        this.compare(this.mouse.x, this.x + 25) < 0 &&
        this.compare(this.mouse.y, this.y - 15) > 0 &&
        this.compare(this.mouse.y, this.y + 15) < 0
      ) {
        this.costume = "Skip 2";
        if (this.mouse.down) {
          yield* this.startSound("mouse-click-117076");
          this.broadcast("Skip");
          this.stage.vars.skipped = "Yes";
          return;
        }
      } else {
        this.costume = "Skip";
      }
      yield;
    }
    this.visible = false;
  }

  *whenIReceiveSkip() {
    this.visible = false;
    yield* this.wait(0.5);
    while (
      !(
        this.compare(
          this.stage.vars.clone,
          this.stage.vars.positions.length
        ) === 0
      )
    ) {
      yield;
    }
    this.stage.vars.playEnabled = "Yes";
    this.stage.vars.helpEnabled = "Yes";
    this.stage.vars.ready = "Yes";
  }
}
