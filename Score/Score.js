/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Score extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("0", "./Score/costumes/0.png", { x: 150, y: 150 }),
      new Costume("1", "./Score/costumes/1.png", { x: 150, y: 150 }),
      new Costume("2", "./Score/costumes/2.png", { x: 150, y: 150 }),
      new Costume("3", "./Score/costumes/3.png", { x: 150, y: 150 }),
      new Costume("4", "./Score/costumes/4.png", { x: 150, y: 150 }),
      new Costume("5", "./Score/costumes/5.png", { x: 150, y: 150 }),
      new Costume("6", "./Score/costumes/6.png", { x: 150, y: 150 }),
      new Costume("7", "./Score/costumes/7.png", { x: 150, y: 150 }),
      new Costume("8", "./Score/costumes/8.png", { x: 150, y: 150 }),
      new Costume("9", "./Score/costumes/9.png", { x: 150, y: 150 }),
      new Costume("Score Box", "./Score/costumes/Score Box.png", {
        x: 150,
        y: 150,
      }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel3
      ),
      new Trigger(Trigger.BROADCAST, { name: "Point" }, this.whenIReceivePoint),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel4
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(Trigger.BROADCAST, { name: "Help" }, this.whenIReceiveHelp),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Return Game" },
        this.whenIReceiveReturnGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart" },
        this.whenIReceiveRestart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart Was Pressed" },
        this.whenIReceiveRestartWasPressed
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "light up Leftovers" },
        this.whenIReceiveLightUpLeftovers
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Repeat Point" },
        this.whenIReceiveRepeatPoint
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "light up Leftovers" },
        this.whenIReceiveLightUpLeftovers2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: " Missing Blocks" },
        this.whenIReceiveMissingBlocks
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "End Screen" },
        this.whenIReceiveEndScreen
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone4),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Resume" },
        this.whenIReceiveResume
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.effects.clear();
    this.goto(166, -140);
    this.visible = false;
    this.costume = "Score Box";
    this.effects.ghost += 20;
    this.stage.vars.score = 0;
    this.stage.vars.id = 0;
    this.stage.vars.length = 0;
    this.stage.vars.timeBonus = 0;
  }

  *whenIReceiveNextLevel() {
    if (
      this.toNumber(this.stage.vars.level) === 1 &&
      this.toNumber(this.stage.vars.line) === 0
    ) {
      this.visible = true;
      this.stage.vars.score = 0;
      this.stage.vars.length = 1;
      this.stage.vars.id = 1;
      this.createClone();
    }
  }

  *startAsClone() {
    this.visible = false;
    this.size = 100;
    this.x = 122;
    this.y = -150;
    this.costume = 0;
    for (let i = 0; i < this.toNumber(this.stage.vars.id); i++) {
      this.x += 12;
      yield;
    }
    this.visible = true;
    this.moveAhead();
    while (true) {
      if (this.arrayIncludes(this.stage.vars.scoreX, this.x)) {
        this.costume = this.letterOf(
          this.stage.vars.score,
          this.indexInArray(this.stage.vars.scoreX, this.x)
        );
      }
      yield;
    }
  }

  *whenIReceiveNextLevel2() {
    if (this.costumeNumber === 11) {
      this.size = 0;
      while (!(this.size === 100)) {
        this.size += (100 - this.size) / 4;
        if (this.compare(this.size, 99) > 0) {
          this.size = 100;
        }
        yield;
      }
    }
  }

  *whenIReceiveNextLevel3() {
    if (this.costumeNumber === 11) {
      while (true) {
        while (
          !(
            this.compare(this.stage.vars.score.length, this.stage.vars.length) >
            0
          )
        ) {
          yield;
        }
        this.stage.vars.id++;
        this.createClone();
        this.stage.vars.length = this.stage.vars.id;
        yield;
      }
    }
  }

  *whenIReceivePoint() {
    if (
      !(this.costumeNumber === 11) &&
      this.compare(
        this.costumeNumber,
        this.letterOf(
          this.stage.vars.score,
          this.indexInArray(this.stage.vars.scoreX, this.x)
        )
      ) === 0
    ) {
      this.visible = false;
      yield* this.wait(
        (this.indexInArray(this.stage.vars.scoreX, this.x) + 1) * 0.013
      );
      this.effects.clear();
      this.visible = true;
      this.effects.ghost = 60;
      this.y = -150;
      this.effects.brightness = 70;
      if (this.toNumber(this.stage.vars.speed) === 4) {
        for (let i = 0; i < 3; i++) {
          this.effects.brightness -= 23.33;
          this.y += 3.33;
          this.effects.ghost -= 20;
          yield;
        }
      } else {
        if (this.toNumber(this.stage.vars.speed) === 7) {
          this.effects.ghost = 0;
          this.y = -140;
          this.effects.brightness = 0;
        }
      }
      this.effects.brightness = 0;
    }
  }

  *startAsClone2() {
    while (true) {
      if (
        this.compare(this.stage.vars.score.length, this.stage.vars.length) < 0
      ) {
        this.stage.vars.id--;
        this.stage.vars.length--;
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenIReceiveNextLevel4() {
    if (this.costumeNumber === 11) {
      while (!(this.toNumber(this.stage.vars.timeBonus) === 0.5)) {
        yield* this.wait(1);
        this.stage.vars.timeBonus -= 1.5;
        yield;
      }
    }
  }

  *startAsClone3() {
    this.effects.clear();
    this.effects.ghost = 60;
    this.y = -150;
    this.effects.brightness = 70;
    if (this.toNumber(this.stage.vars.speed) === 4) {
      for (let i = 0; i < 3; i++) {
        this.effects.brightness -= 23.33;
        this.y += 3.33;
        this.effects.ghost -= 20;
        yield;
      }
    } else {
      if (this.toNumber(this.stage.vars.speed) === 7) {
        this.effects.ghost = 0;
        this.y = -140;
        this.effects.brightness = 0;
      }
    }
    this.effects.brightness = 0;
  }

  *whenIReceiveHelp() {
    this.visible = false;
  }

  *whenIReceiveReturnGame() {
    this.visible = true;
    this.size = 0;
    while (!(this.size === 100)) {
      this.size += (100 - this.size) / 4;
      if (this.compare(this.size, 99) > 0) {
        this.size = 100;
      }
      yield;
    }
  }

  *whenIReceiveRestart() {
    if (this.costumeNumber === 11) {
      this.stage.vars.length = 1;
      this.stage.vars.id = 1;
    }
    this.deleteThisClone();
  }

  *whenIReceiveRestartWasPressed() {
    if (this.costumeNumber === 11) {
      this.stage.vars.length = 1;
      this.stage.vars.id = 1;
      this.createClone();
    }
  }

  *whenIReceiveLightUpLeftovers() {
    if (this.costumeNumber === 11) {
      this.stage.vars.length = 1;
      this.stage.vars.id = 1;
      this.createClone();
    }
  }

  *whenIReceiveRepeatPoint() {
    if (
      !(this.costumeNumber === 11) &&
      this.compare(
        this.costumeNumber,
        this.letterOf(
          this.stage.vars.score,
          this.indexInArray(this.stage.vars.scoreX, this.x)
        )
      ) === 0
    ) {
      this.effects.clear();
      this.visible = true;
      this.y = -140;
    }
  }

  *whenIReceiveLightUpLeftovers2() {
    this.deleteThisClone();
  }

  *whenIReceiveMissingBlocks() {
    if (this.costumeNumber === 11) {
      this.createClone();
    }
  }

  *whenIReceiveEndScreen() {
    if (this.costumeNumber === 11) {
      this.effects.ghost = 40;
      this.x = 91;
      this.y = -30;
    }
  }

  *startAsClone4() {
    while (
      !(
        this.compare(
          this.stage.vars.level,
          this.toNumber(this.stage.vars.endLevel) + 1
        ) === 0
      )
    ) {
      yield;
    }
    if (this.compare(this.costumeNumber, 11) < 0) {
      while (!(this.toString(this.stage.vars.playing) === "No")) {
        this.visible = false;
        yield;
      }
      /* TODO: Implement stop other scripts in sprite */ null;
      this.visible = true;
      this.y += 110;
      this.x -= 75;
      this.effects.ghost = 100;
      for (let i = 0; i < 5; i++) {
        this.effects.ghost -= 20;
        yield;
      }
    }
  }

  *whenIReceiveResume() {
    this.visible = true;
    this.stage.vars.score = this.stage.vars.savedScore;
    this.stage.vars.length = 0;
    this.stage.vars.id = 1;
  }
}
