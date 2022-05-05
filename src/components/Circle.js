import { Graphics } from 'pixi.js';

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

export default class Circle {
  constructor({ app }) {
    this.app = app;

    // Create a circle as a test
    this.circle = new Graphics();

    // When changing colors make sure to type 0x before
    this.circle.beginFill(0xfb6261);
    this.circle.drawCircle(0, 0, 50);
    this.circle.endFill();

    // Where to position circle, in this case I place it in the center
    this.circle.x = width / 2;
    this.circle.y = height / 2;

    // Add circle to app.stage so that it can be rendered to the canvas
    app.stage.addChild(this.circle);
  }
}
