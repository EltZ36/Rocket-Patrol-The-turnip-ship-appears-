//have a config object beforehand to get the settings we want 
/*
Elton Zeng 
Rocket Patrol: The turnip ship appears! 
~12 hours (not really sure tbh)

Mods: 
Implement the 'FIRE' UI text from the original game (1) <- Looking at the youtube video, it seems like the fire button is not visible until the rocket is up into the air. 
It could be the case that there is a cooldown to fire afterwards but it doesn't seem like the button would be designed that way and without any output overlay, it's hard to tell. As a result, I will assume that the fire button afters after the rocket is up in the air and appears only then. 
Implement the speed increase that happens after 30 seconds in the original game (1) <- speedup occurs 30 seconds after easy mode and 30 seconds after expert mode so 15 seconds as a result. 
Randomize each spaceship's movement direction at the start of each play (1) <- The positions of the ships change as a result of this randomized movement otherwise the ships move together which is not the goal of this game
Create a new scrolling tile sprite for the background (1) <- for this, the tile sprite has more stars and the stars are no longer just dots and have more squares around them 
Create 4 new explosion sound effects and randomize which one plays on impact (3)
Display the time remaining (in seconds) on the screen (3)
Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5) <- this is the turnip ship
Implement mouse control for player movement and left mouse click to fire (5)

Sources used: 
I used the repository from Ismael Cortez and the link is https://github.com/i-cortez/CMPM-120_Rocket-Patrol-Mods
From that repository, I used some of the code from Play.js in order to implement the speed up of the timer in their Play.js file lines (252 - 261) and I used that idea of 
an additional timer and speedup for my Play.js on line 61 and the speed up is modified from that snippet to be a flag and can be seen on lines 121 to 127 and the speedUp function is on lines 41 - 43
I also used https://stackoverflow.com/questions/25713429/wrap-a-sprite-portion-outside-the-boundary-to-the-other-side from Edward Lee and his jsfiddle (https://jsfiddle.net/m8nj4cjr/) in order to implement the scrolling 
ships for the right side and I used that for line 20 of Spaceship.js and as a result, it's on line 20 on TurnipShip.js 

Here are all the documentation and Phaser examples I used: 
for the mouse input and left click: https://labs.phaser.io/edit.html?src=src/game%20objects/graphics/mouse%20trail.js&v=3.70. and https://labs.phaser.io/view.html?src=src/input\pointer\pointer%20buttons.js for lines 21 to 29 of Rocket.js
for the remaining timer left for the timers: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/ 
for the timer itself: https://labs.phaser.io/edit.html?src=src\time\timer%20event.js and used for lines 60, 61, and 131 of Play.js 
*/
let config = {
    type: Phaser.AUTO, 
    width: 640, 
    height: 480,
    scene: [ Menu , Play ]
}
let game = new Phaser.Game(config)
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, pointerCLICK
//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

