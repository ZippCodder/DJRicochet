/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Foreground extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Foreground", "./Foreground/costumes/Foreground.png", {
        x: 480,
        y: 360,
      }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *startAsClone() {
    if (this.toNumber(this.stage.vars.foregroundClones) === 1) {
      this.goto(-296, -296);
      this.stage.vars.foregroundClones++;
    } else {
      this.goto(-376, -376);
    }
    this.visible = true;
    this.effects.ghost = 94;
    this.direction = 135;
    this.moveBehind();
    this.size = 132;
    while (!(this.x === -40 && this.y === -40)) {
      this.y += 1;
      this.x += 1;
      yield;
    }
    this.createClone();
    while (!(this.x === 376 && this.y === 376)) {
      this.y += 1;
      this.x += 1;
      yield;
    }
    this.deleteThisClone();
  }

  *whenGreenFlagClicked() {
    this.stage.vars.foregroundClones = 0;
    this.goto(40, 40);
    this.direction = 135;
    this.visible = true;
    this.effects.ghost = 94;
    this.moveBehind();
    this.size = 132;
    this.stage.vars.foregroundClones++;
    this.createClone();
    while (!(this.x === 376 && this.y === 376)) {
      this.y += 1;
      this.x += 1;
      yield;
    }
    this.visible = false;
  }
}
