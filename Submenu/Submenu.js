/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Submenu extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Controls", "./Submenu/costumes/Controls.png", {
        x: 460,
        y: 160,
      }),
      new Costume("Break Line", "./Submenu/costumes/Break Line.png", {
        x: 460,
        y: 80,
      }),
      new Costume("Functions", "./Submenu/costumes/Functions.png", {
        x: 460,
        y: 160,
      }),
      new Costume("Close", "./Submenu/costumes/Close.png", { x: 55, y: 55 }),
      new Costume("Settings", "./Submenu/costumes/Settings.png", {
        x: 460,
        y: 160,
      }),
      new Costume("On", "./Submenu/costumes/On.png", { x: 100, y: 100 }),
      new Costume("Off", "./Submenu/costumes/Off.png", { x: 100, y: 100 }),
      new Costume("Trail 1", "./Submenu/costumes/Trail 1.png", {
        x: 100,
        y: 100,
      }),
      new Costume("Trail 2", "./Submenu/costumes/Trail 2.png", {
        x: 100,
        y: 100,
      }),
      new Costume("Credits", "./Submenu/costumes/Credits.png", {
        x: 460,
        y: 160,
      }),
      new Costume("Info", "./Submenu/costumes/Info.png", { x: 100, y: 100 }),
      new Costume("Info 2", "./Submenu/costumes/Info 2.png", {
        x: 100,
        y: 100,
      }),
    ];

    this.sounds = [
      new Sound(
        "050484501-menu-select-15",
        "./Submenu/sounds/050484501-menu-select-15.wav"
      ),
      new Sound("stop-13692", "./Submenu/sounds/stop-13692.wav"),
      new Sound(
        "zapsplat_multimedia_button_click_004_78081",
        "./Submenu/sounds/zapsplat_multimedia_button_click_004_78081.wav"
      ),
      new Sound(
        "menu-select-sound-2",
        "./Submenu/sounds/menu-select-sound-2.wav"
      ),
      new Sound(
        "menu-select-sound-100466",
        "./Submenu/sounds/menu-select-sound-100466.wav"
      ),
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Help" }, this.whenIReceiveHelp),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.BROADCAST, { name: "Close" }, this.whenIReceiveClose),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Options" },
        this.whenIReceiveOptions
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Return Game" },
        this.whenIReceiveReturnGame
      ),
    ];
  }

  *whenIReceiveHelp() {
    for (let i = 0; i < 4; i++) {
      this.stage.vars.helpClones++;
      this.createClone();
      yield;
    }
    while (!(this.toNumber(this.stage.vars.helpClones) === 0)) {
      if (
        this.compare(this.mouse.x, -183) < 0 &&
        this.compare(this.mouse.x, -211) > 0 &&
        this.compare(this.mouse.y, -66) < 0 &&
        this.compare(this.mouse.y, -94) > 0
      ) {
        this.stage.vars.description = 1;
        this.broadcast("Description");
        while (
          !!(
            this.compare(this.mouse.x, -183) < 0 &&
            this.compare(this.mouse.x, -211) > 0 &&
            this.compare(this.mouse.y, -66) < 0 &&
            this.compare(this.mouse.y, -94) > 0
          )
        ) {
          yield;
        }
        this.broadcast("Hide Description");
      } else {
        if (
          this.compare(this.mouse.x, -183) < 0 &&
          this.compare(this.mouse.x, -211) > 0 &&
          this.compare(this.mouse.y, -99) < 0 &&
          this.compare(this.mouse.y, -127) > 0
        ) {
          this.stage.vars.description = 2;
          this.broadcast("Description");
          while (
            !!(
              this.compare(this.mouse.x, -183) < 0 &&
              this.compare(this.mouse.x, -211) > 0 &&
              this.compare(this.mouse.y, -99) < 0 &&
              this.compare(this.mouse.y, -127) > 0
            )
          ) {
            yield;
          }
          this.broadcast("Hide Description");
        } else {
          if (
            this.compare(this.mouse.x, -183) < 0 &&
            this.compare(this.mouse.x, -211) > 0 &&
            this.compare(this.mouse.y, -132) < 0 &&
            this.compare(this.mouse.y, -160) > 0
          ) {
            this.stage.vars.description = 3;
            this.broadcast("Description");
            while (
              !!(
                this.compare(this.mouse.x, -183) < 0 &&
                this.compare(this.mouse.x, -211) > 0 &&
                this.compare(this.mouse.y, -132) < 0 &&
                this.compare(this.mouse.y, -160) > 0
              )
            ) {
              yield;
            }
            this.broadcast("Hide Description");
          } else {
            if (
              this.compare(this.mouse.x, -51) < 0 &&
              this.compare(this.mouse.x, -79) > 0 &&
              this.compare(this.mouse.y, -66) < 0 &&
              this.compare(this.mouse.y, -94) > 0
            ) {
              this.stage.vars.description = 4;
              this.broadcast("Description");
              while (
                !!(
                  this.compare(this.mouse.x, -51) < 0 &&
                  this.compare(this.mouse.x, -79) > 0 &&
                  this.compare(this.mouse.y, -66) < 0 &&
                  this.compare(this.mouse.y, -94) > 0
                )
              ) {
                yield;
              }
              this.broadcast("Hide Description");
            } else {
              if (
                this.compare(this.mouse.x, -51) < 0 &&
                this.compare(this.mouse.x, -79) > 0 &&
                this.compare(this.mouse.y, -99) < 0 &&
                this.compare(this.mouse.y, -127) > 0
              ) {
                this.stage.vars.description = 5;
                this.broadcast("Description");
                while (
                  !!(
                    this.compare(this.mouse.x, -51) < 0 &&
                    this.compare(this.mouse.x, -79) > 0 &&
                    this.compare(this.mouse.y, -99) < 0 &&
                    this.compare(this.mouse.y, -127) > 0
                  )
                ) {
                  yield;
                }
                this.broadcast("Hide Description");
              } else {
                if (
                  this.compare(this.mouse.x, -51) < 0 &&
                  this.compare(this.mouse.x, -79) > 0 &&
                  this.compare(this.mouse.y, -132) < 0 &&
                  this.compare(this.mouse.y, -160) > 0
                ) {
                  this.stage.vars.description = 6;
                  this.broadcast("Description");
                  while (
                    !!(
                      this.compare(this.mouse.x, -51) < 0 &&
                      this.compare(this.mouse.x, -79) > 0 &&
                      this.compare(this.mouse.y, -132) < 0 &&
                      this.compare(this.mouse.y, -160) > 0
                    )
                  ) {
                    yield;
                  }
                  this.broadcast("Hide Description");
                } else {
                  if (
                    this.compare(this.mouse.x, 81) < 0 &&
                    this.compare(this.mouse.x, 53) > 0 &&
                    this.compare(this.mouse.y, -66) < 0 &&
                    this.compare(this.mouse.y, -94) > 0
                  ) {
                    this.stage.vars.description = 7;
                    this.broadcast("Description");
                    while (
                      !!(
                        this.compare(this.mouse.x, 81) < 0 &&
                        this.compare(this.mouse.x, 53) > 0 &&
                        this.compare(this.mouse.y, -66) < 0 &&
                        this.compare(this.mouse.y, -94) > 0
                      )
                    ) {
                      yield;
                    }
                    this.broadcast("Hide Description");
                  } else {
                    if (
                      this.compare(this.mouse.x, 81) < 0 &&
                      this.compare(this.mouse.x, 53) > 0 &&
                      this.compare(this.mouse.y, -99) < 0 &&
                      this.compare(this.mouse.y, -127) > 0
                    ) {
                      this.stage.vars.description = 8;
                      this.broadcast("Description");
                      while (
                        !!(
                          this.compare(this.mouse.x, 81) < 0 &&
                          this.compare(this.mouse.x, 53) > 0 &&
                          this.compare(this.mouse.y, -99) < 0 &&
                          this.compare(this.mouse.y, -127) > 0
                        )
                      ) {
                        yield;
                      }
                      this.broadcast("Hide Description");
                    } else {
                      if (
                        this.compare(this.mouse.x, 81) < 0 &&
                        this.compare(this.mouse.x, 53) > 0 &&
                        this.compare(this.mouse.y, -132) < 0 &&
                        this.compare(this.mouse.y, -160) > 0
                      ) {
                        this.stage.vars.description = 9;
                        this.broadcast("Description");
                        while (
                          !!(
                            this.compare(this.mouse.x, 81) < 0 &&
                            this.compare(this.mouse.x, 53) > 0 &&
                            this.compare(this.mouse.y, -132) < 0 &&
                            this.compare(this.mouse.y, -160) > 0
                          )
                        ) {
                          yield;
                        }
                        this.broadcast("Hide Description");
                      } else {
                        if (
                          this.compare(this.mouse.x, 213) < 0 &&
                          this.compare(this.mouse.x, 185) > 0 &&
                          this.compare(this.mouse.y, -66) < 0 &&
                          this.compare(this.mouse.y, -94) > 0
                        ) {
                          this.stage.vars.description = 10;
                          this.broadcast("Description");
                          while (
                            !!(
                              this.compare(this.mouse.x, 213) < 0 &&
                              this.compare(this.mouse.x, 185) > 0 &&
                              this.compare(this.mouse.y, -66) < 0 &&
                              this.compare(this.mouse.y, -94) > 0
                            )
                          ) {
                            yield;
                          }
                          this.broadcast("Hide Description");
                        } else {
                          if (
                            this.compare(this.mouse.x, 213) < 0 &&
                            this.compare(this.mouse.x, 185) > 0 &&
                            this.compare(this.mouse.y, -99) < 0 &&
                            this.compare(this.mouse.y, -127) > 0
                          ) {
                            this.stage.vars.description = 11;
                            this.broadcast("Description");
                            while (
                              !!(
                                this.compare(this.mouse.x, 213) < 0 &&
                                this.compare(this.mouse.x, 185) > 0 &&
                                this.compare(this.mouse.y, -99) < 0 &&
                                this.compare(this.mouse.y, -127) > 0
                              )
                            ) {
                              yield;
                            }
                            this.broadcast("Hide Description");
                          } else {
                            if (
                              this.compare(this.mouse.x, 213) < 0 &&
                              this.compare(this.mouse.x, 185) > 0 &&
                              this.compare(this.mouse.y, -132) < 0 &&
                              this.compare(this.mouse.y, -160) > 0
                            ) {
                              this.stage.vars.description = 12;
                              this.broadcast("Description");
                              while (
                                !!(
                                  this.compare(this.mouse.x, 213) < 0 &&
                                  this.compare(this.mouse.x, 185) > 0 &&
                                  this.compare(this.mouse.y, -132) < 0 &&
                                  this.compare(this.mouse.y, -160) > 0
                                )
                              ) {
                                yield;
                              }
                              this.broadcast("Hide Description");
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
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.stage.vars.helpClones = 0;
    this.stage.vars.optionClones = 0;
    this.visible = false;
    this.stage.watchers.musicAndSoundFx.visible = false;
    this.stage.watchers.art.visible = false;
    this.stage.watchers.coding.visible = false;
    this.stage.vars.credits = [];
    for (let i = 0; i < 3; i++) {
      this.stage.vars.credits.push("No");
      yield;
    }
  }

  *startAsClone() {
    this.moveAhead();
    this.visible = true;
    this.size = 0;
    if (this.toNumber(this.stage.vars.helpClones) === 1) {
      this.goto(0, 90);
      this.costume = "Controls";
      while (!null) {
        this.size += (100 - this.size) / 4;
        this.direction =
          90 + Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 1;
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.helpClones) === 2) {
      this.goto(0, -90);
      this.costume = "Functions";
      while (!null) {
        this.size += (100 - this.size) / 4;
        this.direction =
          90 + Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 1;
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.helpClones) === 3) {
      this.goto(0, 0);
      this.costume = "Break Line";
      this.effects.brightness = 100;
      while (!null) {
        this.size += (90 - this.size) / 4;
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
        yield;
      }
    }
    if (
      this.toNumber(this.stage.vars.helpClones) === 4 ||
      this.toNumber(this.stage.vars.optionClones) === 3
    ) {
      this.goto(218, 162);
      this.costume = "Close";
      while (!null) {
        this.size += (100 - this.size) / 4;
        if (this.compare(this.size, 90) > 0) {
          this.size = 100;
        }
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.optionClones) === 1) {
      this.goto(0, 90);
      this.costume = "Settings";
      while (!null) {
        this.size += (100 - this.size) / 4;
        this.direction =
          90 + Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 1;
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.optionClones) === 2) {
      this.goto(0, 0);
      this.costume = "Break Line";
      this.effects.brightness = 100;
      while (!null) {
        this.size += (90 - this.size) / 4;
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.optionClones) === 4) {
      this.goto(146, 100);
      this.costume = this.stage.vars.music;
      while (!null) {
        this.size += (100 - this.size) / 4;
        this.direction =
          90 + Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 1;
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.optionClones) === 5) {
      this.goto(146, 62);
      this.costume = "Trail " + this.toString(this.stage.vars.trailColor);
      while (!null) {
        this.size += (100 - this.size) / 4;
        this.direction =
          90 + Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 1;
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.optionClones) === 6) {
      this.goto(146, 24);
      this.costume = this.stage.vars.floating;
      while (!null) {
        this.size += (100 - this.size) / 4;
        this.direction =
          90 + Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 1;
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.optionClones) === 7) {
      this.goto(0, -90);
      this.costume = "Credits";
      while (!null) {
        this.size += (100 - this.size) / 4;
        this.direction =
          90 + Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 1;
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
        yield;
      }
    }
    if (this.compare(this.stage.vars.optionClones, 7) > 0) {
      this.costume = "Info";
      this.goto(
        150,
        -80 - 38 * (this.toNumber(this.stage.vars.optionClones) - 8)
      );
      while (!null) {
        this.size += (100 - this.size) / 4;
        this.direction =
          90 + Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 1;
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 6;
        yield;
      }
    }
  }

  *whenIReceiveNextLevel() {
    this.deleteThisClone();
  }

  *startAsClone2() {
    if (
      this.toNumber(this.stage.vars.helpClones) === 4 ||
      this.toNumber(this.stage.vars.optionClones) === 3
    ) {
      while (true) {
        if (
          this.mouse.down &&
          this.compare(this.mouse.x, 238) < 0 &&
          this.compare(this.mouse.x, 198) > 0 &&
          this.compare(this.mouse.y, 182) < 0 &&
          this.compare(this.mouse.y, 142) > 0
        ) {
          yield* this.startSound("050484501-menu-select-15");
          if (this.toNumber(this.stage.vars.level) === 0) {
            this.broadcast("Close");
          } else {
            this.broadcast("Return Game");
          }
        }
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.optionClones) === 4) {
      while (!(this.toNumber(this.stage.vars.optionClones) === 0)) {
        if (this.mouse.down && this.touching("mouse")) {
          if (this.costumeNumber === 7) {
            this.stage.vars.music = "On";
            this.broadcast("Music");
            this.costume = "On";
            yield* this.startSound("stop-13692");
          } else {
            this.stage.vars.music = "Off";
            this.broadcast("Music");
            this.costumeNumber++;
            yield* this.startSound(
              "zapsplat_multimedia_button_click_004_78081"
            );
          }
          while (!!this.mouse.down) {
            yield;
          }
        }
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.optionClones) === 5) {
      while (true) {
        if (this.mouse.down && this.touching("mouse")) {
          if (this.costumeNumber === 9) {
            this.stage.vars.trailColor = 1;
            this.costume = "Trail 1";
            yield* this.startSound("stop-13692");
          } else {
            this.stage.vars.trailColor++;
            this.costumeNumber++;
            yield* this.startSound("stop-13692");
          }
          while (!!this.mouse.down) {
            yield;
          }
        }
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.optionClones) === 6) {
      while (!(this.toNumber(this.stage.vars.optionClones) === 0)) {
        if (this.mouse.down && this.touching("mouse")) {
          if (this.costumeNumber === 7) {
            this.stage.vars.floating = "On";
            this.costume = "On";
            yield* this.startSound("stop-13692");
          } else {
            this.stage.vars.floating = "Off";
            this.costumeNumber++;
            yield* this.startSound(
              "zapsplat_multimedia_button_click_004_78081"
            );
          }
          while (!!this.mouse.down) {
            yield;
          }
        }
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.optionClones) === 8) {
      while (!(this.toNumber(this.stage.vars.optionClones) === 0)) {
        if (
          this.compare(this.mouse.x, this.x + 15) < 0 &&
          this.compare(this.mouse.x, this.x - 15) > 0 &&
          this.compare(this.mouse.y, this.y + 15) < 0 &&
          this.compare(this.mouse.y, this.y - 15) > 0
        ) {
          this.costume = "Info 2";
          if (this.mouse.down) {
            if (
              this.toString(this.itemOf(this.stage.vars.credits, 0)) === "No"
            ) {
              this.stage.watchers.musicAndSoundFx.visible = true;
              this.stage.vars.credits.splice(0, 1, "Yes");
              yield* this.startSound("menu-select-sound-2");
              if (
                !(
                  this.toString(this.itemOf(this.stage.vars.credits, 1)) ===
                    "No" &&
                  this.toString(this.itemOf(this.stage.vars.credits, 2)) ===
                    "No"
                )
              ) {
                this.stage.watchers.art.visible = false;
                this.stage.vars.credits.splice(1, 1, "No");
                this.stage.watchers.coding.visible = false;
                this.stage.vars.credits.splice(2, 1, "No");
              }
            } else {
              this.stage.watchers.musicAndSoundFx.visible = false;
              this.stage.vars.credits.splice(0, 1, "No");
              yield* this.startSound("menu-select-sound-100466");
            }
            while (!!this.mouse.down) {
              yield;
            }
          }
        } else {
          this.costume = "Info";
        }
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.optionClones) === 9) {
      while (!(this.toNumber(this.stage.vars.optionClones) === 0)) {
        if (
          this.compare(this.mouse.x, this.x + 15) < 0 &&
          this.compare(this.mouse.x, this.x - 15) > 0 &&
          this.compare(this.mouse.y, this.y + 15) < 0 &&
          this.compare(this.mouse.y, this.y - 15) > 0
        ) {
          this.costume = "Info 2";
          if (this.mouse.down) {
            if (
              this.toString(this.itemOf(this.stage.vars.credits, 1)) === "No"
            ) {
              this.stage.watchers.art.visible = true;
              this.stage.vars.credits.splice(1, 1, "Yes");
              yield* this.startSound("menu-select-sound-2");
              if (
                !(
                  this.toString(this.itemOf(this.stage.vars.credits, 0)) ===
                    "No" &&
                  this.toString(this.itemOf(this.stage.vars.credits, 2)) ===
                    "No"
                )
              ) {
                this.stage.watchers.musicAndSoundFx.visible = false;
                this.stage.vars.credits.splice(0, 1, "No");
                this.stage.watchers.coding.visible = false;
                this.stage.vars.credits.splice(2, 1, "No");
              }
            } else {
              this.stage.watchers.art.visible = false;
              this.stage.vars.credits.splice(1, 1, "No");
              yield* this.startSound("menu-select-sound-100466");
            }
            while (!!this.mouse.down) {
              yield;
            }
          }
        } else {
          this.costume = "Info";
        }
        yield;
      }
    }
    if (this.toNumber(this.stage.vars.optionClones) === 10) {
      while (!(this.toNumber(this.stage.vars.optionClones) === 0)) {
        if (
          this.compare(this.mouse.x, this.x + 15) < 0 &&
          this.compare(this.mouse.x, this.x - 15) > 0 &&
          this.compare(this.mouse.y, this.y + 15) < 0 &&
          this.compare(this.mouse.y, this.y - 15) > 0
        ) {
          this.costume = "Info 2";
          if (this.mouse.down) {
            if (
              this.toString(this.itemOf(this.stage.vars.credits, 2)) === "No"
            ) {
              this.stage.watchers.coding.visible = true;
              this.stage.vars.credits.splice(2, 1, "Yes");
              yield* this.startSound("menu-select-sound-2");
              if (
                !(
                  this.toString(this.itemOf(this.stage.vars.credits, 0)) ===
                    "No" &&
                  this.toString(this.itemOf(this.stage.vars.credits, 1)) ===
                    "No"
                )
              ) {
                this.stage.watchers.musicAndSoundFx.visible = false;
                this.stage.vars.credits.splice(0, 1, "No");
                this.stage.watchers.art.visible = false;
                this.stage.vars.credits.splice(1, 1, "No");
              }
            } else {
              this.stage.watchers.coding.visible = false;
              this.stage.vars.credits.splice(2, 1, "No");
              yield* this.startSound("menu-select-sound-100466");
            }
            while (!!this.mouse.down) {
              yield;
            }
          }
        } else {
          this.costume = "Info";
        }
        yield;
      }
    }
  }

  *whenIReceiveClose() {
    this.stage.vars.helpClones = 0;
    this.stage.vars.optionClones = 0;
    this.stage.watchers.musicAndSoundFx.visible = false;
    this.stage.watchers.art.visible = false;
    this.stage.watchers.coding.visible = false;
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveOptions() {
    this.stage.vars.credits = [];
    for (let i = 0; i < 3; i++) {
      this.stage.vars.credits.push("No");
      yield;
    }
    for (let i = 0; i < 10; i++) {
      this.stage.vars.optionClones++;
      this.createClone();
      yield;
    }
  }

  *whenIReceiveReturnGame() {
    this.stage.vars.helpClones = 0;
    this.stage.vars.optionClones = 0;
    this.visible = false;
    this.deleteThisClone();
  }
}
