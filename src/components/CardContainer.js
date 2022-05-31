import { Container, SCALE_MODES, Sprite, Texture } from 'pixi.js';

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

var assetFolder = '../dist/assets/images/';

export default class CardContainer {
  constructor({ app }) {
    this.app = app;

    // Create container to store our cards in
    this.container = new Container();

    let clickedCards = [];
    let firstClick = [];
    let secondClick = [];
    let matchedPairs = 0;

    const cardArray = [
      { id: 0, name: 'citrus', img: assetFolder + 'front/citrus.png' },
      { id: 1, name: 'pApple', img: assetFolder + 'front/pineapple.png' },
      { id: 2, name: 'melon', img: assetFolder + 'front/melon.png' },
      { id: 3, name: 'coconut', img: assetFolder + 'front/coconut.png' },
      { id: 4, name: 'orange', img: assetFolder + 'front/orange.png' },
      { id: 5, name: 'banana', img: assetFolder + 'front/banana.png' },
      { id: 0, name: 'citrus_2', img: assetFolder + 'front/citrus.png' },
      { id: 1, name: 'pApple_2', img: assetFolder + 'front/pineapple.png' },
      { id: 2, name: 'melon_2', img: assetFolder + 'front/melon.png' },
      { id: 3, name: 'coconut_2', img: assetFolder + 'front/coconut.png' },
      { id: 4, name: 'orange_2', img: assetFolder + 'front/orange.png' },
      { id: 5, name: 'banana_2', img: assetFolder + 'front/banana.png' },
    ];

    // Create a 6x2 grid of cards
    const runGame = () => {
      // Randomize cards
      cardArray.sort(() => 0.5 - Math.random());

      for (let i = 0; i < cardArray.length; i++) {
        // this.texture = Texture.from(cardArray[i].img);
        this.texture = Texture.from(assetFolder + 'back_side.png');
        this.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
        this.card = new Sprite.from(this.texture);

        // Add card into container
        this.container.addChild(this.card);

        this.card.anchor.set(0.5);

        // Gap spacing in x-axis
        this.card.x = (i % 6) * 210;

        // Gap spacing in y-axis
        this.card.y = Math.floor(i / 6) * 315;

        // Card clickable
        this.card.interactive = true;
        this.card.buttonMode = true;

        // Click event for cards
        this.card.on('pointerdown', () => onClickCard(cardArray[i]));

        let isScalingDown = true;
        let doScale = true;

        let card = this.card;

        const onClickCard = (cardArray) => {
          if (clickedCards.length === 2) return;
          if (clickedCards[0] && clickedCards[0][1].name === cardArray.name)
            return;
          if (clickedCards[1] && clickedCards[1][1].name === cardArray.name)
            return;
          clickedCards.push([card, cardArray]);
          console.log({ clickedCards });

          card.texture = Texture.from(cardArray.img);

          if (clickedCards.length > 1) {
            checkMatch();
          }
          console.log(clickedCards);
        };

        function checkMatch() {
          if (clickedCards[0][1].id === clickedCards[1][1].id) {
            console.log('Its a match');
            clickedCards = [];
            matchedPairs++;
            setTimeout(checkComplete, 1200);
          } else {
            console.log('No match..');
            setTimeout(resetCards, 1200);
          }
        }

        function resetCards() {
          doScale = true;
          isScalingDown = true;

          clickedCards.forEach((clickedCard) => {
            clickedCard[0].texture = Texture.from(
              assetFolder + 'back_side.png'
            );
          });
          clickedCards = [];
        }

        function checkComplete() {
          if (matchedPairs === cardArray.length / 2) {
            clickedCards = [];
            firstClick = [];
            secondClick = [];
            matchedPairs = 0;
            console.log('Congrats you won!');
            runGame();
          }
        }
      }
    };

    runGame();

    //After adding cards to container, we get a proper container size which we can position in the center of the canvas
    // Set anchor of container in the middle
    this.container.pivot.x = this.container.width / 2;
    this.container.pivot.y = this.container.height / 2;

    // Position container in the middle of canvas
    this.container.x = width / 2;
    this.container.y = height / 2;

    // Lastly add container to stage (Canvas)
    app.stage.addChild(this.container);
  }
}
