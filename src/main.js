/* 
Sam Luyen
Rocket Patrol Mod 
4/18/2021
Took me about 12-15 hours to complete

Points and order of task complete: 
- Created a new Smaller spaceship (used no copyright art from google) thats smaller faster and worth more (20)
- Randomized each spaceship movement at start (5)
- Implemented parallax scrolling (custom made background) (10)
- Time is added when you hit the ship (Small + 2 sec, Regular + 1 second) (20)
- Time remaning is Visible on the screen (10) 
- BG Music added (from mixkit.co) (5)
- Changed the Layout of the Menu Screen (move around text, removed text background, added image) (10)
- Mouse Controls (20)
- 100 Points total


*/ 

let config = {
    type: Phaser.CANVAS, 
    width: 640, 
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI size
let borderUISize = game.config.height / 15; 
let borderPadding = borderUISize / 3; 
let starSpeed = 4; 

// Keybindings
let keyF, keyR, keyLeft, keyRight, keyUp, keyDown; 