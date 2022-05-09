import { Container, SCALE_MODES, Sprite, Texture } from 'pixi.js';
import frontSide from '../../assets/images/front-side.svg';

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

export default class TestContainer {
  constructor({ app }) {
    this.app = app;

    // Create container to store our bunnies in
    this.container = new Container();
    this.texture = Texture.from(frontSide);
    this.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

    // Create a 6x2 grid of bunnies
    for (let i = 0; i < 12; i++) {
      this.card = new Sprite(this.texture);
      this.card.anchor.set(0.5);

      // Gap spacing in x-axis
      this.card.x = (i % 6) * 180;

      // Gap spacing in y-axis
      this.card.y = Math.floor(i / 6) * 270;

      // Card clickable
      this.card.interactive = true;
      this.card.buttonMode = true;

      this.card.on('pointerdown', onClick);

      function onClick() {
        // this.card.scale.x *= 1.25;
        // this.card.scale.y *= 1.25;
        console.log('clicked');
      }

      // Add bunny into container
      this.container.addChild(this.card);

      // Set anchor of container in the middle
      this.container.pivot.x = this.container.width / 2;
      this.container.pivot.y = this.container.height / 2;

      // Position container in the middle of canvas
      this.container.x = width / 2;
      this.container.y = height / 2;
    }

    // Lastly add container to stage (Canvas)
    app.stage.addChild(this.container);
  }
}
