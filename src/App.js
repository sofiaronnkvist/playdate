import { Application } from 'pixi.js';
import '../style.css';

// Import our components here
import Title from './components/Title';
// import Circle from './components/Circle';
import CardContainer from './components/CardContainer';

// Width and height for our fullscreen canvas
const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

// Makes our canvas somewhat responsive
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
  // When changing colors make sure to type 0x before
  backgroundColor: 0xfdefde,
});

// Add in our components
// let circle = new Circle({ app });
let title = new Title({ app });
let container = new CardContainer({ app });

// Add canvas to index.html
document.body.appendChild(app.view);
