/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Hints extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Hint 1", "./Hints/costumes/Hint 1.png", { x: 480, y: 360 }),
      new Costume("Hint 2", "./Hints/costumes/Hint 2.png", { x: 480, y: 360 }),
      new Costume("Hint 3", "./Hints/costumes/Hint 3.png", { x: 480, y: 360 }),
      new Costume("Hint 4", "./Hints/costumes/Hint 4.png", { x: 480, y: 360 }),
      new Costume("Hint 5", "./Hints/costumes/Hint 5.png", { x: 480, y: 360 }),
      new Costume("Hint 6", "./Hints/costumes/Hint 6.png", { x: 480, y: 360 }),
      new Costume("Hint 7", "./Hints/costumes/Hint 7.png", { x: 480, y: 360 }),
      new Costume("Hint 8", "./Hints/costumes/Hint 8.png", { x: 480, y: 360 }),
      new Costume("Hint 9", "./Hints/costumes/Hint 9.png", { x: 480, y: 360 }),
      new Costume("Hint 10", "./Hints/costumes/Hint 10.png", {
        x: 480,
        y: 360,
      }),
      new Costume("Hint 11", "./Hints/costumes/Hint 11.png", {
        x: 460,
        y: 320,
      }),
      new Costume("Hint 12", "./Hints/costumes/Hint 12.png", {
        x: 460,
        y: 320,
      }),
      new Costume("Hint 13", "./Hints/costumes/Hint 13.png", {
        x: 460,
        y: 320,
      }),
      new Costume("Hint 14", "./Hints/costumes/Hint 14.png", {
        x: 460,
        y: 320,
      }),
      new Costume("Hint 15", "./Hints/costumes/Hint 15.png", {
        x: 460,
        y: 320,
      }),
      new Costume("Hint 16", "./Hints/costumes/Hint 16.png", {
        x: 460,
        y: 320,
      }),
      new Costume("Hint 17", "./Hints/costumes/Hint 17.png", {
        x: 460,
        y: 320,
      }),
      new Costume("Hint 18", "./Hints/costumes/Hint 18.png", {
        x: 460,
        y: 320,
      }),
      new Costume("Hint 19", "./Hints/costumes/Hint 19.png", {
        x: 460,
        y: 320,
      }),
    ];

    this.sounds = [
      new Sound(
        "click-button-140881",
        "./Hints/sounds/click-button-140881.wav"
      ),
      new Sound(
        "punchy-taps-ui-4-183899",
        "./Hints/sounds/punchy-taps-ui-4-183899.wav"
      ),
      new Sound(
        "whoosh-blow-flutter-shortwav-14678",
        "./Hints/sounds/whoosh-blow-flutter-shortwav-14678.wav"
      ),
      new Sound("ding-67618", "./Hints/sounds/ding-67618.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.BROADCAST, { name: "Hint" }, this.whenIReceiveHint),
      new Trigger(Trigger.BROADCAST, { name: "Help" }, this.whenIReceiveHelp),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart" },
        this.whenIReceiveRestart
      ),
      new Trigger(Trigger.BROADCAST, { name: "Run" }, this.whenIReceiveRun),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Return Game" },
        this.whenIReceiveReturnGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Return Game" },
        this.whenIReceiveReturnGame2
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.hintUsed = 0;
    this.stage.vars.hint = "No";
    this.visible = false;
    this.costume = "Hint 1";
    while (true) {
      this.costume =
        "Hint " + this.toString(this.toNumber(this.stage.vars.level) - 1);
      yield;
    }
  }

  *whenIReceiveNextLevel() {
    this.stage.vars.hintUsed = 0;
    this.visible = false;
    if (this.toNumber(this.stage.vars.level) === 2) {
      this.goto(-28, 14);
    }
    if (this.toNumber(this.stage.vars.level) === 3) {
      this.goto(0, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 4) {
      this.goto(-14, -14);
    }
    if (this.toNumber(this.stage.vars.level) === 5) {
      this.goto(14, 14);
    }
    if (this.toNumber(this.stage.vars.level) === 6) {
      this.goto(-14, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 7) {
      this.goto(-14, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 8) {
      this.goto(-14, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 9) {
      this.goto(14, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 10) {
      this.goto(0, -14);
    }
    if (this.toNumber(this.stage.vars.level) === 11) {
      this.goto(14, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 12) {
      this.goto(0, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 13) {
      this.goto(0, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 14) {
      this.goto(0, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 15) {
      this.goto(14, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 16) {
      this.goto(0, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 17) {
      this.goto(-28, -14);
    }
    if (this.toNumber(this.stage.vars.level) === 18) {
      this.goto(0, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 19) {
      this.goto(0, 0);
    }
    if (this.toNumber(this.stage.vars.level) === 20) {
      this.goto(-14, 0);
    }
  }

  *whenIReceiveHint() {
    this.stage.vars.hintUsed++;
    this.stage.vars.hintEnabled = "No";
    this.stage.vars.hint = "Yes";
    this.size = 150;
    this.visible = true;
    yield* this.startSound("click-button-140881");
    yield* this.startSound("ding-67618");
    this.effects.ghost = 100;
    this.direction = 80;
    for (let i = 0; i < 10; i++) {
      this.size += (100 - this.size) / 2;
      this.effects.ghost -= 18;
      this.direction += 1;
      yield;
    }
    this.size = 100;
    this.effects.ghost = 0;
  }

  *whenIReceiveHelp() {
    this.visible = false;
  }

  *whenIReceiveRestart() {
    this.stage.vars.hint = "No";
    this.visible = false;
  }

  *whenIReceiveRun() {
    for (let i = 0; i < 10; i++) {
      this.size += (130 - this.size) / 3;
      this.effects.ghost += 18;
      yield;
    }
    this.visible = false;
    this.effects.clear();
    this.stage.vars.hint = "No";
  }

  *whenIReceiveReturnGame() {
    if (this.toString(this.stage.vars.hint) === "Yes") {
      yield* this.wait(0.4);
      this.visible = true;
      this.size = 130;
      this.effects.ghost = 100;
      for (let i = 0; i < 10; i++) {
        this.size += (100 - this.size) / 3;
        this.effects.ghost -= 18;
        yield;
      }
      this.size = 100;
    }
  }

  *whenIReceiveReturnGame2() {
    yield* this.wait(0.4);
    yield* this.startSound("whoosh-blow-flutter-shortwav-14678");
  }
}
