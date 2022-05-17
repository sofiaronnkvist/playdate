import { Container, SCALE_MODES, Sprite, Texture } from 'pixi.js';

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

var assetFolder = '../assets/images/';

export default class CardContainer {
  constructor({ app }) {
    this.app = app;

    // Create container to store our cards in
    this.container = new Container();

    let clickedCards = [];
    let firstClick = [];
    let secondClick = [];
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
        name: 'secondPentagon',
        img: assetFolder + '/front/front_side_11.png',
        id: 5,
      },
    ];

    // Randomize cards
    // cardArray.sort(() => 0.5 - Math.random());

    // Create a 6x2 grid of cards
    for (let i = 0; i < 12; i++) {
      // this.texture = Texture.from(cardArray[i].img);
      this.texture = Texture.from(assetFolder + 'back_side.png');
      this.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
      this.card = new Sprite.from(this.texture);

      this.card.anchor.set(0.5);

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
      let isScalingDown = true;
      let doScale = true;

      let card = this.card;

      function onClick(e) {
        clickedCards.push(cardArray[i]);
        firstClick.push(card);
        console.log(firstClick);
        console.log(firstClick[0].texture);
        // firstClick[0].texture = Texture.from(assetFolder + 'back_side.png');
        // console.log(clickedCards);
        // console.log(cardArray);
        card.scale.x = 1;

        app.ticker.add(() => {
          if (doScale) {
            if (isScalingDown) {
              // console.log(clickedCards[0]);
              card.scale.x -= 0.05;
              if (card.scale.x <= 0) {
                // card.scale.x = 0;
                this.texture = Texture.from(cardArray[i].img);
                isScalingDown = false;
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
        if (clickedCards.length > 1) {
          // secondClick.push(card);
          // console.log(secondClick);
          let secondCard = card;
          // console.log(clickedCards[0].id);
          // console.log(clickedCards[1].id);
          checkMatch();
        }
        // console.log('clicked');
      }

      function checkMatch() {
        console.log(firstClick[0].texture);
        // firstClick[0].texture = Texture.from(assetFolder + 'back_side.png');
        if (clickedCards[0].id === clickedCards[1].id) {
          // setTimeout(hideCards, 1200);
          console.log('Its a match');
          clickedCards = [];
        } else {
          console.log('No match..');
          // console.log(card.scale.x);
          setTimeout(resetCards, 1200);
          // clickedCards = [];
        }
      }

      function resetCards() {
        doScale = true;
        isScalingDown = true;
        card.texture = Texture.from(cardArray[i].img);
        // let texture = card.texture;
        if (card.texture != Texture.from(assetFolder + 'back_side.png')) {
          app.ticker.add(() => {
            // console.log('change texture pls');
            if (doScale) {
              if (isScalingDown) {
                card.scale.x -= 0.05;
                console.log('hello?');
                if (card.scale.x <= 0) {
                  console.log(card.scale.x);
                  card.scale.x = 0;
                  // firstClick[0].texture = Texture.from(
                  //   assetFolder + 'back_side.png'
                  // );
                  // firstClick[1].card.texture = Texture.from(
                  //   assetFolder + 'back_side.png'
                  // );
                  card.texture = Texture.from(assetFolder + 'back_side.png');
                  // clickedCards[0].img = assetFolder + 'back_side.png';
                  isScalingDown = false;
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
        }
        card.texture = Texture.from(cardArray[i].img);
        clickedCards = [];
      }

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
