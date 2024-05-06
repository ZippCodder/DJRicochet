/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class PlayerArrow extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Player Arrow", "./PlayerArrow/costumes/Player Arrow.png", {
        x: 12,
        y: 18,
      }),
      new Costume("Trail 1", "./PlayerArrow/costumes/Trail 1.png", {
        x: 12,
        y: 14,
      }),
      new Costume("Trail 2", "./PlayerArrow/costumes/Trail 2.png", {
        x: 12,
        y: 14,
      }),
    ];

    this.sounds = [
      new Sound(
        "swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890",
        "./PlayerArrow/sounds/swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.wav"
      ),
      new Sound(
        "022120957-hotel-room-safe-card-swipe-unl",
        "./PlayerArrow/sounds/022120957-hotel-room-safe-card-swipe-unl.wav"
      ),
      new Sound(
        "tape-player-sounds-90780",
        "./PlayerArrow/sounds/tape-player-sounds-90780.wav"
      ),
    ];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Shrink" },
        this.whenIReceiveShrink
      ),
      new Trigger(Trigger.BROADCAST, { name: "Up" }, this.whenIReceiveUp),
      new Trigger(Trigger.BROADCAST, { name: "Right" }, this.whenIReceiveRight),
      new Trigger(Trigger.BROADCAST, { name: "Down" }, this.whenIReceiveDown),
      new Trigger(Trigger.BROADCAST, { name: "Left" }, this.whenIReceiveLeft),
      new Trigger(Trigger.BROADCAST, { name: "Run" }, this.whenIReceiveRun),
      new Trigger(Trigger.BROADCAST, { name: "Done" }, this.whenIReceiveDone),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "space" },
        this.whenKeySpacePressed
      ),
      new Trigger(Trigger.BROADCAST, { name: "Run" }, this.whenIReceiveRun2),
      new Trigger(Trigger.KEY_PRESSED, { key: "r" }, this.whenKeyRPressed),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Top Left" },
        this.whenIReceiveTopLeft
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Top Right" },
        this.whenIReceiveTopRight
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Bottom Right" },
        this.whenIReceiveBottomRight
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Bottom Left" },
        this.whenIReceiveBottomLeft
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Throw Off" },
        this.whenIReceiveThrowOff
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart" },
        this.whenIReceiveRestart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart" },
        this.whenIReceiveRestart2
      ),
      new Trigger(Trigger.BROADCAST, { name: "Help" }, this.whenIReceiveHelp),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Return Game" },
        this.whenIReceiveReturnGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Restart Was Pressed" },
        this.whenIReceiveRestartWasPressed
      ),
      new Trigger(Trigger.BROADCAST, { name: "Speed" }, this.whenIReceiveSpeed),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Transfer" },
        this.whenIReceiveTransfer
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Orient Player" },
        this.whenIReceiveOrientPlayer
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "End Screen" },
        this.whenIReceiveEndScreen
      ),
    ];
  }

  *startAsClone() {
    this.costume = "Trail " + this.toString(this.stage.vars.trailColor);
    this.direction = this.sprites["PlayerArrow"].direction;
    this.effects.clear();
    this.effects.brightness = 40;
    this.visible = true;
    this.size = 130;
    for (let i = 0; i < 10; i++) {
      this.size += (100 + this.size) / -20;
      this.effects.ghost += 7;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveNextLevel() {
    this.stage.vars.speed = 4;
    this.stage.vars.diagonalSpeed = 1.71428571429;
    this.goto(
      this.toNumber(
        this.letterOf(
          this.itemOf(this.stage.vars.startPosition, this.stage.vars.level - 1),
          0
        ) +
          this.letterOf(
            this.itemOf(
              this.stage.vars.startPosition,
              this.stage.vars.level - 1
            ),
            1
          )
      ) * 28,
      this.toNumber(
        this.letterOf(
          this.itemOf(this.stage.vars.startPosition, this.stage.vars.level - 1),
          2
        ) +
          this.letterOf(
            this.itemOf(
              this.stage.vars.startPosition,
              this.stage.vars.level - 1
            ),
            3
          )
      ) * 28
    );
    this.direction = this.toNumber(
      this.letterOf(
        this.itemOf(this.stage.vars.startPosition, this.stage.vars.level - 1),
        4
      ) +
        (this.letterOf(
          this.itemOf(this.stage.vars.startPosition, this.stage.vars.level - 1),
          5
        ) +
          this.letterOf(
            this.itemOf(
              this.stage.vars.startPosition,
              this.stage.vars.level - 1
            ),
            6
          ))
    );
    this.size = 0;
    this.moveAhead();
    while (!(this.toNumber(this.stage.vars.clone) === 0)) {
      yield;
    }
    this.effects.clear();
    this.visible = true;
    this.effects.ghost = 100;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost -= 10;
      yield;
    }
    if (
      this.compare(this.stage.vars.line, 3) > 0 ||
      this.toString(this.stage.vars.skipped) === "Yes"
    ) {
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
      this.stage.vars.ready = "Yes";
    }
    while (!null) {
      this.moveAhead();
      this.moveBehind(1);
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.playerLocation = 0;
    this.stage.vars.trailColor = 1;
    this.stage.vars.running = "No";
    this.stage.vars.ready = "No";
    this.stage.vars.available = "No";
    this.stage.vars.speed = 4;
    this.stage.vars.diagonalSpeed = 1.71428571429;
    this.costume = "Player Arrow";
    this.direction = 0;
    this.goto(0, 0);
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.stage.vars.playerLocation =
        this.toString(Math.round(this.x / 28)) +
        this.toString(Math.round(this.y / 28));
      if (Math.round(this.x / 28).length === 1) {
        this.stage.vars.playerLocation =
          "0" + this.toString(this.stage.vars.playerLocation);
        this.x = Math.round(this.x);
      }
      if (Math.round(this.y / 28).length === 1) {
        this.stage.vars.playerLocation =
          this.letterOf(this.stage.vars.playerLocation, 0) +
          this.letterOf(this.stage.vars.playerLocation, 1) +
          ("0" + this.toString(Math.round(this.y / 28)));
        this.y = Math.round(this.y);
      }
      yield;
    }
  }

  *whenIReceiveNextLevel2() {
    this.stage.vars.playTime = 0;
    for (let i = 0; i < 10; i++) {
      this.size += (100 - this.size) / 4;
      yield;
    }
  }

  *whenIReceiveShrink() {
    if (this.costumeNumber === 1) {
      this.size = 170;
      for (let i = 0; i < 10; i++) {
        this.moveAhead();
        this.moveBehind(1);
        this.size += (100 - this.size) / 4;
        yield;
      }
    }
  }

  *whenIReceiveUp() {
    if (this.costumeNumber === 1) {
      this.direction = 0;
    }
  }

  *whenIReceiveRight() {
    if (this.costumeNumber === 1) {
      this.direction = 90;
    }
  }

  *whenIReceiveDown() {
    if (this.costumeNumber === 1) {
      this.direction = 180;
    }
  }

  *whenIReceiveLeft() {
    if (this.costumeNumber === 1) {
      this.direction = -90;
    }
  }

  *whenIReceiveRun() {
    yield* this.wait(0.001);
    while (!(this.toString(this.stage.vars.running) === "No")) {
      this.stage.vars.playTime++;
      if (
        this.direction === 0 ||
        this.direction === 90 ||
        this.direction === 180 ||
        this.direction === -90
      ) {
        this.move(this.toNumber(this.stage.vars.speed));
      } else {
        this.move(
          this.toNumber(this.stage.vars.speed) +
            this.toNumber(this.stage.vars.diagonalSpeed)
        );
      }
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.createClone();
      yield;
    }
  }

  *whenIReceiveDone() {
    this.stage.vars.running = "No";
    this.stage.vars.ready = "No";
    this.stage.vars.playTime = 0;
    if (this.costumeNumber === 1) {
      this.effects.brightness = 100;
      for (let i = 0; i < 5; i++) {
        this.effects.ghost += 20;
        yield;
      }
      this.visible = false;
      this.stage.vars.haveAllBeenTouched = 0;
      yield* this.broadcastAndWait("Have all been touched");
      if (this.compare(this.stage.vars.haveAllBeenTouched, 2) < 0) {
        this.stage.vars.level++;
        this.stage.vars.score += Math.round(
          this.toNumber(this.stage.vars.timeBonus)
        );
        this.broadcast("Point");
        this.stage.vars.levelScore = 0;
        this.stage.vars.score +=
          200 - this.toNumber(this.stage.vars.hintUsed) * 25;
        this.broadcast("Next Level");
        this.stage.vars.savedScore = this.stage.vars.score;
        this.stage.vars.savedLevel = this.stage.vars.level;
        this.stage.vars.timeBonus = 200;
      } else {
        this.stage.vars.score =
          this.toNumber(this.stage.vars.score) -
          this.toNumber(this.stage.vars.levelScore);
        this.stage.vars.levelScore = 0;
        yield* this.broadcastAndWait("light up Leftovers");
        this.broadcast("Restart");
        this.broadcast(" Missing Blocks");
        this.stage.vars.ready = "Yes";
      }
    } else {
      this.deleteThisClone();
    }
  }

  *whenKeySpacePressed() {
    if (
      this.toString(this.stage.vars.ready) === "Yes" &&
      this.toString(this.stage.vars.running) === "No" &&
      this.toString(this.stage.vars.playEnabled) === "Yes"
    ) {
      while (!(this.toNumber(this.stage.vars.helpClones) === 0)) {
        yield;
      }
      this.broadcast("Run");
    }
  }

  *whenIReceiveRun2() {
    yield* this.wait(0.001);
    while (!(this.toString(this.stage.vars.running) === "No")) {
      if (
        this.costumeNumber === 1 &&
        (this.compare(
          this.letterOf(this.stage.vars.playerLocation, 0) +
            this.letterOf(this.stage.vars.playerLocation, 1),
          -6
        ) < 0 ||
          this.compare(
            this.letterOf(this.stage.vars.playerLocation, 0) +
              this.letterOf(this.stage.vars.playerLocation, 1),
            6
          ) > 0 ||
          this.compare(
            this.letterOf(this.stage.vars.playerLocation, 2) +
              this.letterOf(this.stage.vars.playerLocation, 3),
            -3
          ) < 0 ||
          this.compare(
            this.letterOf(this.stage.vars.playerLocation, 2) +
              this.letterOf(this.stage.vars.playerLocation, 3),
            3
          ) > 0) &&
        this.toString(this.stage.vars.available) === "Yes"
      ) {
        this.stage.vars.ready = "No";
        this.broadcast("Restart Was Pressed");
      }
      yield;
    }
  }

  *whenKeyRPressed() {
    if (this.compare(this.stage.vars.playTime, 40) > 0) {
      if (this.toString(this.stage.vars.redoEnabled) === "Yes") {
        this.broadcast("Restart Was Pressed");
        this.deleteThisClone();
      }
    }
  }

  *whenIReceiveTopLeft() {
    if (this.costumeNumber === 1) {
      this.direction = -45;
    }
  }

  *whenIReceiveTopRight() {
    if (this.costumeNumber === 1) {
      this.direction = 45;
    }
  }

  *whenIReceiveBottomRight() {
    if (this.costumeNumber === 1) {
      this.direction = 135;
    }
  }

  *whenIReceiveBottomLeft() {
    if (this.costumeNumber === 1) {
      this.direction = -135;
    }
  }

  *whenIReceiveThrowOff() {
    this.stage.vars.yFall = 0;
    while (
      !(
        this.costumeNumber === 1 &&
        (this.compare(
          this.letterOf(this.stage.vars.playerLocation, 0) +
            this.letterOf(this.stage.vars.playerLocation, 1),
          -6
        ) < 0 ||
          this.compare(
            this.letterOf(this.stage.vars.playerLocation, 0) +
              this.letterOf(this.stage.vars.playerLocation, 1),
            6
          ) > 0 ||
          this.compare(
            this.letterOf(this.stage.vars.playerLocation, 2) +
              this.letterOf(this.stage.vars.playerLocation, 3),
            -3
          ) < 0 ||
          this.compare(
            this.letterOf(this.stage.vars.playerLocation, 2) +
              this.letterOf(this.stage.vars.playerLocation, 3),
            3
          ) > 0) &&
        this.toString(this.stage.vars.available) === "Yes"
      )
    ) {
      this.direction += 15;
      this.stage.vars.yFall -= 0.2;
      this.y += this.toNumber(this.stage.vars.yFall);
      yield;
    }
  }

  *whenIReceiveRestart() {
    this.stage.vars.speed = 4;
    this.stage.vars.diagonalSpeed = 1.71428571429;
    this.goto(
      this.toNumber(
        this.letterOf(
          this.itemOf(this.stage.vars.startPosition, this.stage.vars.level - 1),
          0
        ) +
          this.letterOf(
            this.itemOf(
              this.stage.vars.startPosition,
              this.stage.vars.level - 1
            ),
            1
          )
      ) * 28,
      this.toNumber(
        this.letterOf(
          this.itemOf(this.stage.vars.startPosition, this.stage.vars.level - 1),
          2
        ) +
          this.letterOf(
            this.itemOf(
              this.stage.vars.startPosition,
              this.stage.vars.level - 1
            ),
            3
          )
      ) * 28
    );
    this.direction = this.toNumber(
      this.letterOf(
        this.itemOf(this.stage.vars.startPosition, this.stage.vars.level - 1),
        4
      ) +
        (this.letterOf(
          this.itemOf(this.stage.vars.startPosition, this.stage.vars.level - 1),
          5
        ) +
          this.letterOf(
            this.itemOf(
              this.stage.vars.startPosition,
              this.stage.vars.level - 1
            ),
            6
          ))
    );
    this.size = 0;
    this.moveAhead();
    this.effects.clear();
    this.visible = true;
    this.effects.ghost = 100;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost -= 10;
      yield;
    }
    if (
      this.compare(this.stage.vars.line, 3) > 0 ||
      this.toString(this.stage.vars.skipped) === "Yes"
    ) {
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
      this.stage.vars.ready = "Yes";
    }
    while (!null) {
      this.moveAhead();
      this.moveBehind(1);
      yield;
    }
  }

  *whenIReceiveRestart2() {
    this.stage.vars.playTime = 0;
    for (let i = 0; i < 10; i++) {
      this.size += (100 - this.size) / 4;
      yield;
    }
  }

  *whenIReceiveHelp() {
    this.visible = false;
    if (this.compare(this.costumeNumber, 1) > 0) {
      this.deleteThisClone();
    }
    this.stage.vars.ready = "No";
  }

  *whenIReceiveReturnGame() {
    this.visible = true;
    this.size += 0;
    for (let i = 0; i < 10; i++) {
      this.size += (100 - this.size) / 4;
      yield;
    }
    while (!(this.toString(this.stage.vars.runLine) === "No")) {
      yield;
    }
    this.stage.vars.ready = "Yes";
  }

  *whenIReceiveRestartWasPressed() {
    this.broadcast("Restart");
    yield* this.startSound("tape-player-sounds-90780");
    this.stage.vars.running = "No";
    this.broadcast("Shrink");
    this.stage.vars.score =
      this.toNumber(this.stage.vars.score) -
      this.toNumber(this.stage.vars.levelScore);
    this.stage.vars.levelScore = 0;
    this.deleteThisClone();
  }

  *whenIReceiveSpeed() {
    this.stage.vars.speed = 7;
    this.stage.vars.diagonalSpeed = 3;
  }

  *whenIReceiveTransfer() {
    yield* this.onLevelTransferFromTo(16, -3, 2, 1, -1);
    yield* this.onLevelTransferFromTo(17, 1, 2, -1, 0);
    yield* this.onLevelTransferFromTo(18, 3, -1, -1, 3);
    yield* this.onLevelTransferFromTo(18, 1, 3, -5, -2);
    yield* this.onLevelTransferFromTo(19, 5, 0, -1, -2);
    yield* this.onLevelTransferFromTo(20, 5, 0, -6, -3);
    this.broadcast("Transfer Repeat");
  }

  *onLevelTransferFromTo(level, x, y, x2, y2) {
    if (this.compare(this.stage.vars.level, level) === 0) {
      if (
        this.compare(this.x, this.toNumber(x) * 28) === 0 &&
        this.compare(this.y, this.toNumber(y) * 28) === 0
      ) {
        this.goto(this.toNumber(x2) * 28, this.toNumber(y2) * 28);
        this.direction = this.direction + 180;
        this.broadcast("Orient");
      } else {
        if (
          this.compare(this.x, this.toNumber(x2) * 28) === 0 &&
          this.compare(this.y, this.toNumber(y2) * 28) === 0
        ) {
          this.goto(this.toNumber(x) * 28, this.toNumber(y) * 28);
          this.direction = this.direction + 180;
          this.broadcast("Orient");
        }
      }
    }
  }

  *whenIReceiveOrientPlayer() {
    this.direction += 90;
  }

  *whenIReceiveEndScreen() {
    this.visible = false;
  }
}
