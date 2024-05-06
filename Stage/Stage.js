/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Background", "./Stage/costumes/Background.png", {
        x: 480,
        y: 360,
      }),
      new Costume("Background 2", "./Stage/costumes/Background 2.png", {
        x: 480,
        y: 360,
      }),
    ];

    this.sounds = [
      new Sound(
        "icuwrfeomhoirfcwuehm",
        "./Stage/sounds/icuwrfeomhoirfcwuehm.wav"
      ),
      new Sound("jazy", "./Stage/sounds/jazy.wav"),
      new Sound("please-be-nice", "./Stage/sounds/please-be-nice.wav"),
      new Sound("BBG SAMPLES (33)", "./Stage/sounds/BBG SAMPLES (33).wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.BROADCAST, { name: "Run" }, this.whenIReceiveRun),
      new Trigger(Trigger.BROADCAST, { name: "Done" }, this.whenIReceiveDone),
      new Trigger(Trigger.BROADCAST, { name: "Music" }, this.whenIReceiveMusic),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart" },
        this.whenIReceiveRestart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Background Music" },
        this.whenIReceiveBackgroundMusic
      ),
      new Trigger(Trigger.BROADCAST, { name: "Help" }, this.whenIReceiveHelp),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Options" },
        this.whenIReceiveOptions
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Main Menu" },
        this.whenIReceiveMainMenu
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "End Screen" },
        this.whenIReceiveEndScreen
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Resume" },
        this.whenIReceiveResume
      ),
    ];

    this.vars.level = 0;
    this.vars.clone = 0;
    this.vars.mousePosition = -606;
    this.vars.turn = 204;
    this.vars.playerLocation = 0;
    this.vars.available = "No";
    this.vars.speed = 4;
    this.vars.running = "No";
    this.vars.gridClones = 0;
    this.vars.titleClones = 0;
    this.vars.runLine = "Yes";
    this.vars.clicks = 0;
    this.vars.line = 0;
    this.vars.indicate = "No";
    this.vars.ready = "No";
    this.vars.indications = 0;
    this.vars.foregroundClones = 2;
    this.vars.menuClones = 0;
    this.vars.optionClones = 0;
    this.vars.trailColor = 1;
    this.vars.music = "On";
    this.vars.diagonalSpeed = 1.71428571429;
    this.vars.helpClones = 0;
    this.vars.description = 0;
    this.vars.floating = "On";
    this.vars.repeating = "No";
    this.vars.alternating = "No";
    this.vars.repating2 = "No";
    this.vars.score = 0;
    this.vars.id = 0;
    this.vars.length = 0;
    this.vars.levelScore = 0;
    this.vars.timeBonus = 0;
    this.vars.yFall = -11.99999999999999;
    this.vars.inGameClones = 0;
    this.vars.showHelp = "No";
    this.vars.helpEnabled = "No";
    this.vars.playEnabled = "No";
    this.vars.hintEnabled = "No";
    this.vars.hint = "No";
    this.vars.playTime = 0;
    this.vars.haveAllBeenTouched = 0;
    this.vars.redoEnabled = "No";
    this.vars.skipped = "No";
    this.vars.endLevel = 20;
    this.vars.hintUsed = 0;
    this.vars.playing = "No";
    this.vars.savedLevel = 0;
    this.vars.savedScore = 0;
    this.vars.positions = [];
    this.vars.ricochet = [
      "Kick 1",
      "Kick 1",
      "Kick 1",
      "Kick 2",
      "Kick 2",
      "Kick 2",
      "Kick 3",
      "Kick 3",
      "Kick 3",
      "Kick 4",
      "Kick 4",
      "Kick 5",
      "Kick 5",
      "Kick 6",
      "Kick 6",
      "Kick 8",
      "Kick 8",
      "Kick 9",
      "Kick 9",
      "Kick 10",
    ];
    this.vars.redirect = [
      "Snare 1",
      "Snare 1",
      "Snare 1",
      "Snap 1",
      "Snap 1",
      "Snap 1",
      "Snare 3",
      "Snare 3",
      "Snare 3",
      "Snare 4",
      "Snare 4",
      "Snare 5",
      "Snare 5",
      "Snare 6",
      "Snare 6",
      "Snare 7",
      "Snare 7",
      "Snare 8",
      "Snare 8",
      "Snare 10",
    ];
    this.vars.tick = [
      "HiHat 1",
      "HiHat 1",
      "HiHat 1",
      "HiHat 2",
      "HiHat 2",
      "HiHat 2",
      "HiHat 3",
      "HiHat 3",
      "HiHat 3",
      "HiHatRoll 1",
      "HiHatRoll 1",
      "Ad Lib 1",
      "HiHat 6",
      "Triangle 1",
      "Triangle 1",
      "Snap 2",
      "Snap 2",
      "Tamb 2",
      "Tamb 2",
    ];
    this.vars.startPosition = [
      "-4-1000",
      "-5-1090",
      502180,
      "-1-3000",
      -403180,
      -502090,
      -300000,
      "-4-1180",
      "04-3090",
      -600090,
      "00-3000",
      "05-1180",
      "-4-2-90",
      2000,
      402180,
      -503090,
      "04-2-90",
      "00-3000",
      "-1-1000",
      3090,
    ];
    this.vars.freeform = [
      0,
      0,
      0,
      "Snare 2",
      "Snare 2",
      "Snare 2",
      0,
      "WoodBlock 1",
      "WoodBlock 1",
      "WoodBlock 2",
      "WoodBlock 2",
      "Clap 1",
      "Clap 1",
      "Kick 7",
      "Tom 1",
      "Tom 2",
      "Tom 2",
      0,
      "Snare 9",
      "Tom 3",
    ];
    this.vars.timedTunnel = [
      0,
      0,
      0,
      0,
      0,
      0,
      "OpenHat 1",
      "OpenHat 1",
      "OpenHat 1",
      "Echo 1",
      "Echo 1",
      0,
      "OpenHat 2",
      "OpenHat 3",
      "OpenHat 3",
      "OpenHat 4",
      0,
      0,
      0,
      "OpenHat 5",
    ];
    this.vars.repeat = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      "HiHat 4",
      "HiHat 4",
      "HiHat 4",
      "HiHat 5",
      "Tamb 1",
      0,
      "HiHat 7",
      0,
      "Shaker 1",
      "HiHat 9",
      "Tamb 2",
      "HiHat 11",
    ];
    this.vars.scoreX = [134, 146, 158, 170, 182, 194, 206];
    this.vars.speedUp = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      "Riser 1",
      "Riser 2",
      "Echo 2",
      0,
      0,
      "Riser 3",
      0,
      "Riser 4",
    ];
    this.vars.repeat2 = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      "HiHat 4",
      "HiHat 4",
      "HiHat 4",
      "HiHat 5",
      0,
      "HiHat 7",
      0,
      "HiHat 8",
      "HiHat 8",
      "HiHat 10",
      "HiHat 10",
    ];
    this.vars.musicAndSoundFx = [
      "@Vubobinali - In-Game Music",
      "Tysu - please be nice",
      "pixabay",
      "zapsplat",
      "cymatics.fm",
      "samplefocus",
      "FL Studio",
    ];
    this.vars.art = ["ProbabIy_Not"];
    this.vars.coding = [
      "ProbabIy_Not",
      "Castle_Hippopotamus - Help & Bug Fixes",
    ];
    this.vars.credits = ["No", "No", "No"];
    this.vars.transfer = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      "Ad Lib 2",
      "Ad Lib 2",
      "HiHatRoll 2",
      "Ad Lib 3",
      "Ad Lib 4",
    ];

    this.watchers.musicAndSoundFx = new Watcher({
      label: "Music And Sound FX",
      style: "normal",
      visible: false,
      value: () => this.vars.musicAndSoundFx,
      x: 240,
      y: -52,
      width: 266,
      height: 126,
    });
    this.watchers.art = new Watcher({
      label: "Art",
      style: "normal",
      visible: false,
      value: () => this.vars.art,
      x: 240,
      y: -52,
      width: 266,
      height: 126,
    });
    this.watchers.coding = new Watcher({
      label: "Coding",
      style: "normal",
      visible: false,
      value: () => this.vars.coding,
      x: 240,
      y: -52,
      width: 266,
      height: 126,
    });
  }

  *whenGreenFlagClicked() {
    this.vars.music = "On";
    this.audioEffects.volume = 0;
    for (let i = 0; i < 20; i++) {
      this.audioEffects.volume += (100 - this.audioEffects.volume) / 4;
      yield;
    }
    this.audioEffects.volume = 100;
  }

  *whenGreenFlagClicked2() {
    while (!(this.compare(this.vars.level, 0) > 0)) {
      yield* this.playSoundUntilDone("please-be-nice");
      yield;
    }
  }

  *whenIReceiveRun() {
    if (this.toString(this.vars.music) === "On") {
      for (let i = 0; i < 10; i++) {
        this.audioEffects.volume -= 10;
        yield;
      }
    }
  }

  *whenIReceiveDone() {
    if (this.toString(this.vars.music) === "On") {
      this.audioEffects.volume = 0;
      for (let i = 0; i < 10; i++) {
        this.audioEffects.volume += 10;
        yield;
      }
    }
  }

  *whenIReceiveMusic() {
    if (this.toString(this.vars.music) === "Off") {
      this.audioEffects.volume = 0;
    } else {
      this.audioEffects.volume = 40;
    }
  }

  *whenIReceiveRestart() {
    if (this.toString(this.vars.music) === "On") {
      this.audioEffects.volume = 0;
      for (let i = 0; i < 10; i++) {
        this.audioEffects.volume += 10;
        yield;
      }
    }
  }

  *whenIReceiveNextLevel() {
    if (
      this.toNumber(this.vars.level) === 1 &&
      this.toNumber(this.vars.line) === 0
    ) {
      this.stopAllSounds();
      this.broadcast("Click");
      this.broadcast("Background Music");
    } else {
      if (this.toString(this.vars.music) === "On") {
        for (let i = 0; i < 10; i++) {
          this.audioEffects.volume += 10;
          yield;
        }
      }
    }
  }

  *whenIReceiveBackgroundMusic() {
    while (true) {
      yield* this.playSoundUntilDone("jazy");
      yield* this.playSoundUntilDone("icuwrfeomhoirfcwuehm");
      yield;
    }
  }

  *whenIReceiveHelp() {
    if (this.toString(this.vars.music) === "On") {
      for (let i = 0; i < 20; i++) {
        this.audioEffects.volume -= 3;
        yield;
      }
      this.audioEffects.volume = 40;
      while (!(this.toNumber(this.vars.helpClones) === 4)) {
        yield;
      }
      while (!(this.toNumber(this.vars.helpClones) === 0)) {
        yield;
      }
    }
  }

  *whenIReceiveOptions() {
    if (this.toString(this.vars.music) === "On") {
      for (let i = 0; i < 20; i++) {
        this.audioEffects.volume -= 3;
        yield;
      }
      this.audioEffects.volume = 40;
      while (!(this.toNumber(this.vars.optionClones) === 6)) {
        yield;
      }
      while (!(this.toNumber(this.vars.optionClones) === 0)) {
        yield;
      }
    }
  }

  *whenIReceiveMainMenu() {
    if (this.toString(this.vars.music) === "On") {
      for (let i = 0; i < 20; i++) {
        this.audioEffects.volume += 3;
        yield;
      }
      this.audioEffects.volume = 100;
    }
  }

  *whenIReceiveEndScreen() {
    if (this.toString(this.vars.music) === "On") {
      for (let i = 0; i < 20; i++) {
        this.audioEffects.volume -= 3;
        yield;
      }
      /* TODO: Implement stop other scripts in sprite */ null;
      while (true) {
        yield* this.playSoundUntilDone("BBG SAMPLES (33)");
        yield;
      }
    }
  }

  *whenIReceiveResume() {
    this.stopAllSounds();
    this.broadcast("Click");
    this.broadcast("Background Music");
  }
}
