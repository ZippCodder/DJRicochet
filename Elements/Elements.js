/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Elements extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("01", "./Elements/costumes/01.png", { x: 50, y: 50 }),
      new Costume("02", "./Elements/costumes/02.png", { x: 50, y: 50 }),
      new Costume("03", "./Elements/costumes/03.png", { x: 50, y: 50 }),
      new Costume("04", "./Elements/costumes/04.png", { x: 50, y: 50 }),
      new Costume("05", "./Elements/costumes/05.png", { x: 460, y: 80 }),
      new Costume("06", "./Elements/costumes/06.png", { x: 460, y: 80 }),
      new Costume("07", "./Elements/costumes/07.png", { x: 56, y: 56 }),
      new Costume("08", "./Elements/costumes/08.png", { x: 56, y: 56 }),
      new Costume("09", "./Elements/costumes/09.png", { x: 30, y: 26 }),
      new Costume("10", "./Elements/costumes/10.png", { x: 26, y: 30 }),
      new Costume("11", "./Elements/costumes/11.png", { x: 30, y: 26 }),
      new Costume("12", "./Elements/costumes/12.png", { x: 26, y: 30 }),
      new Costume("13", "./Elements/costumes/13.png", { x: 30, y: 24 }),
      new Costume("14", "./Elements/costumes/14.png", { x: 24, y: 30 }),
      new Costume("15", "./Elements/costumes/15.png", { x: 32, y: 32 }),
      new Costume("16", "./Elements/costumes/16.png", { x: 36, y: 36 }),
      new Costume("17", "./Elements/costumes/17.png", { x: 36, y: 36 }),
      new Costume("18", "./Elements/costumes/18.png", { x: 36, y: 36 }),
      new Costume("19", "./Elements/costumes/19.png", { x: 36, y: 36 }),
      new Costume("20", "./Elements/costumes/20.png", { x: 36, y: 36 }),
      new Costume("21", "./Elements/costumes/21.png", { x: 36, y: 36 }),
      new Costume("22", "./Elements/costumes/22.png", { x: 36, y: 36 }),
      new Costume("23", "./Elements/costumes/23.png", { x: 36, y: 36 }),
      new Costume("24", "./Elements/costumes/24.png", { x: 0, y: 0 }),
      new Costume("25", "./Elements/costumes/25.png", { x: 36, y: 36 }),
      new Costume("26", "./Elements/costumes/26.png", { x: 36, y: 36 }),
      new Costume("27", "./Elements/costumes/27.png", { x: 36, y: 36 }),
      new Costume("28", "./Elements/costumes/28.png", { x: 36, y: 36 }),
      new Costume("29", "./Elements/costumes/29.png", { x: 36, y: 36 }),
      new Costume("30", "./Elements/costumes/30.png", { x: 36, y: 36 }),
      new Costume("31", "./Elements/costumes/31.png", { x: 36, y: 36 }),
      new Costume("32", "./Elements/costumes/32.png", { x: 36, y: 36 }),
      new Costume("33", "./Elements/costumes/33.png", { x: 36, y: 36 }),
      new Costume("34", "./Elements/costumes/34.png", { x: 36, y: 36 }),
      new Costume("35", "./Elements/costumes/35.png", { x: 36, y: 36 }),
      new Costume("36", "./Elements/costumes/36.png", { x: 36, y: 36 }),
      new Costume("37", "./Elements/costumes/37.png", { x: 56, y: 56 }),
      new Costume("38", "./Elements/costumes/38.png", { x: 56, y: 56 }),
      new Costume("39", "./Elements/costumes/39.png", { x: 56, y: 56 }),
      new Costume("40", "./Elements/costumes/40.png", { x: 56, y: 56 }),
      new Costume("Null", "./Elements/costumes/Null.svg", { x: 0, y: 0 }),
    ];

    this.sounds = [
      new Sound(
        "notifications-sound-127856",
        "./Elements/sounds/notifications-sound-127856.wav"
      ),
      new Sound("Fanfare", "./Elements/sounds/Fanfare.wav"),
      new Sound("Kick 1", "./Elements/sounds/Kick 1.wav"),
      new Sound("Snare 1", "./Elements/sounds/Snare 1.wav"),
      new Sound("HiHat 1", "./Elements/sounds/HiHat 1.wav"),
      new Sound("Kick 2", "./Elements/sounds/Kick 2.wav"),
      new Sound("Snare 2", "./Elements/sounds/Snare 2.wav"),
      new Sound("HiHat 2", "./Elements/sounds/HiHat 2.wav"),
      new Sound("Snap 1", "./Elements/sounds/Snap 1.wav"),
      new Sound("Kick 3", "./Elements/sounds/Kick 3.wav"),
      new Sound("Snare 3", "./Elements/sounds/Snare 3.wav"),
      new Sound("HiHat 3", "./Elements/sounds/HiHat 3.wav"),
      new Sound("OpenHat 1", "./Elements/sounds/OpenHat 1.wav"),
      new Sound("WoodBlock 1", "./Elements/sounds/WoodBlock 1.wav"),
      new Sound("Kick 4", "./Elements/sounds/Kick 4.wav"),
      new Sound("Snare 4", "./Elements/sounds/Snare 4.wav"),
      new Sound("HiHat 4", "./Elements/sounds/HiHat 4.wav"),
      new Sound("HiHatRoll 1", "./Elements/sounds/HiHatRoll 1.wav"),
      new Sound("WoodBlock 2", "./Elements/sounds/WoodBlock 2.wav"),
      new Sound("Echo 1", "./Elements/sounds/Echo 1.wav"),
      new Sound("Kick 5", "./Elements/sounds/Kick 5.wav"),
      new Sound("Clap 1", "./Elements/sounds/Clap 1.wav"),
      new Sound("HiHat 5", "./Elements/sounds/HiHat 5.wav"),
      new Sound("Snare 5", "./Elements/sounds/Snare 5.wav"),
      new Sound("Ad Lib 1", "./Elements/sounds/Ad Lib 1.wav"),
      new Sound("Riser 1", "./Elements/sounds/Riser 1.wav"),
      new Sound("HiHat 6", "./Elements/sounds/HiHat 6.wav"),
      new Sound("Tamb 1", "./Elements/sounds/Tamb 1.wav"),
      new Sound("OpenHat 2", "./Elements/sounds/OpenHat 2.wav"),
      new Sound("Riser 2", "./Elements/sounds/Riser 2.wav"),
      new Sound("Kick 6", "./Elements/sounds/Kick 6.wav"),
      new Sound("Kick 7", "./Elements/sounds/Kick 7.wav"),
      new Sound("Snare 6", "./Elements/sounds/Snare 6.wav"),
      new Sound("Triangle 1", "./Elements/sounds/Triangle 1.wav"),
      new Sound("HiHat 7", "./Elements/sounds/HiHat 7.wav"),
      new Sound("OpenHat 3", "./Elements/sounds/OpenHat 3.wav"),
      new Sound("Echo 2", "./Elements/sounds/Echo 2.wav"),
      new Sound("Tom 1", "./Elements/sounds/Tom 1.wav"),
      new Sound("Kick 8", "./Elements/sounds/Kick 8.wav"),
      new Sound("Snap 2", "./Elements/sounds/Snap 2.wav"),
      new Sound("Snare 7", "./Elements/sounds/Snare 7.wav"),
      new Sound("Tom 2", "./Elements/sounds/Tom 2.wav"),
      new Sound("Shaker 1", "./Elements/sounds/Shaker 1.wav"),
      new Sound("OpenHat 4", "./Elements/sounds/OpenHat 4.wav"),
      new Sound("HiHat 8", "./Elements/sounds/HiHat 8.wav"),
      new Sound("Ad Lib 2", "./Elements/sounds/Ad Lib 2.wav"),
      new Sound("Riser 3", "./Elements/sounds/Riser 3.wav"),
      new Sound("Kick 9", "./Elements/sounds/Kick 9.wav"),
      new Sound("Tamb 2", "./Elements/sounds/Tamb 2.wav"),
      new Sound("Snare 8", "./Elements/sounds/Snare 8.wav"),
      new Sound("Snare 9", "./Elements/sounds/Snare 9.wav"),
      new Sound("HiHat 9", "./Elements/sounds/HiHat 9.wav"),
      new Sound("HiHatRoll 2", "./Elements/sounds/HiHatRoll 2.wav"),
      new Sound("HiHat 10", "./Elements/sounds/HiHat 10.wav"),
      new Sound("Riser 4", "./Elements/sounds/Riser 4.wav"),
      new Sound("Ad Lib 3", "./Elements/sounds/Ad Lib 3.wav"),
      new Sound(
        "zapsplat_multimedia_alert_mallet_wood_simple_musical_negative_001_65490",
        "./Elements/sounds/zapsplat_multimedia_alert_mallet_wood_simple_musical_negative_001_65490.wav"
      ),
      new Sound("Kick 10", "./Elements/sounds/Kick 10.wav"),
      new Sound("Snare 10", "./Elements/sounds/Snare 10.wav"),
      new Sound("HiHat 11", "./Elements/sounds/HiHat 11.wav"),
      new Sound("Tom 3", "./Elements/sounds/Tom 3.wav"),
      new Sound("OpenHat 5", "./Elements/sounds/OpenHat 5.wav"),
      new Sound("Ad Lib 4", "./Elements/sounds/Ad Lib 4.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel2
      ),
      new Trigger(Trigger.BROADCAST, { name: "Run" }, this.whenIReceiveRun),
      new Trigger(Trigger.CLONE_START, this.startAsClone4),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Repeat Light" },
        this.whenIReceiveRepeatLight
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone5),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart" },
        this.whenIReceiveRestart
      ),
      new Trigger(Trigger.BROADCAST, { name: "Help" }, this.whenIReceiveHelp),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Return Game" },
        this.whenIReceiveReturnGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Have all been touched" },
        this.whenIReceiveHaveAllBeenTouched
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "light up Leftovers" },
        this.whenIReceiveLightUpLeftovers
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "show clones" },
        this.whenIReceiveShowClones
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart" },
        this.whenIReceiveRestart2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart" },
        this.whenIReceiveRestart3
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Transfer Repeat" },
        this.whenIReceiveTransferRepeat
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Orient" },
        this.whenIReceiveOrient
      ),
    ];

    this.vars.hasThisOneBeenTouched = 1;
  }

  *startAsClone() {
    this.effects.clear();
    this.visible = true;
    this.moveAhead();
    this.goto(
      this.toNumber(
        this.letterOf(
          this.itemOf(this.stage.vars.positions, this.stage.vars.clone - 1),
          0
        ) +
          this.letterOf(
            this.itemOf(this.stage.vars.positions, this.stage.vars.clone - 1),
            1
          )
      ) * 28,
      this.toNumber(
        this.letterOf(
          this.itemOf(this.stage.vars.positions, this.stage.vars.clone - 1),
          2
        ) +
          this.letterOf(
            this.itemOf(this.stage.vars.positions, this.stage.vars.clone - 1),
            3
          )
      ) *
        28 +
        2
    );
    if (this.toString(this.stage.vars.running) === "No") {
      this.costume =
        this.letterOf(
          this.itemOf(this.stage.vars.positions, this.stage.vars.clone - 1),
          4
        ) +
        this.letterOf(
          this.itemOf(this.stage.vars.positions, this.stage.vars.clone - 1),
          5
        );
    }
    this.size = 0;
    while (true) {
      if (this.toString(this.stage.vars.floating) === "On") {
        this.direction =
          90 + Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) * 0;
        this.y +=
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.turn))) / 4;
      }
      this.size += (100 - this.size) / 4;
      yield;
    }
  }

  *whenIReceiveNextLevel() {
    this.vars.hasThisOneBeenTouched = 1;
    this.stage.vars.repeating = "No";
    this.stage.vars.repating2 = "No";
    this.stage.vars.turn = 0;
    this.stage.vars.clicks = 0;
    this.stage.vars.clone = 0;
    this.stage.vars.positions = [];
    if (this.toNumber(this.stage.vars.level) === 1) {
      yield* this.setXSetYCostume(-4, 1, 3);
      yield* this.setXSetYCostume(-2, 1, 13);
      yield* this.setXSetYCostume(0, 1, 9);
      yield* this.setXSetYCostume(2, 1, 13);
      yield* this.setXSetYCostume(4, 1, 4);
      yield* this.setXSetYCostume(4, -1, 4);
      yield* this.setXSetYCostume(2, -1, 11);
      yield* this.setXSetYCostume(0, -1, 13);
      yield* this.setXSetYCostume(-2, -1, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 2) {
      yield* this.setXSetYCostume(-3, -1, 3);
      yield* this.setXSetYCostume(-3, 1, 14);
      yield* this.setXSetYCostume(-3, 2, 4);
      yield* this.setXSetYCostume(-2, 2, 12);
      yield* this.setXSetYCostume(0, 2, 13);
      yield* this.setXSetYCostume(1, 2, 1);
      yield* this.setXSetYCostume(1, 1, 4);
      yield* this.setXSetYCostume(3, 1, 2);
      yield* this.setXSetYCostume(3, -1, 11);
      yield* this.setXSetYCostume(1, -1, 13);
      yield* this.setXSetYCostume(0, -1, 1);
      yield* this.setXSetYCostume(0, 0, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 3) {
      yield* this.setXSetYCostume(5, 0, 1);
      yield* this.setXSetYCostume(4, 0, 13);
      yield* this.setXSetYCostume(3, 0, 13);
      yield* this.setXSetYCostume(2, 0, 13);
      yield* this.setXSetYCostume(1, 0, 9);
      yield* this.setXSetYCostume(1, 1, 14);
      yield* this.setXSetYCostume(1, 2, 12);
      yield* this.setXSetYCostume(0, 2, 9);
      yield* this.setXSetYCostume(-1, 2, 13);
      yield* this.setXSetYCostume(-2, 2, 2);
      yield* this.setXSetYCostume(-2, 1, 10);
      yield* this.setXSetYCostume(-2, 0, 14);
      yield* this.setXSetYCostume(-2, -1, 9);
      yield* this.setXSetYCostume(-3, -1, 13);
      yield* this.setXSetYCostume(-4, -1, 2);
      yield* this.setXSetYCostume(-4, -2, 1);
      yield* this.setXSetYCostume(-5, -2, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 4) {
      yield* this.setXSetYCostume(-1, -2, 2);
      yield* this.setXSetYCostume(0, -2, 13);
      yield* this.setXSetYCostume(1, -2, 17);
      yield* this.setXSetYCostume(1, -1, 14);
      yield* this.setXSetYCostume(1, 0, 12);
      yield* this.setXSetYCostume(0, 0, 13);
      yield* this.setXSetYCostume(-1, 0, 18);
      yield* this.setXSetYCostume(-2, 0, 13);
      yield* this.setXSetYCostume(-3, 0, 2);
      yield* this.setXSetYCostume(-3, -1, 2);
      yield* this.setXSetYCostume(-4, -1, 9);
      yield* this.setXSetYCostume(-1, 1, 14);
      yield* this.setXSetYCostume(-1, 2, 3);
      yield* this.setXSetYCostume(0, 2, 13);
      yield* this.setXSetYCostume(1, 2, 18);
      yield* this.setXSetYCostume(2, 2, 13);
      yield* this.setXSetYCostume(3, 2, 12);
      yield* this.setXSetYCostume(3, 1, 14);
      yield* this.setXSetYCostume(3, 0, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 5) {
      yield* this.setXSetYCostume(-4, 1, 1);
      yield* this.setXSetYCostume(-3, 1, 16);
      yield* this.setXSetYCostume(-2, 1, 13);
      yield* this.setXSetYCostume(-1, 1, 13);
      yield* this.setXSetYCostume(0, 1, 10);
      yield* this.setXSetYCostume(0, 0, 14);
      yield* this.setXSetYCostume(0, -1, 14);
      yield* this.setXSetYCostume(0, -2, 19);
      yield* this.setXSetYCostume(1, -2, 4);
      yield* this.setXSetYCostume(1, -1, 16);
      yield* this.setXSetYCostume(-1, -1, 13);
      yield* this.setXSetYCostume(-2, -1, 11);
      yield* this.setXSetYCostume(2, -1, 13);
      yield* this.setXSetYCostume(3, -1, 3);
      yield* this.setXSetYCostume(3, 0, 2);
      yield* this.setXSetYCostume(4, 0, 13);
      yield* this.setXSetYCostume(5, 0, 11);
      yield* this.setXSetYCostume(5, 1, 14);
      yield* this.setXSetYCostume(5, 2, 1);
      yield* this.setXSetYCostume(4, 2, 13);
      yield* this.setXSetYCostume(3, 2, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 6) {
      yield* this.setXSetYCostume(-4, 2, 3);
      yield* this.setXSetYCostume(-4, 1, 14);
      yield* this.setXSetYCostume(-4, 0, 17);
      yield* this.setXSetYCostume(-4, -1, 16);
      yield* this.setXSetYCostume(-4, -2, 9);
      yield* this.setXSetYCostume(-3, -2, 4);
      yield* this.setXSetYCostume(-3, -1, 14);
      yield* this.setXSetYCostume(-3, 0, 14);
      yield* this.setXSetYCostume(-3, 1, 1);
      yield* this.setXSetYCostume(-2, 1, 13);
      yield* this.setXSetYCostume(-1, 1, 16);
      yield* this.setXSetYCostume(0, 1, 18);
      yield* this.setXSetYCostume(0, 0, 12);
      yield* this.setXSetYCostume(0, -1, 4);
      yield* this.setXSetYCostume(1, -1, 13);
      yield* this.setXSetYCostume(2, -1, 2);
      yield* this.setXSetYCostume(2, 0, 2);
      yield* this.setXSetYCostume(3, 0, 13);
      yield* this.setXSetYCostume(4, 0, 17);
      yield* this.setXSetYCostume(4, -1, 16);
      yield* this.setXSetYCostume(4, -2, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 7) {
      yield* this.setXSetYCostume(-3, 2, 2);
      yield* this.setXSetYCostume(-2, 2, 13);
      yield* this.setXSetYCostume(-1, 2, 10);
      yield* this.setXSetYCostume(0, 2, 13);
      yield* this.setXSetYCostume(1, 2, 1);
      yield* this.setXSetYCostume(1, 1, 14);
      yield* this.setXSetYCostume(1, -1, 6);
      yield* this.setXSetYCostume(0, -2, 2);
      yield* this.setXSetYCostume(2, 0, 11);
      yield* this.setXSetYCostume(1, 0, 14);
      yield* this.setXSetYCostume(0, 0, 3);
      yield* this.setXSetYCostume(0, 1, 10);
      yield* this.setXSetYCostume(-1, 1, 13);
      yield* this.setXSetYCostume(-2, 1, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 8) {
      yield* this.setXSetYCostume(-4, -2, 2);
      yield* this.setXSetYCostume(-2, -2, 5);
      yield* this.setXSetYCostume(0, 0, 12);
      yield* this.setXSetYCostume(0, -1, 16);
      yield* this.setXSetYCostume(2, -1, 17);
      yield* this.setXSetYCostume(3, -1, 6);
      yield* this.setXSetYCostume(4, 0, 10);
      yield* this.setXSetYCostume(4, 1, 1);
      yield* this.setXSetYCostume(3, 1, 13);
      yield* this.setXSetYCostume(2, 1, 12);
      yield* this.setXSetYCostume(1, 1, 17);
      yield* this.setXSetYCostume(0, 1, 13);
      yield* this.setXSetYCostume(-1, 1, 19);
      yield* this.setXSetYCostume(-2, 1, 13);
      yield* this.setXSetYCostume(-3, 1, 1);
      yield* this.setXSetYCostume(-3, 2, 1);
      yield* this.setXSetYCostume(-4, 2, 12);
      yield* this.setXSetYCostume(-4, 1, 10);
      yield* this.setXSetYCostume(-4, 0, 6);
      yield* this.setXSetYCostume(-5, -1, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 9) {
      yield* this.setXSetYCostume(6, -3, 2);
      yield* this.setXSetYCostume(6, -1, 3);
      yield* this.setXSetYCostume(4, -1, 10);
      yield* this.setXSetYCostume(2, -1, 16);
      yield* this.setXSetYCostume(3, -1, 17);
      yield* this.setXSetYCostume(1, -1, 5);
      yield* this.setXSetYCostume(0, 0, 13);
      yield* this.setXSetYCostume(-1, 1, 13);
      yield* this.setXSetYCostume(-2, 2, 1);
      yield* this.setXSetYCostume(2, -2, 10);
      yield* this.setXSetYCostume(1, -2, 12);
      yield* this.setXSetYCostume(0, -2, 1);
      yield* this.setXSetYCostume(0, -1, 2);
      yield* this.setXSetYCostume(-1, -1, 2);
      yield* this.setXSetYCostume(-1, -2, 14);
      yield* this.setXSetYCostume(-1, -3, 12);
      yield* this.setXSetYCostume(-2, -3, 13);
      yield* this.setXSetYCostume(-3, -3, 19);
      yield* this.setXSetYCostume(-4, -3, 17);
      yield* this.setXSetYCostume(-5, -3, 4);
      yield* this.setXSetYCostume(-5, -2, 11);
      yield* this.setXSetYCostume(-5, -1, 2);
      yield* this.setXSetYCostume(-4, -1, 3);
      yield* this.setXSetYCostume(-4, 0, 12);
      yield* this.setXSetYCostume(-4, 1, 5);
      yield* this.setXSetYCostume(-2, 3, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 10) {
      yield* this.setXSetYCostume(-4, 0, 7);
      yield* this.setXSetYCostume(-2, 0, 13);
      yield* this.setXSetYCostume(-1, 0, 4);
      yield* this.setXSetYCostume(-1, 1, 11);
      yield* this.setXSetYCostume(-1, 2, 4);
      yield* this.setXSetYCostume(0, 2, 17);
      yield* this.setXSetYCostume(1, 2, 17);
      yield* this.setXSetYCostume(1, 1, 1);
      yield* this.setXSetYCostume(2, 1, 4);
      yield* this.setXSetYCostume(2, -1, 14);
      yield* this.setXSetYCostume(2, -2, 10);
      yield* this.setXSetYCostume(5, -2, 2);
      yield* this.setXSetYCostume(5, -1, 1);
      yield* this.setXSetYCostume(6, -1, 16);
      yield* this.setXSetYCostume(6, 0, 3);
      yield* this.setXSetYCostume(5, 0, 1);
      yield* this.setXSetYCostume(5, 1, 12);
      yield* this.setXSetYCostume(5, 2, 10);
      yield* this.setXSetYCostume(4, 2, 5);
      yield* this.setXSetYCostume(-1, -3, 19);
      yield* this.setXSetYCostume(-2, -3, 11);
      yield* this.setXSetYCostume(-3, -3, 1);
      yield* this.setXSetYCostume(-3, -2, 2);
      yield* this.setXSetYCostume(-4, -2, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 11) {
      yield* this.setXSetYCostume(0, -2, 1);
      yield* this.setXSetYCostume(2, -2, 1);
      yield* this.setXSetYCostume(2, -1, 17);
      yield* this.setXSetYCostume(2, 0, 9);
      yield* this.setXSetYCostume(1, 0, 16);
      yield* this.setXSetYCostume(0, 0, 13);
      yield* this.setXSetYCostume(-1, 0, 3);
      yield* this.setXSetYCostume(-1, 1, 8);
      yield* this.setXSetYCostume(-1, 2, 17);
      yield* this.setXSetYCostume(-2, 2, 2);
      yield* this.setXSetYCostume(-2, 1, 4);
      yield* this.setXSetYCostume(-3, 1, 11);
      yield* this.setXSetYCostume(-5, 1, 10);
      yield* this.setXSetYCostume(-5, 0, 5);
      yield* this.setXSetYCostume(-4, -1, 12);
      yield* this.setXSetYCostume(-2, -1, 13);
      yield* this.setXSetYCostume(1, 1, 14);
      yield* this.setXSetYCostume(1, 2, 3);
      yield* this.setXSetYCostume(2, 2, 2);
      yield* this.setXSetYCostume(2, 3, 12);
      yield* this.setXSetYCostume(6, 3, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 12) {
      yield* this.setXSetYCostume(5, -2, 3);
      yield* this.setXSetYCostume(4, -2, 2);
      yield* this.setXSetYCostume(4, -1, 2);
      yield* this.setXSetYCostume(2, -1, 12);
      yield* this.setXSetYCostume(2, 1, 18);
      yield* this.setXSetYCostume(4, 1, 8);
      yield* this.setXSetYCostume(5, 1, 1);
      yield* this.setXSetYCostume(5, 3, 4);
      yield* this.setXSetYCostume(2, 3, 12);
      yield* this.setXSetYCostume(-1, 3, 1);
      yield* this.setXSetYCostume(-1, 2, 2);
      yield* this.setXSetYCostume(1, 2, 13);
      yield* this.setXSetYCostume(3, 2, 12);
      yield* this.setXSetYCostume(4, 2, 20);
      yield* this.setXSetYCostume(6, 2, 17);
      yield* this.setXSetYCostume(6, -2, 12);
      yield* this.setXSetYCostume(6, -3, 4);
      yield* this.setXSetYCostume(-1, -3, 16);
      yield* this.setXSetYCostume(-2, -3, 2);
      yield* this.setXSetYCostume(-2, -1, 1);
      yield* this.setXSetYCostume(-3, -1, 2);
      yield* this.setXSetYCostume(-3, -3, 3);
      yield* this.setXSetYCostume(-5, -3, 10);
      yield* this.setXSetYCostume(-5, -1, 14);
      yield* this.setXSetYCostume(-5, 1, 3);
      yield* this.setXSetYCostume(-3, 1, 1);
      yield* this.setXSetYCostume(-3, 3, 17);
      yield* this.setXSetYCostume(-4, 3, 2);
      yield* this.setXSetYCostume(-4, 0, 4);
      yield* this.setXSetYCostume(-6, 0, 3);
      yield* this.setXSetYCostume(-6, -2, 11);
      yield* this.setXSetYCostume(-6, -3, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 13) {
      yield* this.setXSetYCostume(-5, -2, 22);
      yield* this.setXSetYCostume(-6, -2, 2);
      yield* this.setXSetYCostume(-6, 0, 14);
      yield* this.setXSetYCostume(-6, 2, 10);
      yield* this.setXSetYCostume(-4, 2, 4);
      yield* this.setXSetYCostume(-4, 0, 14);
      yield* this.setXSetYCostume(-4, -1, 2);
      yield* this.setXSetYCostume(-3, -1, 11);
      yield* this.setXSetYCostume(-1, -1, 18);
      yield* this.setXSetYCostume(-1, 1, 7);
      yield* this.setXSetYCostume(-1, 3, 1);
      yield* this.setXSetYCostume(1, 3, 13);
      yield* this.setXSetYCostume(3, 3, 9);
      yield* this.setXSetYCostume(-1, -3, 3);
      yield* this.setXSetYCostume(1, -3, 4);
      yield* this.setXSetYCostume(1, -1, 14);
      yield* this.setXSetYCostume(1, 1, 11);
      yield* this.setXSetYCostume(3, 1, 6);
      yield* this.setXSetYCostume(5, 3, 4);
      yield* this.setXSetYCostume(2, 0, 10);
      yield* this.setXSetYCostume(5, 0, 16);
      yield* this.setXSetYCostume(5, -3, 17);
      yield* this.setXSetYCostume(2, -3, 11);
      yield* this.setXSetYCostume(2, -1, 2);
      yield* this.setXSetYCostume(4, -1, 2);
      yield* this.setXSetYCostume(4, -2, 1);
      yield* this.setXSetYCostume(6, -2, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 14) {
      yield* this.setXSetYCostume(0, 3, 1);
      yield* this.setXSetYCostume(0, 3, 8);
      yield* this.setXSetYCostume(-2, 3, 3);
      yield* this.setXSetYCostume(-2, 2, 1);
      yield* this.setXSetYCostume(-1, 2, 11);
      yield* this.setXSetYCostume(2, 2, 9);
      yield* this.setXSetYCostume(3, 2, 2);
      yield* this.setXSetYCostume(3, 2, 14);
      yield* this.setXSetYCostume(3, 1, 1);
      yield* this.setXSetYCostume(4, 1, 2);
      yield* this.setXSetYCostume(4, 2, 17);
      yield* this.setXSetYCostume(5, 2, 9);
      yield* this.setXSetYCostume(5, 0, 9);
      yield* this.setXSetYCostume(4, 0, 5);
      yield* this.setXSetYCostume(3, -1, 16);
      yield* this.setXSetYCostume(2, -1, 1);
      yield* this.setXSetYCostume(2, 0, 2);
      yield* this.setXSetYCostume(0, 0, 11);
      yield* this.setXSetYCostume(2, 0, 13);
      yield* this.setXSetYCostume(-2, 0, 6);
      yield* this.setXSetYCostume(-4, 2, 12);
      yield* this.setXSetYCostume(-5, 2, 13);
      yield* this.setXSetYCostume(-6, 2, 9);
      yield* this.setXSetYCostume(-6, 1, 14);
      yield* this.setXSetYCostume(-6, 0, 10);
      yield* this.setXSetYCostume(-5, 0, 13);
      yield* this.setXSetYCostume(-4, 0, 1);
      yield* this.setXSetYCostume(-4, -1, 17);
      yield* this.setXSetYCostume(-4, -2, 1);
      yield* this.setXSetYCostume(-5, -2, 18);
      yield* this.setXSetYCostume(-5, -3, 3);
      yield* this.setXSetYCostume(-3, -3, 20);
      yield* this.setXSetYCostume(6, -3, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 15) {
      yield* this.setXSetYCostume(4, 1, 1);
      yield* this.setXSetYCostume(1, 1, 1);
      yield* this.setXSetYCostume(1, 0, 21);
      yield* this.setXSetYCostume(1, -2, 2);
      yield* this.setXSetYCostume(1, -2, 13);
      yield* this.setXSetYCostume(-1, -2, 12);
      yield* this.setXSetYCostume(-3, -2, 2);
      yield* this.setXSetYCostume(-3, -2, 7);
      yield* this.setXSetYCostume(-3, 0, 4);
      yield* this.setXSetYCostume(0, 0, 4);
      yield* this.setXSetYCostume(0, 1, 11);
      yield* this.setXSetYCostume(0, 2, 2);
      yield* this.setXSetYCostume(-3, 2, 1);
      yield* this.setXSetYCostume(-3, 1, 17);
      yield* this.setXSetYCostume(-5, 1, 16);
      yield* this.setXSetYCostume(-5, 0, 10);
      yield* this.setXSetYCostume(-5, -3, 4);
      yield* this.setXSetYCostume(-4, -3, 2);
      yield* this.setXSetYCostume(-4, 3, 11);
      yield* this.setXSetYCostume(-1, 3, 18);
      yield* this.setXSetYCostume(2, 3, 9);
      yield* this.setXSetYCostume(1, 3, 17);
      yield* this.setXSetYCostume(4, 3, 5);
      yield* this.setXSetYCostume(6, 1, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 16) {
      yield* this.setXSetYCostume(-4, 3, 1);
      yield* this.setXSetYCostume(-4, 2, 8);
      yield* this.setXSetYCostume(-4, 0, 2);
      yield* this.setXSetYCostume(-5, 0, 10);
      yield* this.setXSetYCostume(-5, -2, 14);
      yield* this.setXSetYCostume(-5, -3, 1);
      yield* this.setXSetYCostume(-2, -3, 4);
      yield* this.setXSetYCostume(-2, -2, 2);
      yield* this.setXSetYCostume(-3, -2, 10);
      yield* this.setXSetYCostume(-3, 0, 16);
      yield* this.setXSetYCostume(-3, 1, 18);
      yield* this.setXSetYCostume(-3, 2, 39);
      yield* this.setXSetYCostume(1, -1, 39);
      yield* this.setXSetYCostume(1, -3, 2);
      yield* this.setXSetYCostume(2, -3, 3);
      yield* this.setXSetYCostume(2, -2, 11);
      yield* this.setXSetYCostume(2, 0, 6);
      yield* this.setXSetYCostume(1, 1, 19);
      yield* this.setXSetYCostume(1, 2, 2);
      yield* this.setXSetYCostume(2, 2, 16);
      yield* this.setXSetYCostume(3, 2, 2);
      yield* this.setXSetYCostume(3, 1, 2);
      yield* this.setXSetYCostume(4, 1, 9);
      yield* this.setXSetYCostume(5, 1, 3);
      yield* this.setXSetYCostume(5, 0, 14);
      yield* this.setXSetYCostume(5, -1, 12);
      yield* this.setXSetYCostume(5, -2, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 17) {
      yield* this.setXSetYCostume(3, -2, 1);
      yield* this.setXSetYCostume(3, -2, 7);
      yield* this.setXSetYCostume(3, 1, 9);
      yield* this.setXSetYCostume(4, 1, 3);
      yield* this.setXSetYCostume(4, -1, 12);
      yield* this.setXSetYCostume(2, -1, 2);
      yield* this.setXSetYCostume(2, 2, 11);
      yield* this.setXSetYCostume(1, 2, 39);
      yield* this.setXSetYCostume(-1, 0, 40);
      yield* this.setXSetYCostume(-1, -1, 21);
      yield* this.setXSetYCostume(-1, -2, 1);
      yield* this.setXSetYCostume(-4, -2, 11);
      yield* this.setXSetYCostume(-5, -2, 3);
      yield* this.setXSetYCostume(-5, -1, 8);
      yield* this.setXSetYCostume(-5, 0, 9);
      yield* this.setXSetYCostume(-3, 0, 9);
      yield* this.setXSetYCostume(-3, 2, 4);
      yield* this.setXSetYCostume(-2, 2, 10);
      yield* this.setXSetYCostume(-2, 1, 1);
      yield* this.setXSetYCostume(-4, 1, 12);
      yield* this.setXSetYCostume(-6, 1, 2);
      yield* this.setXSetYCostume(-6, -2, 12);
      yield* this.setXSetYCostume(-6, -3, 1);
      yield* this.setXSetYCostume(-4, -3, 9);
      yield* this.setXSetYCostume(-2, -3, 12);
      yield* this.setXSetYCostume(0, -3, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 18) {
      yield* this.setXSetYCostume(0, -2, 1);
      yield* this.setXSetYCostume(-2, -2, 2);
      yield* this.setXSetYCostume(-2, 0, 12);
      yield* this.setXSetYCostume(0, 0, 7);
      yield* this.setXSetYCostume(2, 0, 2);
      yield* this.setXSetYCostume(2, -1, 4);
      yield* this.setXSetYCostume(3, -1, 39);
      yield* this.setXSetYCostume(-1, 3, 39);
      yield* this.setXSetYCostume(-2, 3, 3);
      yield* this.setXSetYCostume(-2, 2, 11);
      yield* this.setXSetYCostume(0, 2, 2);
      yield* this.setXSetYCostume(0, 2, 13);
      yield* this.setXSetYCostume(0, 3, 10);
      yield* this.setXSetYCostume(1, 3, 40);
      yield* this.setXSetYCostume(-5, -2, 40);
      yield* this.setXSetYCostume(-6, -2, 3);
      yield* this.setXSetYCostume(-6, -2, 8);
      yield* this.setXSetYCostume(-6, -1, 1);
      yield* this.setXSetYCostume(-5, -1, 4);
      yield* this.setXSetYCostume(-5, -1, 14);
      yield* this.setXSetYCostume(-5, 0, 9);
      yield* this.setXSetYCostume(-5, 1, 10);
      yield* this.setXSetYCostume(-4, 1, 13);
      yield* this.setXSetYCostume(5, 1, 1);
      yield* this.setXSetYCostume(5, 0, 11);
      yield* this.setXSetYCostume(4, 0, 1);
      yield* this.setXSetYCostume(4, 2, 11);
      yield* this.setXSetYCostume(5, 2, 12);
      yield* this.setXSetYCostume(6, 2, 4);
      yield* this.setXSetYCostume(6, -1, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 19) {
      yield* this.setXSetYCostume(-1, 0, 14);
      yield* this.setXSetYCostume(-1, 1, 14);
      yield* this.setXSetYCostume(-1, 2, 1);
      yield* this.setXSetYCostume(1, 2, 20);
      yield* this.setXSetYCostume(2, 2, 3);
      yield* this.setXSetYCostume(2, 1, 8);
      yield* this.setXSetYCostume(2, 0, 9);
      yield* this.setXSetYCostume(2, -1, 2);
      yield* this.setXSetYCostume(4, -1, 2);
      yield* this.setXSetYCostume(4, -1, 12);
      yield* this.setXSetYCostume(4, 0, 2);
      yield* this.setXSetYCostume(3, 0, 11);
      yield* this.setXSetYCostume(3, 1, 3);
      yield* this.setXSetYCostume(5, 1, 10);
      yield* this.setXSetYCostume(6, 1, 4);
      yield* this.setXSetYCostume(6, -1, 1);
      yield* this.setXSetYCostume(6, -1, 10);
      yield* this.setXSetYCostume(5, -1, 1);
      yield* this.setXSetYCostume(5, 0, 40);
      yield* this.setXSetYCostume(-1, -2, 39);
      yield* this.setXSetYCostume(-2, -2, 7);
      yield* this.setXSetYCostume(-3, -2, 3);
      yield* this.setXSetYCostume(-3, -1, 11);
      yield* this.setXSetYCostume(-3, 1, 16);
      yield* this.setXSetYCostume(-6, 1, 18);
      yield* this.setXSetYCostume(-6, -2, 9);
      yield* this.setXSetYCostume(-2, 1, 15);
    }
    if (this.toNumber(this.stage.vars.level) === 20) {
      yield* this.setXSetYCostume(1, 3, 20);
      yield* this.setXSetYCostume(3, 3, 2);
      yield* this.setXSetYCostume(3, 1, 7);
      yield* this.setXSetYCostume(3, 0, 3);
      yield* this.setXSetYCostume(2, 0, 11);
      yield* this.setXSetYCostume(0, 0, 16);
      yield* this.setXSetYCostume(0, 2, 9);
      yield* this.setXSetYCostume(-1, 0, 1);
      yield* this.setXSetYCostume(-1, -1, 10);
      yield* this.setXSetYCostume(4, -1, 2);
      yield* this.setXSetYCostume(4, 1, 2);
      yield* this.setXSetYCostume(5, 1, 12);
      yield* this.setXSetYCostume(5, 0, 39);
      yield* this.setXSetYCostume(-6, -3, 40);
      yield* this.setXSetYCostume(-6, -2, 6);
      yield* this.setXSetYCostume(-4, 0, 16);
      yield* this.setXSetYCostume(-4, -2, 3);
      yield* this.setXSetYCostume(-2, -2, 11);
      yield* this.setXSetYCostume(-2, 3, 4);
      yield* this.setXSetYCostume(-4, 3, 1);
      yield* this.setXSetYCostume(-4, 2, 10);
      yield* this.setXSetYCostume(-6, 0, 2);
      yield* this.setXSetYCostume(-6, 1, 15);
    }
    this.costume = "Null";
    yield* this.wait(0.5);
    for (let i = 0; i < this.stage.vars.positions.length; i++) {
      this.stage.vars.clone++;
      this.createClone();
      yield* this.startSound("notifications-sound-127856");
      yield* this.wait(0.02);
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.stage.vars.clone = 0;
    this.stage.vars.level = 0;
    this.stage.vars.levelScore = 0;
    this.stage.vars.repeating = "No";
    this.stage.vars.repating2 = "No";
    this.stage.vars.alternating = "No";
    this.stage.vars.clicks = 0;
    this.direction = 90;
    this.goto(0, 0);
    this.costume = "Null";
    this.visible = false;
  }

  *setXSetYCostume(x, y, costume) {
    this.stage.vars.positions.push(
      this.toString(x) + (this.toString(y) + this.toString(costume))
    );
  }

  *startAsClone2() {
    while (true) {
      if (
        this.mouse.down &&
        this.compare(
          Math.hypot(this.mouse.x - this.x, this.mouse.y - this.y),
          15
        ) < 0
      ) {
        while (!!this.mouse.down) {
          yield;
        }
        this.stage.vars.clicks++;
        this.size = 25;
        if (this.toNumber(this.stage.vars.helpClones) === 0) {
          if (
            (this.compare(this.costumeNumber, 15) > 0 &&
              this.compare(this.costumeNumber, 20) < 0) ||
            (this.compare(this.costumeNumber, 24) > 0 &&
              this.compare(this.costumeNumber, 33) < 0)
          ) {
            if (this.costumeNumber === 19) {
              this.costume = 16;
            } else {
              if (this.costumeNumber === 23) {
                this.costume = 20;
              } else {
                if (this.costumeNumber === 28) {
                  this.costume = 25;
                } else {
                  if (this.costumeNumber === 32) {
                    this.costume = 29;
                  } else {
                    this.costumeNumber++;
                  }
                }
              }
            }
          } else {
            if (this.toString(this.stage.vars.runLine) === "No") {
              if (this.toString(this.stage.vars.running) === "No") {
                if (this.costumeNumber === 4) {
                  this.costume = 1;
                } else {
                  if (this.costumeNumber === 6) {
                    this.costume = 5;
                  } else {
                    if (this.costumeNumber === 7) {
                      null;
                    } else {
                      if (this.costumeNumber === 8) {
                        null;
                      } else {
                        if (this.costumeNumber === 12) {
                          this.costume = 9;
                        } else {
                          if (
                            this.costumeNumber === 13 ||
                            this.costumeNumber === 14
                          ) {
                            null;
                          } else {
                            if (this.costumeNumber === 15) {
                              null;
                            } else {
                              if (this.costumeNumber === 19) {
                                this.costume = 16;
                              } else {
                                if (this.costumeNumber === 20) {
                                  null;
                                } else {
                                  if (this.costumeNumber === 21) {
                                    null;
                                  } else {
                                    if (this.costumeNumber === 22) {
                                      null;
                                    } else {
                                      if (this.costumeNumber === 23) {
                                        null;
                                      } else {
                                        if (this.costumeNumber === 24) {
                                          null;
                                        } else {
                                          if (this.costumeNumber === 28) {
                                            this.costume = 25;
                                          } else {
                                            if (this.costumeNumber === 32) {
                                              this.costume = 29;
                                            } else {
                                              if (this.costumeNumber === 39) {
                                                this.costume = 40;
                                              } else {
                                                if (this.costumeNumber === 40) {
                                                  this.costume = 39;
                                                } else {
                                                  this.costumeNumber++;
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

  *startAsClone3() {
    while (true) {
      if (
        this.mouse.down &&
        this.compare(
          Math.hypot(this.mouse.x - this.x, this.mouse.y - this.y),
          15
        ) < 0
      ) {
        while (!!this.mouse.down) {
          yield;
        }
        if (
          this.compare(this.costumeNumber, 15) > 0 &&
          this.compare(this.costumeNumber, 20) < 0
        ) {
          if (
            this.toString(this.stage.vars.running) === "No" &&
            this.toNumber(this.stage.vars.helpClones) === 0
          ) {
            yield* this.sound();
          }
        } else {
          if (
            this.toString(this.stage.vars.running) === "No" &&
            this.toNumber(this.stage.vars.helpClones) === 0
          ) {
            yield* this.sound();
          }
        }
      }
      yield;
    }
  }

  *whenIReceiveNextLevel2() {
    this.deleteThisClone();
  }

  *sound() {
    if (
      this.costumeNumber === 1 ||
      this.costumeNumber === 2 ||
      this.costumeNumber === 3 ||
      this.costumeNumber === 4
    ) {
      yield* this.startSound(
        this.itemOf(this.stage.vars.ricochet, this.stage.vars.level - 1)
      );
    } else {
      if (this.costumeNumber === 5 || this.costumeNumber === 6) {
        yield* this.startSound(
          this.itemOf(this.stage.vars.timedTunnel, this.stage.vars.level - 1)
        );
      } else {
        if (this.costumeNumber === 7) {
          if (this.toString(this.stage.vars.running) === "Yes") {
            if (this.toString(this.stage.vars.repeating) === "No") {
              this.stage.vars.alternating = "Yes";
              this.stage.vars.repeating = "Yes";
              this.createClone();
            }
          } else {
            yield* this.startSound(
              this.itemOf(this.stage.vars.repeat, this.stage.vars.level - 1)
            );
          }
        } else {
          if (this.costumeNumber === 8) {
            if (this.toString(this.stage.vars.running) === "Yes") {
              if (this.toString(this.stage.vars.repating2) === "No") {
                this.stage.vars.repating2 = "Yes";
                this.createClone();
              }
            } else {
              yield* this.startSound(
                this.itemOf(this.stage.vars.repeat2, this.stage.vars.level - 1)
              );
            }
          } else {
            if (
              this.costumeNumber === 9 ||
              this.costumeNumber === 10 ||
              this.costumeNumber === 11 ||
              this.costumeNumber === 12
            ) {
              yield* this.startSound(
                this.itemOf(this.stage.vars.redirect, this.stage.vars.level - 1)
              );
            } else {
              if (this.costumeNumber === 13 || this.costumeNumber === 14) {
                yield* this.startSound(
                  this.itemOf(this.stage.vars.tick, this.stage.vars.level - 1)
                );
              } else {
                if (this.costumeNumber === 15) {
                  yield* this.startSound("Fanfare");
                } else {
                  if (
                    (this.compare(this.costumeNumber, 15) > 0 &&
                      this.compare(this.costumeNumber, 20) < 0) ||
                    (this.compare(this.costumeNumber, 24) > 0 &&
                      this.compare(this.costumeNumber, 37) < 0)
                  ) {
                    yield* this.startSound(
                      this.itemOf(
                        this.stage.vars.freeform,
                        this.stage.vars.level - 1
                      )
                    );
                  } else {
                    if (
                      this.compare(this.costumeNumber, 19) > 0 &&
                      this.compare(this.costumeNumber, 24) < 0
                    ) {
                      yield* this.startSound(
                        this.itemOf(
                          this.stage.vars.speedUp,
                          this.stage.vars.level - 1
                        )
                      );
                    } else {
                      if (
                        this.costumeNumber === 39 ||
                        this.costumeNumber === 40
                      ) {
                        yield* this.startSound(
                          this.itemOf(
                            this.stage.vars.transfer,
                            this.stage.vars.level - 1
                          )
                        );
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

  *turn() {
    if (this.costumeNumber === 1) {
      this.broadcast("Pulse");
      if (this.sprites["PlayerArrow"].direction === 180) {
        this.broadcast("Right");
        this.broadcast("Point");
        this.broadcast("Ripple");
        this.stage.vars.score += 100;
        this.stage.vars.levelScore += 100;
      } else {
        if (this.sprites["PlayerArrow"].direction === -90) {
          this.broadcast("Up");
          this.broadcast("Point");
          this.broadcast("Ripple");
          this.stage.vars.score += 100;
          this.stage.vars.levelScore += 100;
        } else {
          if (this.sprites["PlayerArrow"].direction === -135) {
            this.broadcast("Top Right");
            this.broadcast("Point");
            this.broadcast("Ripple");
            this.stage.vars.score += 100;
            this.stage.vars.levelScore += 100;
          } else {
            null;
          }
        }
      }
      this.broadcast("Shrink");
    } else {
      if (this.costumeNumber === 2) {
        this.broadcast("Pulse");
        if (this.sprites["PlayerArrow"].direction === 0) {
          this.broadcast("Right");
          this.broadcast("Point");
          this.broadcast("Ripple");
          this.stage.vars.score += 100;
          this.stage.vars.levelScore += 100;
        } else {
          if (this.sprites["PlayerArrow"].direction === -90) {
            this.broadcast("Down");
            this.broadcast("Point");
            this.broadcast("Ripple");
            this.stage.vars.score += 100;
            this.stage.vars.levelScore += 100;
          } else {
            if (this.sprites["PlayerArrow"].direction === -45) {
              this.broadcast("Bottom Right");
              this.broadcast("Point");
              this.broadcast("Ripple");
              this.stage.vars.score += 100;
              this.stage.vars.levelScore += 100;
            } else {
              null;
            }
          }
        }
        this.broadcast("Shrink");
      } else {
        if (this.costumeNumber === 3) {
          this.broadcast("Pulse");
          if (this.sprites["PlayerArrow"].direction === 0) {
            this.broadcast("Left");
            this.broadcast("Point");
            this.broadcast("Ripple");
            this.stage.vars.score += 100;
            this.stage.vars.levelScore += 100;
          } else {
            if (this.sprites["PlayerArrow"].direction === 90) {
              this.broadcast("Down");
              this.broadcast("Point");
              this.broadcast("Ripple");
              this.stage.vars.score += 100;
              this.stage.vars.levelScore += 100;
            } else {
              if (this.sprites["PlayerArrow"].direction === 45) {
                this.broadcast("Bottom Left");
                this.broadcast("Point");
                this.broadcast("Ripple");
                this.stage.vars.score += 100;
                this.stage.vars.levelScore += 100;
              } else {
                null;
              }
            }
          }
          this.broadcast("Shrink");
        } else {
          if (this.costumeNumber === 4) {
            this.broadcast("Pulse");
            if (this.sprites["PlayerArrow"].direction === 90) {
              this.broadcast("Up");
              this.broadcast("Point");
              this.broadcast("Ripple");
              this.stage.vars.score += 100;
              this.stage.vars.levelScore += 100;
            } else {
              if (this.sprites["PlayerArrow"].direction === 180) {
                this.broadcast("Left");
                this.broadcast("Point");
                this.broadcast("Ripple");
                this.stage.vars.score += 100;
                this.stage.vars.levelScore += 100;
              } else {
                if (this.sprites["PlayerArrow"].direction === 135) {
                  this.broadcast("Top Left");
                  this.broadcast("Point");
                  this.broadcast("Ripple");
                  this.stage.vars.score += 100;
                  this.stage.vars.levelScore += 100;
                } else {
                  null;
                }
              }
            }
            this.broadcast("Shrink");
          } else {
            if (this.costumeNumber === 5) {
              if (this.sprites["PlayerArrow"].direction === 0) {
                this.broadcast("Top Right");
                this.broadcast("Point");
                this.broadcast("Ripple");
                this.stage.vars.score += 150;
                this.stage.vars.levelScore += 150;
              } else {
                if (this.sprites["PlayerArrow"].direction === 90) {
                  this.broadcast("Top Right");
                  this.broadcast("Point");
                  this.broadcast("Ripple");
                  this.stage.vars.score += 150;
                  this.stage.vars.levelScore += 150;
                } else {
                  if (this.sprites["PlayerArrow"].direction === 180) {
                    this.broadcast("Bottom Left");
                    this.broadcast("Point");
                    this.broadcast("Ripple");
                    this.stage.vars.score += 150;
                    this.stage.vars.levelScore += 150;
                  } else {
                    if (this.sprites["PlayerArrow"].direction === -90) {
                      this.broadcast("Bottom Left");
                      this.broadcast("Point");
                      this.broadcast("Ripple");
                      this.stage.vars.score += 150;
                      this.stage.vars.levelScore += 150;
                    } else {
                      if (this.sprites["PlayerArrow"].direction === 45) {
                        this.broadcast("Top Right");
                        this.broadcast("Point");
                        this.broadcast("Ripple");
                        this.stage.vars.score += 150;
                        this.stage.vars.levelScore += 150;
                      } else {
                        if (this.sprites["PlayerArrow"].direction === -135) {
                          this.broadcast("Bottom Left");
                          this.broadcast("Point");
                          this.broadcast("Ripple");
                          this.stage.vars.score += 150;
                          this.stage.vars.levelScore += 150;
                        } else {
                          null;
                        }
                      }
                    }
                  }
                }
              }
              this.broadcast("Shrink");
            } else {
              if (this.costumeNumber === 6) {
                if (this.sprites["PlayerArrow"].direction === 0) {
                  this.broadcast("Top Left");
                  this.broadcast("Point");
                  this.broadcast("Ripple");
                  this.stage.vars.score += 150;
                  this.stage.vars.levelScore += 150;
                } else {
                  if (this.sprites["PlayerArrow"].direction === 90) {
                    this.broadcast("Bottom Right");
                    this.broadcast("Point");
                    this.broadcast("Ripple");
                    this.stage.vars.score += 150;
                    this.stage.vars.levelScore += 150;
                  } else {
                    if (this.sprites["PlayerArrow"].direction === 180) {
                      this.broadcast("Bottom Right");
                      this.broadcast("Point");
                      this.broadcast("Ripple");
                      this.stage.vars.score += 150;
                      this.stage.vars.levelScore += 150;
                    } else {
                      if (this.sprites["PlayerArrow"].direction === -90) {
                        this.broadcast("Top Left");
                        this.broadcast("Point");
                        this.broadcast("Ripple");
                        this.stage.vars.score += 150;
                        this.stage.vars.levelScore += 150;
                      } else {
                        if (this.sprites["PlayerArrow"].direction === -45) {
                          this.broadcast("Top Left");
                          this.broadcast("Point");
                          this.broadcast("Ripple");
                          this.stage.vars.score += 150;
                          this.stage.vars.levelScore += 150;
                        } else {
                          if (this.sprites["PlayerArrow"].direction === 135) {
                            this.broadcast("Bottom Right");
                            this.broadcast("Point");
                            this.broadcast("Ripple");
                            this.stage.vars.score += 150;
                            this.stage.vars.levelScore += 150;
                          } else {
                            null;
                          }
                        }
                      }
                    }
                  }
                }
                this.broadcast("Shrink");
              } else {
                if (this.costumeNumber === 9) {
                  this.broadcast("Left");
                  this.broadcast("Point");
                  this.broadcast("Ripple");
                  this.stage.vars.score += 75;
                  this.stage.vars.levelScore += 75;
                  this.broadcast("Shrink");
                } else {
                  if (this.costumeNumber === 10) {
                    this.broadcast("Up");
                    this.broadcast("Point");
                    this.broadcast("Ripple");
                    this.stage.vars.score += 75;
                    this.stage.vars.levelScore += 75;
                    this.broadcast("Shrink");
                  } else {
                    if (this.costumeNumber === 11) {
                      this.broadcast("Right");
                      this.broadcast("Point");
                      this.broadcast("Ripple");
                      this.stage.vars.score += 75;
                      this.stage.vars.levelScore += 75;
                      this.broadcast("Shrink");
                    } else {
                      if (this.costumeNumber === 12) {
                        this.broadcast("Down");
                        this.broadcast("Point");
                        this.broadcast("Ripple");
                        this.stage.vars.score += 75;
                        this.stage.vars.levelScore += 75;
                        this.broadcast("Shrink");
                      } else {
                        if (this.costumeNumber === 13) {
                          this.broadcast("Point");
                          this.stage.vars.score += 10;
                          this.stage.vars.levelScore += 10;
                        } else {
                          if (this.costumeNumber === 14) {
                            this.broadcast("Point");
                            this.stage.vars.score += 10;
                            this.stage.vars.levelScore += 10;
                          } else {
                            if (this.costumeNumber === 15) {
                              this.stage.vars.redoEnabled = "No";
                              this.broadcast("Done");
                            } else {
                              if (
                                this.costumeNumber === 16 ||
                                this.costumeNumber === 25 ||
                                this.costumeNumber === 29
                              ) {
                                this.broadcast("Up");
                                this.broadcast("Point");
                                this.broadcast("Ripple");
                                this.stage.vars.score += 80;
                                this.stage.vars.levelScore += 80;
                                this.broadcast("Shrink");
                                if (this.costumeNumber === 16) {
                                  this.costume = 25;
                                } else {
                                  this.costume = this.costumeNumber + 4;
                                }
                                if (this.costumeNumber === 33) {
                                  this.effects.ghost = 65;
                                }
                              } else {
                                if (
                                  this.costumeNumber === 17 ||
                                  this.costumeNumber === 26 ||
                                  this.costumeNumber === 30
                                ) {
                                  this.broadcast("Right");
                                  this.broadcast("Point");
                                  this.broadcast("Ripple");
                                  this.stage.vars.score += 80;
                                  this.stage.vars.levelScore += 80;
                                  this.broadcast("Shrink");
                                  if (this.costumeNumber === 17) {
                                    this.costume = 26;
                                  } else {
                                    this.costume = this.costumeNumber + 4;
                                  }
                                  if (this.costumeNumber === 34) {
                                    this.effects.ghost = 65;
                                  }
                                } else {
                                  if (
                                    this.costumeNumber === 18 ||
                                    this.costumeNumber === 27 ||
                                    this.costumeNumber === 31
                                  ) {
                                    this.broadcast("Down");
                                    this.broadcast("Point");
                                    this.broadcast("Ripple");
                                    this.stage.vars.score += 80;
                                    this.stage.vars.levelScore += 80;
                                    this.broadcast("Shrink");
                                    if (this.costumeNumber === 18) {
                                      this.costume = 27;
                                    } else {
                                      this.costume = this.costumeNumber + 4;
                                    }
                                    if (this.costumeNumber === 35) {
                                      this.effects.ghost = 65;
                                    }
                                  } else {
                                    if (
                                      this.costumeNumber === 19 ||
                                      this.costumeNumber === 28 ||
                                      this.costumeNumber === 32
                                    ) {
                                      this.broadcast("Left");
                                      this.broadcast("Point");
                                      this.broadcast("Ripple");
                                      this.stage.vars.score += 80;
                                      this.stage.vars.levelScore += 80;
                                      this.broadcast("Shrink");
                                      if (this.costumeNumber === 19) {
                                        this.costume = 28;
                                      } else {
                                        this.costume = this.costumeNumber + 4;
                                      }
                                      if (this.costumeNumber === 36) {
                                        this.effects.ghost = 65;
                                      }
                                    } else {
                                      if (this.costumeNumber === 20) {
                                        if (
                                          this.sprites["PlayerArrow"]
                                            .direction === 90
                                        ) {
                                          this.broadcast("Speed");
                                          this.broadcast("Point");
                                          this.broadcast("Ripple");
                                          this.stage.vars.score += 180;
                                          this.stage.vars.levelScore += 180;
                                        } else {
                                          null;
                                        }
                                      } else {
                                        if (this.costumeNumber === 21) {
                                          if (
                                            this.sprites["PlayerArrow"]
                                              .direction === 180
                                          ) {
                                            this.broadcast("Speed");
                                            this.broadcast("Point");
                                            this.broadcast("Ripple");
                                            this.stage.vars.score += 180;
                                            this.stage.vars.levelScore += 180;
                                          } else {
                                            null;
                                          }
                                        } else {
                                          if (this.costumeNumber === 22) {
                                            if (
                                              this.sprites["PlayerArrow"]
                                                .direction === -90
                                            ) {
                                              this.broadcast("Speed");
                                              this.broadcast("Point");
                                              this.broadcast("Ripple");
                                              this.stage.vars.score += 180;
                                              this.stage.vars.levelScore += 180;
                                            } else {
                                              null;
                                            }
                                          } else {
                                            if (this.costumeNumber === 23) {
                                              if (
                                                this.sprites["PlayerArrow"]
                                                  .direction === 0
                                              ) {
                                                this.broadcast("Speed");
                                                this.broadcast("Point");
                                                this.broadcast("Ripple");
                                                this.stage.vars.score += 180;
                                                this.stage.vars.levelScore += 180;
                                              } else {
                                                null;
                                              }
                                            } else {
                                              if (
                                                this.costumeNumber === 25 ||
                                                this.costumeNumber === 26 ||
                                                this.costumeNumber === 27 ||
                                                this.costumeNumber === 28
                                              ) {
                                                null;
                                              } else {
                                                if (this.costumeNumber === 39) {
                                                  if (
                                                    this.sprites["PlayerArrow"]
                                                      .direction === 0
                                                  ) {
                                                    this.broadcast("Transfer");
                                                    this.broadcast("Point");
                                                    this.broadcast("Ripple");
                                                    this.stage.vars.score += 125;
                                                    this.stage.vars.levelScore += 125;
                                                  } else {
                                                    if (
                                                      this.sprites[
                                                        "PlayerArrow"
                                                      ].direction === 180
                                                    ) {
                                                      this.broadcast(
                                                        "Transfer"
                                                      );
                                                      this.broadcast("Point");
                                                      this.broadcast("Ripple");
                                                      this.stage.vars.score += 125;
                                                      this.stage.vars.levelScore += 125;
                                                    } else {
                                                      null;
                                                    }
                                                  }
                                                } else {
                                                  if (
                                                    this.costumeNumber === 40
                                                  ) {
                                                    if (
                                                      this.sprites[
                                                        "PlayerArrow"
                                                      ].direction === 90
                                                    ) {
                                                      this.broadcast(
                                                        "Transfer"
                                                      );
                                                      this.broadcast("Point");
                                                      this.broadcast("Ripple");
                                                      this.stage.vars.score += 125;
                                                      this.stage.vars.levelScore += 125;
                                                    } else {
                                                      if (
                                                        this.sprites[
                                                          "PlayerArrow"
                                                        ].direction === -90
                                                      ) {
                                                        this.broadcast(
                                                          "Transfer"
                                                        );
                                                        this.broadcast("Point");
                                                        this.broadcast(
                                                          "Ripple"
                                                        );
                                                        this.stage.vars.score += 125;
                                                        this.stage.vars.levelScore += 125;
                                                      } else {
                                                        null;
                                                      }
                                                    }
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
    this.effects.brightness = 0;
  }

  *lightUp() {
    this.vars.hasThisOneBeenTouched = 0;
    if (!(this.costumeNumber === 7 || this.costumeNumber === 8)) {
      this.effects.brightness = 84;
      for (let i = 0; i < 6; i++) {
        this.effects.brightness -= 14;
        yield;
      }
      this.effects.brightness = 0;
    }
  }

  *whenIReceiveRun() {
    this.stage.vars.running = "Yes";
    this.stage.vars.available = "Yes";
    while (!(this.toString(this.stage.vars.running) === "No")) {
      if (
        this.compare(
          Math.round(this.x / 28) * 28,
          Math.round(this.sprites["PlayerArrow"].x)
        ) === 0 &&
        this.compare(
          Math.round(this.y / 28) * 28,
          Math.round(this.sprites["PlayerArrow"].y)
        ) === 0
      ) {
        this.stage.vars.available = "No";
        yield* this.turn();
        yield* this.sound();
        yield* this.lightUp();
        if (
          Math.round(this.x / 28).length === 1 &&
          Math.round(this.y / 28).length === 1
        ) {
          while (
            !!(
              this.compare(
                "0" +
                  (this.toString(Math.round(this.x / 28)) +
                    ("0" + this.toString(Math.round(this.y / 28)))),
                this.stage.vars.playerLocation
              ) === 0
            )
          ) {
            yield;
          }
        } else {
          if (
            !(Math.round(this.x / 28).length === 1) &&
            !(Math.round(this.y / 28).length === 1)
          ) {
            while (
              !!(
                this.compare(
                  this.toString(Math.round(this.x / 28)) +
                    this.toString(Math.round(this.y / 28)),
                  this.stage.vars.playerLocation
                ) === 0
              )
            ) {
              yield;
            }
          } else {
            if (
              !(Math.round(this.x / 28).length === 1) &&
              Math.round(this.y / 28).length === 1
            ) {
              while (
                !!(
                  this.compare(
                    this.toString(Math.round(this.x / 28)) +
                      ("0" + this.toString(Math.round(this.y / 28))),
                    this.stage.vars.playerLocation
                  ) === 0
                )
              ) {
                yield;
              }
            } else {
              if (
                Math.round(this.x / 28).length === 1 &&
                !(Math.round(this.y / 28).length === 1)
              ) {
                while (
                  !!(
                    this.compare(
                      "0" +
                        (this.toString(Math.round(this.x / 28)) +
                          this.toString(Math.round(this.y / 28))),
                      this.stage.vars.playerLocation
                    ) === 0
                  )
                ) {
                  yield;
                }
              }
            }
          }
        }
        this.stage.vars.available = "Yes";
      }
      yield;
    }
  }

  *startAsClone4() {
    if (this.toString(this.stage.vars.repeating) === "Yes") {
      if (this.costumeNumber === 7) {
        this.goto(this.sprites["PlayerArrow"].x, this.sprites["PlayerArrow"].y);
        this.costume = 37;
        this.visible = false;
        while (!(this.toString(this.stage.vars.running) === "No")) {
          if (
            this.compare(
              Math.round(this.x / 28) * 28,
              Math.round(this.sprites["PlayerArrow"].x)
            ) === 0 &&
            this.compare(
              Math.round(this.y / 28) * 28,
              Math.round(this.sprites["PlayerArrow"].y)
            ) === 0
          ) {
            if (this.toString(this.stage.vars.alternating) === "Yes") {
              yield* this.startSound(
                this.itemOf(this.stage.vars.repeat, this.stage.vars.level - 1)
              );
              this.effects.clear();
              this.broadcast("Repeat Light");
              yield* this.wait(0.001);
              this.broadcast("Repeat Point");
              this.stage.vars.score += 15;
              this.stage.vars.levelScore += 15;
              this.stage.vars.alternating = "No";
            } else {
              this.stage.vars.alternating = "Yes";
            }
            while (
              !!(
                this.compare(
                  Math.round(this.x / 28) * 28,
                  Math.round(this.sprites["PlayerArrow"].x)
                ) === 0 &&
                this.compare(
                  Math.round(this.y / 28) * 28,
                  Math.round(this.sprites["PlayerArrow"].y)
                ) === 0
              )
            ) {
              yield;
            }
            this.direction = this.sprites["PlayerArrow"].direction;
            if (
              this.sprites["PlayerArrow"].direction === 45 ||
              this.sprites["PlayerArrow"].direction === -45 ||
              this.sprites["PlayerArrow"].direction === 135 ||
              this.sprites["PlayerArrow"].direction === -135
            ) {
              this.move(39.6);
            } else {
              this.move(28);
            }
          }
          yield;
        }
      }
    }
  }

  *whenIReceiveRepeatLight() {
    if (this.costumeNumber === 7) {
      if (this.toString(this.stage.vars.repeating) === "Yes") {
        if (this.toString(this.stage.vars.alternating) === "Yes") {
          while (!(this.toString(this.stage.vars.alternating) === "No")) {
            yield;
          }
        } else {
          null;
        }
        this.effects.brightness = 84;
        for (let i = 0; i < 6; i++) {
          this.effects.brightness -= 14;
          yield;
        }
        this.effects.brightness = 0;
      }
    } else {
      if (this.costumeNumber === 8) {
        if (this.toString(this.stage.vars.repating2) === "Yes") {
          this.effects.brightness = 84;
          for (let i = 0; i < 6; i++) {
            this.effects.brightness -= 14;
            yield;
          }
          this.effects.brightness = 0;
        }
      }
    }
  }

  *startAsClone5() {
    if (this.toString(this.stage.vars.repating2) === "Yes") {
      if (this.costumeNumber === 8) {
        this.goto(this.sprites["PlayerArrow"].x, this.sprites["PlayerArrow"].y);
        this.costume = 38;
        this.visible = false;
        while (!(this.toString(this.stage.vars.running) === "No")) {
          if (
            this.compare(
              Math.round(this.x / 28) * 28,
              Math.round(this.sprites["PlayerArrow"].x)
            ) === 0 &&
            this.compare(
              Math.round(this.y / 28) * 28,
              Math.round(this.sprites["PlayerArrow"].y)
            ) === 0
          ) {
            yield* this.startSound(
              this.itemOf(this.stage.vars.repeat2, this.stage.vars.level - 1)
            );
            this.effects.clear();
            this.broadcast("Repeat Light");
            yield* this.wait(0.001);
            this.broadcast("Repeat Point");
            this.stage.vars.score += 15;
            this.stage.vars.levelScore += 15;
            while (
              !!(
                this.compare(
                  Math.round(this.x / 28) * 28,
                  Math.round(this.sprites["PlayerArrow"].x)
                ) === 0 &&
                this.compare(
                  Math.round(this.y / 28) * 28,
                  Math.round(this.sprites["PlayerArrow"].y)
                ) === 0
              )
            ) {
              yield;
            }
            this.direction = this.sprites["PlayerArrow"].direction;
            if (
              this.sprites["PlayerArrow"].direction === 45 ||
              this.sprites["PlayerArrow"].direction === -45 ||
              this.sprites["PlayerArrow"].direction === 135 ||
              this.sprites["PlayerArrow"].direction === -135
            ) {
              this.move(39.6);
            } else {
              this.move(28);
            }
          }
          yield;
        }
      }
    }
  }

  *whenIReceiveRestart() {
    this.vars.hasThisOneBeenTouched = 1;
    this.stage.vars.repeating = "No";
    this.stage.vars.repating2 = "No";
    this.stage.vars.alternating = "No";
    if (this.costumeNumber === 37 || this.costumeNumber === 38) {
      this.deleteThisClone();
    }
    this.visible = true;
    this.effects.clear();
    this.moveAhead();
    this.size = 0;
  }

  *whenIReceiveHelp() {
    this.visible = false;
  }

  *whenIReceiveReturnGame() {
    if (!(this.costume.name === "Null")) {
      yield* this.wait(0.4);
      this.size = 0;
      this.visible = true;
      if (this.toNumber(this.stage.vars.line) === 3) {
        this.stage.vars.ready = "Yes";
      }
    }
  }

  *lightUpLeftovers() {
    yield* this.startSound(
      "zapsplat_multimedia_alert_mallet_wood_simple_musical_negative_001_65490"
    );
    this.effects.brightness = 84;
    for (let i = 0; i < 6; i++) {
      this.effects.brightness -= 14;
      yield;
    }
  }

  *whenIReceiveHaveAllBeenTouched() {
    if (
      this.costume.name === "Null" ||
      this.costumeNumber === 37 ||
      this.costumeNumber === 38
    ) {
      this.deleteThisClone();
    } else {
      this.stage.vars.haveAllBeenTouched += this.toNumber(
        this.vars.hasThisOneBeenTouched
      );
    }
  }

  *whenIReceiveLightUpLeftovers() {
    for (let i = 0; i < 5; i++) {
      if (this.toNumber(this.vars.hasThisOneBeenTouched) === 1) {
        yield* this.lightUpLeftovers();
      }
      yield;
    }
  }

  *whenIReceiveShowClones() {
    this.costume = 1;
    this.visible = true;
  }

  *whenIReceiveRestart2() {
    this.effects.ghost = 0;
    if (
      this.costumeNumber === 25 ||
      this.costumeNumber === 29 ||
      this.costumeNumber === 33
    ) {
      this.costume = 16;
    } else {
      if (
        this.costumeNumber === 26 ||
        this.costumeNumber === 30 ||
        this.costumeNumber === 34
      ) {
        this.costume = 17;
      } else {
        if (
          this.costumeNumber === 27 ||
          this.costumeNumber === 31 ||
          this.costumeNumber === 35
        ) {
          this.costume = 18;
        } else {
          if (
            this.costumeNumber === 28 ||
            this.costumeNumber === 32 ||
            this.costumeNumber === 36
          ) {
            this.costume = 19;
          } else {
            null;
          }
        }
      }
    }
  }

  *whenIReceiveRestart3() {
    yield* this.wait(0.001);
    if (
      this.costumeNumber === 13 ||
      this.costumeNumber === 14 ||
      this.costumeNumber === 7 ||
      this.costumeNumber === 8 ||
      (this.compare(this.costumeNumber, 8) > 0 &&
        this.compare(this.costumeNumber, 13) < 0)
    ) {
      this.moveAhead();
    }
  }

  *whenIReceiveTransferRepeat() {
    if (this.toString(this.stage.vars.repeating) === "Yes") {
      if (this.costumeNumber === 37) {
        this.goto(this.sprites["PlayerArrow"].x, this.sprites["PlayerArrow"].y);
        this.direction = this.sprites["PlayerArrow"].direction;
      }
    }
    if (this.toString(this.stage.vars.repating2) === "Yes") {
      if (this.costumeNumber === 38) {
        this.goto(this.sprites["PlayerArrow"].x, this.sprites["PlayerArrow"].y);
        this.direction = this.sprites["PlayerArrow"].direction;
      }
    }
  }

  *whenIReceiveOrient() {
    if (
      this.compare(
        Math.round(this.x / 28) * 28,
        Math.round(this.sprites["PlayerArrow"].x)
      ) === 0 &&
      this.compare(
        Math.round(this.y / 28) * 28,
        Math.round(this.sprites["PlayerArrow"].y)
      ) === 0
    ) {
      if (this.costumeNumber === 39) {
        if (
          this.sprites["PlayerArrow"].direction === 90 ||
          this.sprites["PlayerArrow"].direction === -90
        ) {
          this.broadcast("Orient Player");
        }
      } else {
        if (this.costumeNumber === 40) {
          if (
            this.sprites["PlayerArrow"].direction === 0 ||
            this.sprites["PlayerArrow"].direction === 180
          ) {
            this.broadcast("Orient Player");
          }
        } else {
          null;
        }
      }
      yield* this.lightUp();
    }
  }
}
