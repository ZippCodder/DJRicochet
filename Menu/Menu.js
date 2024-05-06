/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Menu extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Play", "./Menu/costumes/Play.png", { x: 110, y: 50 }),
      new Costume("Play 2", "./Menu/costumes/Play 2.png", { x: 110, y: 50 }),
      new Costume("Options", "./Menu/costumes/Options.png", { x: 460, y: 80 }),
      new Costume("Options 2", "./Menu/costumes/Options 2.png", {
        x: 460,
        y: 80,
      }),
      new Costume("Help", "./Menu/costumes/Help.png", { x: 460, y: 80 }),
      new Costume("Help 2", "./Menu/costumes/Help 2.png", { x: 460, y: 80 }),
      new Costume("Resume", "./Menu/costumes/Resume.png", { x: 180, y: 80 }),
      new Costume("Resume 2", "./Menu/costumes/Resume 2.png", {
        x: 180,
        y: 80,
      }),
    ];

    this.sounds = [
      new Sound("mouse-click-117076", "./Menu/sounds/mouse-click-117076.wav"),
      new Sound(
        "whoosh-blow-flutter-shortwav-14678",
        "./Menu/sounds/whoosh-blow-flutter-shortwav-14678.wav"
      ),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.BROADCAST, { name: "Click" }, this.whenIReceiveClick),
      new Trigger(Trigger.BROADCAST, { name: "Help" }, this.whenIReceiveHelp),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Options" },
        this.whenIReceiveOptions
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.menuClones = 0;
    this.goto(-20, -65);
    this.size = 100;
    this.moveAhead();
    this.costume = "Play";
    while (!null) {
      this.x = Math.floor(this.mouse.x / -20) - 4;
      this.y = this.mouse.y / -80 - 50;
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (!(this.toNumber(this.stage.vars.titleClones) === 2)) {
      yield;
    }
    while (!(this.keyPressed("any") || this.mouse.down)) {
      yield;
    }
    yield* this.wait(1.2);
    this.size = 25;
    yield* this.startSound("whoosh-blow-flutter-shortwav-14678");
    for (let i = 0; i < 3; i++) {
      this.stage.vars.menuClones++;
      this.createClone();
      yield;
    }
    this.visible = true;
    while (!(this.size === 100)) {
      this.size += (100 - this.size) / 2;
      yield;
    }
    while (!(this.compare(this.stage.vars.level, 0) > 0)) {
      if (
        this.compare(this.mouse.x, this.x - 50) > 0 &&
        this.compare(this.mouse.x, this.x + 80) < 0 &&
        this.compare(this.mouse.y, this.y - 20) > 0 &&
        this.compare(this.mouse.y, this.y + 20) < 0
      ) {
        this.costume = "Play 2";
        if (this.mouse.down) {
          if (
            this.toNumber(this.stage.vars.optionClones) === 0 &&
            this.toNumber(this.stage.vars.helpClones) === 0
          ) {
            this.visible = false;
            this.stage.vars.level++;
            this.stage.vars.levelScore = 0;
            this.broadcast("Next Level");
            this.broadcast("Start");
            this.stage.vars.timeBonus = 200;
          }
        }
      } else {
        this.costume = "Play";
      }
      yield;
    }
  }

  *startAsClone() {
    this.moveAhead();
    if (this.toNumber(this.stage.vars.menuClones) === 1) {
      this.costume = "Options";
      this.size = 25;
      this.visible = true;
      while (!(this.size === 100)) {
        this.size += (100 - this.size) / 2;
        yield;
      }
      while (!(this.compare(this.stage.vars.level, 0) > 0)) {
        if (
          this.compare(this.mouse.x, this.x - 50) > 0 &&
          this.compare(this.mouse.x, this.x + 60) < 0 &&
          this.compare(this.mouse.y, this.y - 20) > 0 &&
          this.compare(this.mouse.y, this.y + 20) < 0
        ) {
          this.costume = "Options 2";
          if (this.mouse.down) {
            if (this.toNumber(this.stage.vars.helpClones) === 0) {
              yield* this.startSound("mouse-click-117076");
              this.broadcast("Options");
              while (!(this.toNumber(this.stage.vars.optionClones) === 10)) {
                yield;
              }
              while (!(this.toNumber(this.stage.vars.optionClones) === 0)) {
                yield;
              }
            }
          }
        } else {
          this.costume = "Options";
        }
        yield;
      }
    } else {
      if (this.toNumber(this.stage.vars.menuClones) === 2) {
        this.costume = "Help";
        this.size = 25;
        this.visible = true;
        while (!(this.size === 100)) {
          this.size += (100 - this.size) / 2;
          yield;
        }
        while (!(this.compare(this.stage.vars.level, 0) > 0)) {
          if (
            this.compare(this.mouse.x, this.x - 35) > 0 &&
            this.compare(this.mouse.x, this.x + 35) < 0 &&
            this.compare(this.mouse.y, this.y - 20) > 0 &&
            this.compare(this.mouse.y, this.y + 20) < 0
          ) {
            this.costume = "Help 2";
            if (this.mouse.down) {
              if (this.toNumber(this.stage.vars.optionClones) === 0) {
                yield* this.startSound("mouse-click-117076");
                this.broadcast("Help");
                while (!(this.toNumber(this.stage.vars.helpClones) === 4)) {
                  yield;
                }
                while (!(this.toNumber(this.stage.vars.helpClones) === 0)) {
                  yield;
                }
              }
            }
          } else {
            this.costume = "Help";
          }
          yield;
        }
      } else {
        if (this.toNumber(this.stage.vars.menuClones) === 3) {
          this.costume = "Resume";
          this.size = 25;
          if (this.compare(this.stage.vars.savedLevel, 1) > 0) {
            this.visible = true;
            while (!(this.size === 100)) {
              this.size += (100 - this.size) / 2;
              yield;
            }
            while (!(this.compare(this.stage.vars.level, 0) > 0)) {
              if (
                this.compare(this.mouse.x, this.x - 60) > 0 &&
                this.compare(this.mouse.x, this.x + 60) < 0 &&
                this.compare(this.mouse.y, this.y - 15) > 0 &&
                this.compare(this.mouse.y, this.y + 15) < 0
              ) {
                this.costume = "Resume 2";
                if (this.mouse.down) {
                  if (
                    this.toNumber(this.stage.vars.optionClones) === 0 &&
                    this.toNumber(this.stage.vars.helpClones) === 0
                  ) {
                    yield* this.startSound("mouse-click-117076");
                    this.stage.vars.level = this.stage.vars.savedLevel;
                    this.stage.vars.levelScore = 0;
                    this.broadcast("Next Level");
                    this.broadcast("Start");
                    this.broadcast("Resume");
                    this.stage.vars.timeBonus = 200;
                    this.stage.vars.skipped = "Yes";
                    this.broadcast("Skip");
                  }
                }
              } else {
                this.costume = "Resume";
              }
              yield;
            }
          }
        } else {
          null;
        }
      }
    }
  }

  *startAsClone2() {
    if (this.toNumber(this.stage.vars.menuClones) === 1) {
      while (!null) {
        this.x = Math.floor(this.mouse.x / -40) - 160;
        this.y = this.mouse.y / -100 - 65;
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.menuClones) === 2) {
      while (!null) {
        this.x = Math.floor(this.mouse.x / -40) + 180;
        this.y = this.mouse.y / -100 - 65;
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.menuClones) === 3) {
      while (!null) {
        this.x = Math.floor(this.mouse.x / -60) - -4;
        this.y = this.mouse.y / -40 - 110;
        yield;
      }
    }
  }

  *whenIReceiveNextLevel() {
    this.visible = false;
  }

  *whenIReceiveClick() {
    if (
      this.compare(this.stage.vars.level, 0) > 0 &&
      this.toNumber(this.stage.vars.line) === 0
    ) {
      yield* this.startSound("mouse-click-117076");
    }
  }

  *whenIReceiveHelp() {
    if (this.toNumber(this.stage.vars.level) === 0) {
      this.visible = false;
      while (!(this.toNumber(this.stage.vars.helpClones) === 4)) {
        yield;
      }
      while (!(this.toNumber(this.stage.vars.helpClones) === 0)) {
        yield;
      }
      this.size = 0;
      if (this.compare(this.costumeNumber, 6) > 0) {
        if (this.compare(this.stage.vars.savedLevel, 1) > 0) {
          this.visible = true;
        }
      } else {
        this.visible = true;
      }
      while (!(this.size === 100)) {
        this.size += (100 - this.size) / 2;
        yield;
      }
      this.broadcast("Main Menu");
    }
  }

  *whenIReceiveOptions() {
    this.visible = false;
    while (!(this.toNumber(this.stage.vars.optionClones) === 10)) {
      yield;
    }
    while (!(this.toNumber(this.stage.vars.optionClones) === 0)) {
      yield;
    }
    this.size = 0;
    if (this.compare(this.costumeNumber, 6) > 0) {
      if (this.compare(this.stage.vars.savedLevel, 1) > 0) {
        this.visible = true;
      }
    } else {
      this.visible = true;
    }
    while (!(this.size === 100)) {
      this.size += (100 - this.size) / 2;
      yield;
    }
    this.broadcast("Main Menu");
  }
}
