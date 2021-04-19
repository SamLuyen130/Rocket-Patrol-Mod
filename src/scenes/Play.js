class Play extends Phaser.Scene {
    constructor() {
        super("playScene"); 
    }

    preload() {
        // Loading the Images and Sprites
        this.load.image('rocket', './assets/rocket.png'); 
        this.load.image('spaceship', './assets/spaceship.png'); 
        this.load.image('spaceship2', './assets/spaceship2.png'); 
        this.load.image('starfield', './assets/starfield.png'); 
        this.load.image('planets', './assets/planets.png'); 


        // Load sprite Sheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64, 
            frameHeight: 32, 
            startFrame: 0, 
            endFrame: 9
        });
    }

    create() {
        // Music
        this.bgSound = this.sound.add('music', {
            loop:true
        });
        this.bgSound.play(); 
        // Place the background
        this.starfield = this.add.tileSprite(0, 2, game.config.width, game.config.height, 'starfield').setOrigin(0, 0); 
        this.planets = this.add.tileSprite(0, 2, game.config.width, game.config.height, 'planets').setOrigin(0, 0); 
        // Green Rectangle
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0, 0); 
        // White Border
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0); 
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xffffff).setOrigin(0, 0); 
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0, 0); 
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0, 0); 
        
        // Initialize The High Score
        this.high = 0; 

        // Add rocket player
        this.pRocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // Add Spaceships
        this.ship1 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 3.5, 'spaceship', 0, 30).setOrigin(0, 0); 
        this.ship2 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 9, 'spaceship', 0, 10).setOrigin(0, 0); 
        this.ship3 = new Spaceship(this, game.config.width + borderUISize * 9, borderPadding* 20, 'spaceship', 0, 20).setOrigin(0, 0); 
        this.ship4 = new Smallship(this, game.config.width + borderUISize * 3, borderPadding* 16, 'spaceship2', 0, 60).setOrigin(0, 0);
        this.ship5 = new Smallship(this, game.config.width + borderUISize * 12, borderPadding* 24, 'spaceship2', 0, 40).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


        // animation config 
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30 
        });

        // intiialize score
        this.p1Score = 0; 
        // Display Score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        fixedWidth: 100 
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.timeleft = this.add.text(game.config.width - 20 * borderPadding - borderUISize, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // Game Over Flag
        this.gameOver = false; 
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart', scoreConfig).setOrigin(0.5);
            if (game.settings.mouseOn)
            {
                this.input.mouse.releasePointerLock();
            }
            this.gameOver = true; 
        }, null, this);

        
        // speed countdown
        this.speedCount = this.time.delayedCall(5000, () => {
            this.ship1.increaseSpeed();
            this.ship2.increaseSpeed();
            this.ship3.increaseSpeed();
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart();
        }
        this.starfield.tilePositionX -= 3; 
        this.planets.tilePositionX -= 1.5; 
        if (!this.gameOver) {
            // Update Rocket
            this.pRocket.update(); 
            // update Spaceships 
            this.ship1.update(); 
            this.ship2.update(); 
            this.ship3.update(); 
            this.ship4.update(); 
            this.ship5.update(); 
            this.timeleft.text = Math.ceil(this.clock.getRemainingSeconds());
        }

        // Collision check 
        if(this.checkCollision(this.pRocket, this.ship5)) {
            this.pRocket.reset(); 
            this.shipExplode(this.ship5); 
            this.clock.delay += 3000;
        }

        if(this.checkCollision(this.pRocket, this.ship4)) {
            this.pRocket.reset(); 
            this.shipExplode(this.ship4); 
            this.clock.delay += 3000;
        }
        if(this.checkCollision(this.pRocket, this.ship3)) {
            this.pRocket.reset(); 
            this.shipExplode(this.ship3); 
            this.clock.delay += 1000;
        }
        if(this.checkCollision(this.pRocket, this.ship2)) {
            this.pRocket.reset(); 
            this.shipExplode(this.ship2); 
            this.clock.delay += 1000;
        }
        if(this.checkCollision(this.pRocket, this.ship1)) {
            this.pRocket.reset(); 
            this.shipExplode(this.ship1); 
            this.clock.delay += 1000;
        }
        
        if (game.settings.mouseOn && !this.input.mouse.locked) {
            this.p1Rocket.stopMovement();
        }
        
        if (game.settings.mouseOn && this.input.mouse.locked) {
            this.p1Rocket.startMovement();
        }
    
    }

    checkCollision(rocket, ship) {
        // AABB checking
        if ( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true; 
        }
        else {
            return false; 
        }
    }

    shipExplode(ship) {
        ship.alpha = 0; 
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0); 
        boom.anims.play('explode'); 
        game.settings.gameTimer = game.settings.gameTimer + 2; 
        boom.on('animationcomplete', () => {
            ship.reset(); 
            ship.alpha = 1; 
            boom.destroy(); 
        }); 
        this.p1Score += ship.points; 
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }


    
}