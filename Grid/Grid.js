/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Grid extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Grid", "./Grid/costumes/Grid.png", { x: 370, y: 202 }),
      new Costume("Backlight", "./Grid/costumes/Backlight.png", {
        x: 480,
        y: 72,
      }),
      new Costume("Backlight 2", "./Grid/costumes/Backlight 2.png", {
        x: 480,
        y: 360,
      }),
      new Costume("Back Art", "./Grid/costumes/Back Art.png", {
        x: 480,
        y: 360,
      }),
      new Costume("Good Run", "./Grid/costumes/Good Run.png", {
        x: 480,
        y: 360,
      }),
      new Costume("End Break Line", "./Grid/costumes/End Break Line.png", {
        x: 480,
        y: 360,
      }),
    ];

    this.sounds = [
      new Sound(
        "swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890",
        "./Grid/sounds/swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.wav"
      ),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Glow Strip" },
        this.whenIReceiveGlowStrip
      ),
      new Trigger(Trigger.BROADCAST, { name: "Help" }, this.whenIReceiveHelp),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Options" },
        this.whenIReceiveOptions
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart" },
        this.whenIReceiveRestart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Return Game" },
        this.whenIReceiveReturnGame
      ),
      new Trigger(Trigger.BROADCAST, { name: "Pulse" }, this.whenIReceivePulse),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(
        Trigger.BROADCAST,
        { name: "End Screen" },
        this.whenIReceiveEndScreen
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.direction = 90;
    this.stage.vars.turn = 0;
    this.stage.vars.gridClones = 0;
    this.stage.vars.floating = "On";
    this.stage.vars.endLevel = 20;
    this.costume = "Grid";
    this.visible = false;
    this.effects.clear();
    while (true) {
      this.stage.vars.turn += 4;
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.stage.vars.mousePosition =
        this.toString(Math.round(this.mouse.x / 28)) +
        this.toString(Math.round(this.mouse.y / 28));
      if (Math.round(this.mouse.x / 28).length === 1) {
        this.stage.vars.mousePosition =
          "0" + this.toString(this.stage.vars.mousePosition);
      }
      if (Math.round(this.mouse.y / 28).length === 1) {
        this.stage.vars.mousePosition =
          this.letterOf(this.stage.vars.mousePosition, 0) +
          this.letterOf(this.stage.vars.mousePosition, 1) +
          ("0" + this.toString(Math.round(this.mouse.y / 28)));
      }
      yield;
    }
  }

  *whenIReceiveNextLevel() {
    this.goto(0, 0);
    if (this.costumeNumber === 1) {
      this.stage.vars.turn = 0;
      this.stage.vars.clone = 0;
      if (
        this.compare(
          this.stage.vars.level,
          this.toNumber(this.stage.vars.endLevel) + 1
        ) < 0
      ) {
        yield* this.startSound(
          "swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890"
        );
        this.visible = true;
        this.direction = 90;
        this.size = 0;
      } else {
        this.broadcast("End Screen");
        this.stage.vars.savedLevel = 0;
        this.stage.vars.savedScore = 0;
      }
      while (true) {
        this.size += (100 - this.size) / 4;
        if (this.toString(this.stage.vars.floating) === "On") {
          this.direction =
            90 +
            Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 1;
          this.y +=
            Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
        }
        yield;
      }
    }
  }

  *startAsClone() {
    this.effects.clear();
    this.visible = true;
    if (this.toNumber(this.stage.vars.gridClones) === 1) {
      this.costume = "Backlight";
      this.effects.brightness = 94;
      this.size = 70;
      for (let i = 0; i < 15; i++) {
        this.size += (130 - this.size) / 4;
        yield;
      }
    } else {
      if (this.toNumber(this.stage.vars.gridClones) === 2) {
        this.costume = "Backlight 2";
        this.effects.brightness = 100;
        this.moveBehind();
        this.moveAhead(3);
        this.size = 70;
        for (let i = 0; i < 15; i++) {
          this.size += (160 - this.size) / 4;
          yield;
        }
      } else {
        if (this.toNumber(this.stage.vars.gridClones) === 3) {
          this.costume = "Back Art";
          this.effects.ghost = 100;
          this.moveBehind();
          this.moveAhead(3);
          this.size = 200;
          for (let i = 0; i < 15; i++) {
            this.size += (108 - this.size) / 4;
            this.effects.ghost -= 6.67;
            yield;
          }
          this.size = 108;
        } else {
          if (this.toNumber(this.stage.vars.gridClones) === 4) {
            this.costume = "End Break Line";
            this.goto(0, 40);
            this.size = 0;
            for (let i = 0; i < 15; i++) {
              this.size += (100 - this.size) / 4;
              yield;
            }
          } else {
            null;
          }
        }
      }
    }
  }

  *startAsClone2() {
    while (!null) {
      if (!(this.costumeNumber === 6)) {
        this.direction =
          90 + Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 1;
      }
      this.y +=
        Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
      yield;
    }
  }

  *whenIReceiveGlowStrip() {
    for (let i = 0; i < 3; i++) {
      this.stage.vars.gridClones++;
      this.createClone();
      yield;
    }
  }

  *whenIReceiveHelp() {
    this.visible = false;
    if (this.toNumber(this.stage.vars.level) === 0) {
      this.stage.vars.gridClones = 0;
      this.deleteThisClone();
    }
  }

  *whenIReceiveOptions() {
    if (
      this.costumeNumber === 2 ||
      this.costumeNumber === 3 ||
      this.costumeNumber === 4
    ) {
      this.visible = false;
      this.stage.vars.gridClones = 0;
      this.deleteThisClone();
    }
  }

  *whenIReceiveRestart() {
    yield* this.startSound(
      "swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890"
    );
    this.goto(0, 0);
    if (this.costumeNumber === 1) {
      this.size = 100;
    } else {
      if (this.costumeNumber === 2) {
        this.size = 130;
      } else {
        if (this.costumeNumber === 3) {
          this.size = 160;
        } else {
          if (this.costumeNumber === 4) {
            this.size = 108;
          } else {
            null;
          }
        }
      }
    }
  }

  *whenIReceiveReturnGame() {
    this.visible = true;
    if (this.costumeNumber === 1) {
      this.size = 0;
    } else {
      if (this.costumeNumber === 4) {
        this.effects.ghost = 100;
        this.size = 200;
        for (let i = 0; i < 15; i++) {
          this.size += (108 - this.size) / 4;
          this.effects.ghost -= 6.67;
          yield;
        }
        this.size = 108;
      } else {
        this.size = 70;
        if (this.costumeNumber === 2) {
          for (let i = 0; i < 15; i++) {
            this.size += (130 - this.size) / 4;
            yield;
          }
        } else {
          if (this.costumeNumber === 3) {
            for (let i = 0; i < 15; i++) {
              this.size += (160 - this.size) / 4;
              yield;
            }
          } else {
            null;
          }
        }
      }
    }
  }

  *whenIReceivePulse() {
    if (this.costumeNumber === 1) {
      this.size = 103;
    }
  }

  *whenIReceiveStart() {
    this.stage.vars.playing = "Yes";
    if (this.costumeNumber === 1) {
      while (true) {
        if (this.size === 100) {
          this.size = 100;
        }
        yield;
      }
    }
  }

  *whenIReceiveEndScreen() {
    if (this.costumeNumber === 1) {
      this.costume = "Good Run";
      this.stage.vars.gridClones++;
      this.goto(0, 70);
      this.createClone();
    } else {
      if (this.costumeNumber === 2 || this.costumeNumber === 3) {
        this.visible = false;
      }
    }
    yield* this.wait(0.5);
    this.stage.vars.playing = "No";
  }
}
