import { TextStyle, Text } from 'pixi.js';

const width = document.documentElement.clientWidth;

export default class Title {
  constructor({ app }) {
    this.app = app;

    // Add text style example
    const style = new TextStyle({
      align: 'center',
      fill: '#FCABA3',
      fontSize: 36,
    });

    // Adding text and styling from above
    this.title = new Text('🍋 Memory! Match the fruits 🍋', style);

    // Center position the title
    this.title.anchor.set(0.5, 0.5);
    this.title.x = width / 2;
    this.title.y = 72;

    // Add title to app.stage so that it can be rendered to the canvas
    app.stage.addChild(this.title);
  }
}
