/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Titles extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("ProbabIy_Not", "./Titles/costumes/ProbabIy_Not.png", {
        x: 480,
        y: 360,
      }),
      new Costume("Title 1", "./Titles/costumes/Title 1.png", {
        x: 480,
        y: 360,
      }),
      new Costume("Title 2", "./Titles/costumes/Title 2.png", {
        x: 480,
        y: 360,
      }),
      new Costume(
        "Anything To Start",
        "./Titles/costumes/Anything To Start.png",
        { x: 460, y: 80 }
      ),
      new Costume(
        "Headphones Recommended",
        "./Titles/costumes/Headphones Recommended.png",
        { x: 340, y: 120 }
      ),
      new Costume("Title 3", "./Titles/costumes/Title 3.png", {
        x: 370,
        y: 130,
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
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.BROADCAST, { name: "Help" }, this.whenIReceiveHelp),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Options" },
        this.whenIReceiveOptions
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.titleClones = 0;
    this.size = 0;
    this.goto(0, 0);
    this.costume = "ProbabIy_Not";
    this.visible = true;
    yield* this.wait(3);
    for (let i = 0; i < 11; i++) {
      this.x += 9 + this.x / 4;
      yield;
    }
    this.visible = false;
    this.goto(-386, 20);
    this.costume = "Title 1";
    this.size = 100;
    this.direction = 90;
    this.visible = true;
    this.stage.vars.titleClones++;
    this.createClone();
    this.broadcast("Glow Strip");
    this.moveAhead();
    for (let i = 0; i < 30; i++) {
      this.x += 0.1 - this.x / 6;
      yield;
    }
    yield* this.wait(1);
    this.stage.vars.titleClones++;
    this.createClone();
    while (!(this.keyPressed("any") || this.mouse.down)) {
      yield;
    }
    for (let i = 0; i < 30; i++) {
      this.y += 15 - this.y / 6;
      yield;
    }
  }

  *whenIReceiveNextLevel() {
    this.visible = false;
    this.deleteThisClone();
  }

  *whenGreenFlagClicked2() {
    this.stage.vars.level = 0;
    while (!(this.toNumber(this.stage.vars.level) === 1)) {
      if (!(this.costumeNumber === 4)) {
        this.size += (100 - this.size) / 6;
      }
      this.y +=
        Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 3;
      if (!(this.costumeNumber === 4 || this.costumeNumber === 5)) {
        this.direction =
          90 + Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 3;
      }
      yield;
    }
  }

  *startAsClone() {
    if (this.toNumber(this.stage.vars.titleClones) === 1) {
      this.costume = "Title 2";
      this.moveBehind();
      this.effects.brightness = 100;
      this.size = 100;
      this.visible = true;
      for (let i = 0; i < 30; i++) {
        this.x += 0.1 - this.x / 6;
        yield;
      }
      yield* this.wait(1);
      while (!(this.keyPressed("any") || this.mouse.down)) {
        yield;
      }
      for (let i = 0; i < 30; i++) {
        this.y += 15 - this.y / 6;
        yield;
      }
    } else {
      if (this.toNumber(this.stage.vars.titleClones) === 2) {
        this.goto(0, -80);
        this.direction = 90;
        this.costume = "Anything To Start";
        this.visible = true;
        while (!(this.keyPressed("any") || this.mouse.down)) {
          yield;
        }
        this.visible = false;
        this.costume = "Headphones Recommended";
        this.effects.ghost = 100;
        yield* this.wait(2);
        this.broadcast("SATA");
        if (
          this.toNumber(this.stage.vars.helpClones) === 0 &&
          this.toNumber(this.stage.vars.optionClones) === 0
        ) {
          this.goto(0, -160);
          this.visible = true;
          for (let i = 0; i < 3; i++) {
            this.effects.ghost -= 20;
            yield* this.wait(0.25);
            yield;
          }
        }
      }
    }
  }

  *startAsClone2() {
    if (this.toNumber(this.stage.vars.titleClones) === 1) {
      while (!(this.toNumber(this.stage.vars.level) === 1)) {
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 3;
        this.direction =
          90 + Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 3;
        yield;
      }
    } else {
      if (this.toNumber(this.stage.vars.titleClones) === 2) {
        while (!(this.costumeNumber === 5)) {
          yield* this.wait(1);
          this.visible = false;
          yield* this.wait(0.5);
          this.visible = true;
          yield;
        }
      }
    }
  }

  *whenIReceiveHelp() {
    if (
      this.costumeNumber === 2 ||
      this.costumeNumber === 3 ||
      this.costumeNumber === 5
    ) {
      this.visible = false;
      if (this.toNumber(this.stage.vars.level) === 0) {
        while (!(this.toNumber(this.stage.vars.helpClones) === 4)) {
          yield;
        }
        while (!(this.toNumber(this.stage.vars.helpClones) === 0)) {
          yield;
        }
        this.size = 0;
        this.broadcast("Glow Strip");
        this.visible = true;
        if (this.costumeNumber === 5) {
          this.effects.ghost = 40;
          this.goto(0, -160);
        }
        while (!(this.size === 100)) {
          this.size += (100 - this.size) / 4;
          yield;
        }
      }
    }
  }

  *whenIReceiveOptions() {
    if (
      this.costumeNumber === 2 ||
      this.costumeNumber === 3 ||
      this.costumeNumber === 5
    ) {
      this.visible = false;
      while (!(this.toNumber(this.stage.vars.optionClones) === 10)) {
        yield;
      }
      while (!(this.toNumber(this.stage.vars.optionClones) === 0)) {
        yield;
      }
      this.size = 0;
      this.broadcast("Glow Strip");
      this.visible = true;
      if (this.costumeNumber === 5) {
        this.effects.ghost = 40;
        this.goto(0, -160);
      }
      while (!(this.size === 100)) {
        this.size += (100 - this.size) / 4;
        yield;
      }
    }
  }
}
