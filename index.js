import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Grid from "./Grid/Grid.js";
import Elements from "./Elements/Elements.js";
import PlayerArrow from "./PlayerArrow/PlayerArrow.js";
import Titles from "./Titles/Titles.js";
import Tutorial from "./Tutorial/Tutorial.js";
import SceneCut from "./SceneCut/SceneCut.js";
import Menu from "./Menu/Menu.js";
import Foreground from "./Foreground/Foreground.js";
import Submenu from "./Submenu/Submenu.js";
import Descriptions from "./Descriptions/Descriptions.js";
import ProbabiyRaccoon from "./ProbabiyRaccoon/ProbabiyRaccoon.js";
import Hints from "./Hints/Hints.js";
import Score from "./Score/Score.js";
import InGameMenu from "./InGameMenu/InGameMenu.js";
import Ripple from "./Ripple/Ripple.js";
import Thumbnail from "./Thumbnail/Thumbnail.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Grid: new Grid({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 6,
  }),
  Elements: new Elements({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 41,
    size: 100,
    visible: false,
    layerOrder: 10,
  }),
  PlayerArrow: new PlayerArrow({
    x: 0,
    y: 0,
    direction: 0,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 95.66666666666669,
    visible: false,
    layerOrder: 11,
  }),
  Titles: new Titles({
    x: 0,
    y: 9.314591553966668,
    direction: 88.9739395701,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 99.55555555555557,
    visible: true,
    layerOrder: 12,
  }),
  Tutorial: new Tutorial({
    x: 0,
    y: 140,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 8,
  }),
  SceneCut: new SceneCut({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 16,
  }),
  Menu: new Menu({
    x: 5,
    y: -52.25,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 14,
  }),
  Foreground: new Foreground({
    x: 91,
    y: 91,
    direction: 135,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 132,
    visible: true,
    layerOrder: 1,
  }),
  Submenu: new Submenu({
    x: 115,
    y: 96.95547619278332,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 100,
    visible: false,
    layerOrder: 4,
  }),
  Descriptions: new Descriptions({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 13,
  }),
  ProbabiyRaccoon: new ProbabiyRaccoon({
    x: -210,
    y: -130,
    direction: 85,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 9,
  }),
  Hints: new Hints({
    x: -14,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 129.6666666666667,
    visible: false,
    layerOrder: 7,
  }),
  Score: new Score({
    x: 166,
    y: -140,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 11,
    size: 100,
    visible: false,
    layerOrder: 3,
  }),
  InGameMenu: new InGameMenu({
    x: 86,
    y: -140,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2,
  }),
  Ripple: new Ripple({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 5,
  }),
  Thumbnail: new Thumbnail({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 15,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
