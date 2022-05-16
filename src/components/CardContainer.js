import { Container, SCALE_MODES, Sprite, Texture, Ticker } from 'pixi.js';

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

var assetFolder = '../assets/images/';

export default class CardContainer {
  constructor({ app }) {
    this.app = app;

    // Create container to store our cards in
    this.container = new Container();

    const firstPick = [];
    const clickedCards = [];
    const cardArray = [
      {
        name: 'circle',
        img: assetFolder + '/front/front_side_0.png',
        id: 0,
      },
      {
        name: 'square',
        img: assetFolder + '/front/front_side_1.png',
        id: 1,
      },
      {
        name: 'pyramid',
        img: assetFolder + '/front/front_side_2.png',
        id: 2,
      },
      {
        name: 'diamond',
        img: assetFolder + '/front/front_side_3.png',
        id: 3,
      },
      {
        name: 'hexagon',
        img: assetFolder + '/front/front_side_4.png',
        id: 4,
      },
      {
        name: 'pentagon',
        img: assetFolder + '/front/front_side_5.png',
        id: 5,
      },
      {
        name: 'secondCircle',
        img: assetFolder + '/front/front_side_6.png',
        id: 0,
      },
      {
        name: 'secondSquare',
        img: assetFolder + '/front/front_side_7.png',
        id: 1,
      },
      {
        name: 'secondPyramid',
        img: assetFolder + '/front/front_side_8.png',
        id: 2,
      },
      {
        name: 'secondDiamond',
        img: assetFolder + '/front/front_side_9.png',
        id: 3,
      },
      {
        name: 'secondHexagon',
        img: assetFolder + '/front/front_side_10.png',
        id: 4,
      },
      {
        name: 'pentagon',
        img: assetFolder + '/front/front_side_11.png',
        id: 5,
      },
    ];

    // Randomize cards
    // cardArray.sort(() => 0.5 - Math.random());

    // Create a 6x2 grid of cards
    for (let i = 0; i < 12; i++) {
      this.texture = Texture.from(assetFolder + 'back_side.png');
      this.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
      this.card = new Sprite.from(this.texture);

      this.card.anchor.set(0.5);
      this.card.scaleX = 1;

      // Gap spacing in x-axis
      this.card.x = (i % 6) * 210;

      // Gap spacing in y-axis
      this.card.y = Math.floor(i / 6) * 315;

      // Card clickable
      this.card.interactive = true;
      this.card.buttonMode = true;

      // Click event for cards
      this.card.on('pointerdown', onClick);

      // Set scale.x manually (Testing purposes)
      // this.card.scale.x = 0.5;

      let card = this.card;

      function onClick(e) {
        clickedCards.push(cardArray[i]);

        console.log('clickedCards: ' + clickedCards.keys);
        console.log(clickedCards);
        // console.log(cardArray);
        card.scale.x = 1;
        let isScalingDown = true;
        let doScale = true;

        app.ticker.add(() => {
          if (doScale) {
            if (isScalingDown) {
              card.scale.x -= 0.05;
              if (card.scale.x <= 0) {
                card.scale.x = 0;
                this.texture = Texture.from(cardArray[i].img);
                isScalingDown = false;
                if (clickedCards.length > 1) {
                  // console.log(clickedCards[0].id);
                  // console.log(clickedCards[1].id);
                  if (clickedCards[0].id === clickedCards[1].id) {
                    console.log('Its a match');
                  } else {
                    console.log('No match.. ');
                  }
                }
                // if (firstPick[0].id === cardArray[i].id) {
                //   console.log(firstPick);
                //   // console.log('cardArray: ' + cardArray[i].name);
                //   // console.log('clickedCards: ' + clickedCards[i]);
                //   console.log('MATCH FOUND!');
                // } else {
                //   // If not match rotate back
                //   console.log('NO MATCH :(');
                //   // this.texture = Texture.from(assetFolder + 'back_side.png');
                //   card.scale.x += 0.05;
                //   card.scale.x = 1;
                //   isScalingDown = true;
                //   doScale = false;
                // }
              }
            } else {
              card.scale.x += 0.05;
              if (card.scale.x >= 1) {
                card.scale.x = 1;
                isScalingDown = true;
                doScale = false;
              }
            }
          }
        });
        // console.log('clicked');
      }

      // function checkMatch() {
      //   console.log('Scale up!');
      //   card.scale.x *= 1.25;
      //   card.scale.y *= 1.25;
      // }

      // Add card into container

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
