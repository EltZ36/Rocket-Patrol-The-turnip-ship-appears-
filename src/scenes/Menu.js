//menu class inherits from phaser scenes 
class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }
    //load objects beforehand 
    preload(){
        //load in the rocket, background, and spaceships 
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/cluttered_starfield.png')
        //the {} is a frame config object which has the frame height and width
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64, 
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9 
        })
        //loading in audio 
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        //explosion audio 
        this.load.audio('wipe-explosion', './assets/wipe_explosion.wav')
        this.load.audio('bomba', './assets/bomba.wav')
        this.load.audio('decay-explosion', './assets/decay_explosion.wav')
        this.load.audio('high-explosion',  './assets/high_explosion.wav') 
        //shot audio 
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }
    //makes an object
    create(){
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        let menuConfig = {
            fontFamily: 'Courier', 
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0 
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = "#00FF00"
        menuConfig.color = "#000"
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- For Novice or -> for Expert', menuConfig).setOrigin(0.5)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 10000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}