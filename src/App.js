import { Application, Graphics, TextStyle, Text } from 'pixi.js';
import '../style.css';

console.log(window.innerWidth);

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

window.addEventListener('resize', function () {
  app.renderer.resize(width, height);
});

// Create canvas and set properties to it
const app = new Application({
  width: width,
  height: height,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0xfec648,
});

// Add canvas to index.html
document.body.appendChild(app.view);

// Add text style example
const style = new TextStyle({
  align: 'center',
  fill: '#000000',
  fontSize: 56,
});

const title = new Text('Memory! 👾 ', style);
// title.title = 'Memory the Game!';

// Center position the title
title.anchor.set(0.5, 0.5);
title.x = width / 2;
title.y = 72;

// Add title to app.stage so that it can be rendered to the canvas
app.stage.addChild(title);

// Create a circle as a test
const circle = new Graphics();
circle.beginFill(0xfb6261);
circle.drawCircle(0, 0, 50);
circle.endFill();

// Where to position circle, in this case I place it in the center
circle.x = width / 2;
circle.y = height / 2;

// Add circle to app.stage so that it can be rendered to the canvas
app.stage.addChild(circle);
