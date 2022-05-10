import { Container, SCALE_MODES, Sprite, Texture, Ticker } from 'pixi.js';
import frontSide from '../../assets/images/front-side.svg';
import backSide from '../../assets/images/backside-1.svg';

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

export default class CardContainer {
  constructor({ app }) {
    this.app = app;

    // Create container to store our cards in
    this.container = new Container();
    this.texture = Texture.from(frontSide);
    this.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

    // Create a 6x2 grid of cards
    for (let i = 0; i < 12; i++) {
      this.card = new Sprite(this.texture);
      this.card.anchor.set(0.5);
      this.card.scaleX = 1;

      // Gap spacing in x-axis
      this.card.x = (i % 6) * 180;

      // Gap spacing in y-axis
      this.card.y = Math.floor(i / 6) * 270;

      // Add card into container
      this.container.addChild(this.card);

      // Card clickable
      this.card.interactive = true;
      this.card.buttonMode = true;

      // Click event for cards
      this.card.on('pointerdown', onClick);

      // this.card.on('mouseover', onMouseOver);
      // this.card.on('mouseout', onMouseOut);

      // Set scale.x manually (Testing purposes)
      // this.card.scale.x = 0.5;

      let card = this.card;

      function onClick() {
        card.scale.x = 1;
        let doScale = true;
        let isScalingDown = true;

        app.ticker.add(() => {
          if (doScale) {
            if (isScalingDown) {
              card.scale.x -= 0.075;
              if (card.scale.x <= 0) {
                card.scale.x = 0;
                this.texture = Texture.from(backSide);
                // this.card = new Sprite(this.texture);
                isScalingDown = false;
              }
            } else {
              card.scale.x += 0.075;
              if (card.scale.x >= 1) {
                card.scale.x = 1;
                isScalingDown = true;
                doScale = false;
              }
            }
          }
        });
        console.log('clicked');
      }

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