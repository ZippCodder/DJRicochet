/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class SceneCut extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Background", "./SceneCut/costumes/Background.png", {
        x: 480,
        y: 360,
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
      new Trigger(Trigger.BROADCAST, { name: "Done" }, this.whenIReceiveDone),
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.effects.clear();
    this.visible = false;
    while (true) {
      this.moveAhead();
      yield;
    }
  }

  *whenIReceiveNextLevel() {
    if (
      this.toNumber(this.stage.vars.level) === 1 &&
      this.toNumber(this.stage.vars.line) === 0
    ) {
      this.effects.clear();
      this.visible = true;
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += 10;
        yield;
      }
      this.visible = false;
    }
  }

  *whenIReceiveDone() {
    while (!(this.toNumber(this.stage.vars.clone) === 0)) {
      yield;
    }
    this.effects.clear();
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    this.visible = false;
  }
}
