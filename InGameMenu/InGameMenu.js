/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class InGameMenu extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Score", "./InGameMenu/costumes/Score.png", {
        x: 150,
        y: 150,
      }),
      new Costume("Help Shortcut", "./InGameMenu/costumes/Help Shortcut.png", {
        x: 60,
        y: 60,
      }),
      new Costume(
        "Help Shortcut 2",
        "./InGameMenu/costumes/Help Shortcut 2.png",
        { x: 60, y: 60 }
      ),
      new Costume(
        "Help Shortcut 3",
        "./InGameMenu/costumes/Help Shortcut 3.png",
        { x: 60, y: 60 }
      ),
      new Costume("Break Line", "./InGameMenu/costumes/Break Line.png", {
        x: 80,
        y: 80,
      }),
      new Costume("Play", "./InGameMenu/costumes/Play.png", { x: 60, y: 60 }),
      new Costume("Play 2", "./InGameMenu/costumes/Play 2.png", {
        x: 60,
        y: 60,
      }),
      new Costume("Play 3", "./InGameMenu/costumes/Play 3.png", {
        x: 60,
        y: 60,
      }),
      new Costume("Hint", "./InGameMenu/costumes/Hint.png", { x: 100, y: 50 }),
      new Costume("Hint 2", "./InGameMenu/costumes/Hint 2.png", {
        x: 100,
        y: 50,
      }),
      new Costume("Hint 3", "./InGameMenu/costumes/Hint 3.png", {
        x: 100,
        y: 50,
      }),
      new Costume("Redo", "./InGameMenu/costumes/Redo.png", { x: 100, y: 100 }),
      new Costume("Redo 2", "./InGameMenu/costumes/Redo 2.png", {
        x: 100,
        y: 100,
      }),
      new Costume("Redo 3", "./InGameMenu/costumes/Redo 3.png", {
        x: 100,
        y: 100,
      }),
    ];

    this.sounds = [
      new Sound(
        "mouse-click-117076",
        "./InGameMenu/sounds/mouse-click-117076.wav"
      ),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.BROADCAST, { name: "Help" }, this.whenIReceiveHelp),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.BROADCAST, { name: "Run" }, this.whenIReceiveRun),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Return Game" },
        this.whenIReceiveReturnGame
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart" },
        this.whenIReceiveRestart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "End Screen" },
        this.whenIReceiveEndScreen
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(86, -140);
    this.costume = "Score";
    this.size = 100;
    this.stage.vars.inGameClones = 0;
    this.stage.vars.showHelp = "No";
    this.stage.vars.playEnabled = "No";
    this.stage.vars.helpEnabled = "No";
    this.stage.vars.redoEnabled = "No";
    this.stage.vars.hintEnabled = "No";
    this.visible = false;
  }

  *whenIReceiveStart() {
    if (
      this.toNumber(this.stage.vars.level) === 1 &&
      this.toNumber(this.stage.vars.line) === 0 &&
      this.costumeNumber === 1
    ) {
      for (let i = 0; i < 2; i++) {
        this.stage.vars.inGameClones++;
        this.createClone();
        yield;
      }
      while (
        !(
          this.toNumber(this.stage.vars.line) === 3 ||
          this.toString(this.stage.vars.skipped) === "Yes"
        )
      ) {
        yield;
      }
      for (let i = 0; i < 3; i++) {
        this.stage.vars.inGameClones++;
        this.createClone();
        yield;
      }
      while (
        !(
          this.toNumber(this.stage.vars.level) === 2 &&
          this.compare(
            this.stage.vars.clone,
            this.stage.vars.positions.length
          ) === 0
        )
      ) {
        yield;
      }
      this.stage.vars.inGameClones++;
      this.createClone();
    } else {
      if (
        this.compare(this.stage.vars.level, this.stage.vars.savedLevel) === 0
      ) {
        for (let i = 0; i < 6; i++) {
          this.stage.vars.inGameClones++;
          this.createClone();
          yield;
        }
      }
    }
  }

  *startAsClone() {
    this.effects.clear();
    this.size = 0;
    this.visible = true;
    if (this.toNumber(this.stage.vars.inGameClones) === 1) {
      this.costume = "Score";
      this.goto(86, -140);
    } else {
      if (this.toNumber(this.stage.vars.inGameClones) === 2) {
        this.effects.brightness = 100;
        this.costume = "Break Line";
        this.goto(34, -140);
      } else {
        if (this.toNumber(this.stage.vars.inGameClones) === 3) {
          this.effects.brightness = 100;
          this.costume = "Break Line";
          this.goto(-84, -140);
        } else {
          if (this.toNumber(this.stage.vars.inGameClones) === 4) {
            this.stage.vars.showHelp = "Yes";
            this.goto(0, -140);
          } else {
            if (this.toNumber(this.stage.vars.inGameClones) === 5) {
              this.goto(-50, -140);
              while (true) {
                if (
                  this.toString(this.stage.vars.ready) === "Yes" &&
                  this.toString(this.stage.vars.running) === "No"
                ) {
                  this.costume = "Play";
                } else {
                  null;
                }
                yield;
              }
            } else {
              if (this.toNumber(this.stage.vars.inGameClones) === 6) {
                this.costume = "Hint";
                this.goto(-118, -140);
              } else {
                null;
              }
            }
          }
        }
      }
    }
  }

  *startAsClone2() {
    if (this.toNumber(this.stage.vars.inGameClones) === 1) {
      null;
    } else {
      if (
        this.toNumber(this.stage.vars.inGameClones) === 2 ||
        this.toNumber(this.stage.vars.inGameClones) === 3
      ) {
        null;
      } else {
        if (this.toNumber(this.stage.vars.inGameClones) === 4) {
          while (true) {
            if (this.toString(this.stage.vars.helpEnabled) === "Yes") {
              if (
                this.compare(this.mouse.x, this.x - 25) > 0 &&
                this.compare(this.mouse.x, this.x + 25) < 0 &&
                this.compare(this.mouse.y, this.y - 15) > 0 &&
                this.compare(this.mouse.y, this.y + 15) < 0
              ) {
                this.costume = "Help Shortcut 2";
                if (
                  this.mouse.down &&
                  this.toString(this.stage.vars.helpEnabled) === "Yes"
                ) {
                  yield* this.startSound("mouse-click-117076");
                  this.broadcast("Help");
                  while (!(this.toNumber(this.stage.vars.helpClones) === 3)) {
                    yield;
                  }
                  while (!(this.toNumber(this.stage.vars.helpClones) === 0)) {
                    yield;
                  }
                  this.stage.vars.ready = "No";
                }
              } else {
                this.costume = "Help Shortcut";
              }
            } else {
              this.costume = "Help Shortcut 3";
            }
            yield;
          }
        } else {
          if (this.toNumber(this.stage.vars.inGameClones) === 5) {
            while (true) {
              if (this.toString(this.stage.vars.playEnabled) === "Yes") {
                if (
                  this.compare(this.mouse.x, this.x - 25) > 0 &&
                  this.compare(this.mouse.x, this.x + 25) < 0 &&
                  this.compare(this.mouse.y, this.y - 15) > 0 &&
                  this.compare(this.mouse.y, this.y + 15) < 0
                ) {
                  this.costume = "Play 2";
                  if (
                    this.mouse.down &&
                    this.toString(this.stage.vars.playEnabled) === "Yes"
                  ) {
                    while (!(this.toNumber(this.stage.vars.helpClones) === 0)) {
                      yield;
                    }
                    this.broadcast("Run");
                  }
                } else {
                  this.costume = "Play";
                }
              } else {
                if (this.compare(this.stage.vars.playTime, 40) < 0) {
                  this.costume = "Play 3";
                } else {
                  this.stage.vars.redoEnabled = "Yes";
                  if (this.toString(this.stage.vars.redoEnabled) === "Yes") {
                    if (
                      this.compare(this.mouse.x, this.x - 25) > 0 &&
                      this.compare(this.mouse.x, this.x + 25) < 0 &&
                      this.compare(this.mouse.y, this.y - 15) > 0 &&
                      this.compare(this.mouse.y, this.y + 15) < 0
                    ) {
                      this.costume = "Redo 2";
                      if (this.mouse.down) {
                        this.broadcast("Restart Was Pressed");
                      }
                    } else {
                      this.costume = "Redo";
                    }
                  } else {
                    this.costume = "Redo 3";
                  }
                }
              }
              yield;
            }
          } else {
            if (this.toNumber(this.stage.vars.inGameClones) === 6) {
              while (true) {
                if (this.toString(this.stage.vars.hintEnabled) === "Yes") {
                  if (
                    this.compare(this.mouse.x, this.x - 20) > 0 &&
                    this.compare(this.mouse.x, this.x + 20) < 0 &&
                    this.compare(this.mouse.y, this.y - 20) > 0 &&
                    this.compare(this.mouse.y, this.y + 20) < 0
                  ) {
                    this.costume = "Hint 2";
                    if (
                      this.mouse.down &&
                      this.toString(this.stage.vars.hintEnabled) === "Yes" &&
                      this.compare(this.stage.vars.level, 1) > 0
                    ) {
                      while (
                        !(this.toNumber(this.stage.vars.helpClones) === 0)
                      ) {
                        yield;
                      }
                      this.broadcast("Hint");
                    }
                  } else {
                    this.costume = "Hint";
                  }
                } else {
                  this.costume = "Hint 3";
                }
                yield;
              }
            } else {
              null;
            }
          }
        }
      }
    }
  }

  *whenIReceiveHelp() {
    this.visible = false;
    this.stage.vars.showHelp = "No";
    this.stage.vars.helpEnabled = "No";
    this.stage.vars.playEnabled = "No";
    this.stage.vars.hintEnabled = "No";
    this.stage.vars.redoEnabled = "No";
  }

  *whenIReceiveNextLevel() {
    this.size = 0;
    if (
      this.costumeNumber === 2 ||
      this.costumeNumber === 3 ||
      this.costumeNumber === 4
    ) {
      this.costume = "Help Shortcut 3";
      this.stage.vars.showHelp = "No";
      while (
        !(
          (this.compare(this.stage.vars.line, 2) > 0 ||
            this.toString(this.stage.vars.skipped) === "Yes") &&
          this.compare(
            this.stage.vars.clone,
            this.stage.vars.positions.length
          ) === 0
        )
      ) {
        yield;
      }
      yield* this.wait(0.5);
      if (this.toString(this.stage.vars.running) === "No") {
        this.stage.vars.showHelp = "Yes";
        this.costume = "Help Shortcut";
        this.goto(0, -140);
      }
    } else {
      if (
        this.costumeNumber === 6 ||
        this.costumeNumber === 7 ||
        this.costumeNumber === 8
      ) {
        this.costume = "Play 3";
        while (
          !(
            (this.compare(this.stage.vars.line, 2) > 0 ||
              this.toString(this.stage.vars.skipped) === "Yes") &&
            this.compare(
              this.stage.vars.clone,
              this.stage.vars.positions.length
            ) === 0
          )
        ) {
          yield;
        }
        yield* this.wait(0.5);
        if (this.toString(this.stage.vars.running) === "No") {
          this.costume = "Play";
          this.goto(-50, -140);
        }
      } else {
        if (
          this.costumeNumber === 9 ||
          this.costumeNumber === 10 ||
          this.costumeNumber === 11
        ) {
          this.costume = "Hint 3";
          while (
            !(
              (this.compare(this.stage.vars.line, 2) > 0 ||
                this.toString(this.stage.vars.skipped) === "Yes") &&
              this.compare(
                this.stage.vars.clone,
                this.stage.vars.positions.length
              ) === 0
            )
          ) {
            yield;
          }
          yield* this.wait(0.5);
          if (this.toString(this.stage.vars.running) === "No") {
            this.costume = "Hint";
            this.goto(-118, -140);
          }
        } else {
          null;
        }
      }
    }
  }

  *whenIReceiveRun() {
    this.stage.vars.helpEnabled = "No";
    this.stage.vars.playEnabled = "No";
    this.stage.vars.hintEnabled = "No";
  }

  *whenIReceiveReturnGame() {
    this.visible = true;
    this.size = 0;
    yield* this.wait(0.01);
    if (
      !(
        this.toNumber(this.stage.vars.line) === 4 ||
        this.toNumber(this.stage.vars.line) === 5
      ) ||
      this.toString(this.stage.vars.skipped) === "Yes"
    ) {
      this.stage.vars.showHelp = "Yes";
    }
    if (this.toString(this.stage.vars.runLine) === "No") {
      this.stage.vars.helpEnabled = "Yes";
      this.stage.vars.playEnabled = "Yes";
      if (this.toString(this.stage.vars.hint) === "No") {
        this.stage.vars.hintEnabled = "Yes";
      }
    } else {
      if (
        (this.toString(this.stage.vars.runLine) === "Yes" &&
          (this.toNumber(this.stage.vars.line) === 3 ||
            this.toNumber(this.stage.vars.line) === 4 ||
            this.toNumber(this.stage.vars.line) === 5)) ||
        this.toString(this.stage.vars.skipped) === "Yes"
      ) {
        this.stage.vars.helpEnabled = "Yes";
        this.stage.vars.playEnabled = "Yes";
        if (this.toString(this.stage.vars.hint) === "No") {
          this.stage.vars.hintEnabled = "Yes";
        }
      }
    }
  }

  *startAsClone3() {
    while (true) {
      this.size += (100 - this.size) / 4;
      yield;
    }
  }

  *whenIReceiveRestart() {
    this.stage.vars.helpEnabled = "No";
    this.stage.vars.playEnabled = "No";
    this.stage.vars.hintEnabled = "No";
    this.visible = true;
    this.size = 0;
    while (!(this.size === 100)) {
      yield;
    }
    this.stage.vars.helpEnabled = "Yes";
    this.stage.vars.playEnabled = "Yes";
    this.stage.vars.hintEnabled = "Yes";
  }

  *whenIReceiveNextLevel2() {
    this.visible = true;
    this.size = 0;
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
    if (
      this.compare(this.stage.vars.line, 4) > 0 ||
      this.toString(this.stage.vars.skipped) === "Yes"
    ) {
      this.stage.vars.helpEnabled = "Yes";
      this.stage.vars.playEnabled = "Yes";
      this.stage.vars.hintEnabled = "Yes";
    }
  }

  *whenIReceiveEndScreen() {
    this.stage.vars.helpEnabled = "No";
    this.stage.vars.playEnabled = "No";
    this.stage.vars.hintEnabled = "No";
    this.stage.vars.redoEnabled = "No";
    if (!(this.costumeNumber === 1)) {
      this.visible = false;
    } else {
      this.size = 0;
      this.y += 110;
      this.x -= 200;
    }
  }
}
