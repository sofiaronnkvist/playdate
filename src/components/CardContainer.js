import { Container, SCALE_MODES, Sprite, Texture, Loader } from 'pixi.js';
import frontSide from '../../assets/images/front_side_1.png';
import backSide from '../../assets/images/back_side.png';

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

export default class CardContainer {
  constructor({ app }) {
    this.app = app;

    // Create container to store our cards in
    this.container = new Container();
    // this.texture = Texture.from(frontSide);
    // this.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

    const loader = new Loader();

    loader.add('../../assets/images/spritesheet.json').load(() => {
      const id =
        loader.resources['../../assets/images/spritesheet.json'].textures;

      const backSide = console.log(id[`front_side_6.png`]);

      // const frontSide = new Texture()

      // Create a 6x2 grid of cards
      for (let i = 1; i < 7; i++) {
        // this.card = frontSide;
        this.card = new Sprite(id[`front_side_${i}.png`]);
        this.card.anchor.set(0.5);
        this.card.scaleX = 1;

        // Gap spacing in x-axis
        this.card.x = (i % 6) * 210;

        // Gap spacing in y-axis
        this.card.y = Math.floor(i / 6) * 310;

        // Add card into container
        this.container.addChild(this.card);

        // Card clickable
        this.card.interactive = true;
        this.card.buttonMode = true;

        // Click event for cards
        this.card.on('pointerdown', onClick);

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
                  this.card = new Sprite(
                    loader.resources[
                      '../../assets/images/spritesheet.json'
                    ].textures['back_side.png']
                  );
                  console.log('show backside!');

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
      }
      // Set anchor of container in the middle
      this.container.pivot.x = this.container.width / 2;
      this.container.pivot.y = this.container.height / 2;

      // Position container in the middle of canvas
      this.container.x = width / 1.8;
      this.container.y = height / 1.5;
    });

    // Lastly add container to stage (Canvas)
    app.stage.addChild(this.container);
  }
}
