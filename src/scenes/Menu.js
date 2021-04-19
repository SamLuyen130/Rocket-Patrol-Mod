class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene"); 
    }

    preload() {
      this.load.image('spaceship', './assets/spaceship.png'); 
      this.load.audio('sfx_select', './assets/blip_select12.wav'); 
      this.load.audio('sfx_explosion', './assets/explosion38.wav'); 
      this.load.audio('sfx_rocket', './assets/rocket_shot.wav'); 
      this.load.audio('music', './assets/bg_music.wav'); 

    }

    create() {
      this.ship = this.add.tileSprite (
        50, 90, 55, 40, 'spaceship'
      ).setOrigin(0, 0);

      this.ship = this.add.tileSprite (
        160, 150, 55, 40, 'spaceship'
      ).setOrigin(0, 0);

      this.ship = this.add.tileSprite (
        330, 120, 55, 40, 'spaceship'
      ).setOrigin(0, 0);

      this.ship = this.add.tileSprite (
        500, 200, 55, 40, 'spaceship'
      ).setOrigin(0, 0);
      
      // menu text configuration
      let menuConfig = {
        fontFamily: 'Roboto',
        fontSize: '30px',
        color: '#843605',
        align: 'right',
        padding: {
          top: 12,
          bottom: 9,
        },
        fixedWidth: 0
      }

        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 5 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 1.25, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.color = '#843605';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← (key) or ↑ (mouse) for Novice', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.75 + borderUISize + borderPadding, 'Press → (key) or ↓ (mouse) for Expert', menuConfig).setOrigin(0.5);
      
    
        // define keys
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); 

        
    }
    update() {
      if (Phaser.Input.Keyboard.JustDown(keyLeft)) {
        // Novice mode
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000, 
          mouseOn: false
        }
        this.sound.play('sfx_select');
        this.scene.start("playScene");    
      }

      if (Phaser.Input.Keyboard.JustDown(keyUp)) {
        // Novice mode mouse
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000, 
          mouseOn: true
        }
        this.sound.play('sfx_select');
        this.scene.start("playScene");    
      }
        
      if (Phaser.Input.Keyboard.JustDown(keyRight)) {
        // Expert mode
        game.settings = {
          spaceshipSpeed: 5,
          gameTimer: 45000,
          mouseOn: false   
        }
        this.sound.play('sfx_select');
        this.scene.start("playScene");    
      }

      if (Phaser.Input.Keyboard.JustDown(keyDown)) {
        // Expert mode Mouse
        game.settings = {
          spaceshipSpeed: 5,
          gameTimer: 45000, 
          mouseOn: true
        }
        this.sound.play('sfx_select');
        this.scene.start("playScene");    
      }
        

    }
}