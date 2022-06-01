# Memory

[![Netlify Status](https://api.netlify.com/api/v1/badges/6782c9d6-06ee-41cb-8054-6ab81d28a901/deploy-status)](https://app.netlify.com/sites/fruity-memory/deploys)

A classic memory (match pairs) game made with PIXI. Play it [here](https://fruity-memory.netlify.app/).

# Installation

After cloning the project:

```
npm install
```

Then start a server:

```
npm run dev
```

# Changelog

-   [#1 - Branch testing.](https://github.com/marcusxyz/playdate/pull/1)
-   [#2 - Vite installation.](https://github.com/marcusxyz/playdate/pull/2)
-   [#3 - Changed main/App.](https://github.com/marcusxyz/playdate/pull/3)
-   [#4 - CardContainer component added to canvas.](https://github.com/marcusxyz/playdate/pull/4)
-   [#5 - Cards flip on click](https://github.com/marcusxyz/playdate/pull/5)
-   [#6 - Backside of card added, flip is working.](https://github.com/marcusxyz/playdate/pull/6)
-   [#7 - spritesheet.json added to project.](https://github.com/marcusxyz/playdate/pull/7)
-   [#8 - spritesheet.json added to project, but flip animation is not working](https://github.com/marcusxyz/playdate/pull/8)
-   [#9 - Flip animation works.](https://github.com/marcusxyz/playdate/pull/9)
-   [#10 - Started on pairing cards.](https://github.com/marcusxyz/playdate/pull/10)
-   [#11 - Randomize the cards.](https://github.com/marcusxyz/playdate/pull/11)
-   [#12 - Started on feature matching cards.](https://github.com/marcusxyz/playdate/pull/12)
-   [#13 - Work in progress for matching pairs.](https://github.com/marcusxyz/playdate/pull/13)
-   [#14 - Cleaned up code and removed unsused files.](https://github.com/marcusxyz/playdate/pull/14)
-   [#15 - Deploy fix: moved images to /public.](https://github.com/marcusxyz/playdate/pull/15)

# Code Review

By (Sofia Rönnkvist)[https://github.com/sofiaronnkvist] and (Jennifer Andersson)[https://github.com/JennAnd].

1. `CardContainer.js:116` - It would be nice to have an end screen that congratulates you on winning the game, not just logging the message to the console.
2. `CardContainer.js:6` - Use const or let instead of var.
3. `App.js:23` - Transparent is deprecated in PIXI.
4. `CardContainer.js:86` - You have messages to show if there is a match or not that is only logged to the console. Those would be nice to see as a player!
5. `CardContainer:general` - It would be easier to manage your code if your functions were not put inside of runGame, and just called on inside of runGame.
6. `App.js:31-32` - There is no need to create variables that are never used here. You can just create the new instances.
7. `CardContainer.js:6` - For easier naming, you could exclude having an assets folder to put your images folder in.
8. `index.html:5` - Since you have a public folder, your favicon does not need to be in the root. It can be put with the other pictures.
9. `index.html:11` - You could link to the App.js file directly here.
10. `main.js` - If you link directly to App.js instead, this file can be deleted.

# Testers

Tested by the following people:

1. Jane Doe
2. John Doe
3. Jane Doe
4. John Doe

Tested by the following muggles (non-coders):

1. Isabelle
2. Daniel
3. Jane Doe
4. John Doe
