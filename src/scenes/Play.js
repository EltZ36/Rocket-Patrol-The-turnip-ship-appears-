//menu class inherits from phaser scenes 
class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }
    //makes an object
    create(){
        //tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0)
        //green background 
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0)
        //white borders 
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, 0 , borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        //adding in the rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0)
        //keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        pointerCLICK = this.input.activePointer;
        //adding the three spaceships 
        this.ship01 = new SpaceShip(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0)
        this.ship02 = new SpaceShip(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new SpaceShip(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0,0)
        //changing positions if their directions change
        if(this.ship01.getRandom() == 1){
            this.ship01.setX(-100)
        }
        if(this.ship02.getRandom() == 1){
            this.ship02.setX(-250)
        }
        if(this.ship03.getRandom() == 1){
            this.ship03.setX(-370)
        }
        //the fastest ship 
        this.turnip_ship = new TurnipShip(this, game.config.width, borderUISize * 8 + borderPadding * 5, 'turnipship',0,50).setOrigin(0,0)
        //score
        this.p1Score = 0
        //display the score 
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig)
        //time should either decrease or just increase to that limit
        //code for the timer is gotten from the example: https://labs.phaser.io/edit.html?src=src\time\timer%20event.js
        //I used the code above for lines 60, 61, and 131
        this.speed_up = false
        this.timer = this.time.addEvent({delay: 30000, callback: () => {this.speed_up = true}, loop: false})
        this.text = this.add.text(borderUISize + 450, borderUISize + borderPadding * 2, '', scoreConfig);
        //the fire ui and it should disappear with the key press f 
        let fireConfig = {
            fontFamily: 'Courier', 
            fontSize:'28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.fireCenter = this.add.text(250, borderUISize + borderPadding * 2, 'fire',fireConfig)
        //game over flag
        this.gameOver = false 
        //60 seconds play clock 
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true 
        }, null, this)
    }

    update(){
        //check key input for restarting 
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart() 
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start('menuScene')
        }
        this.starfield.tilePositionX -= 4
        if(this.checkCollison(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if(this.checkCollison(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if(this.checkCollison(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
        if(this.checkCollison(this.p1Rocket, this.turnip_ship)){
            this.p1Rocket.reset()
            this.shipExplode(this.turnip_ship)
        }
        if(!this.gameOver){
            this.p1Rocket.update()
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.turnip_ship.update()
            this.fireUpdate(this.p1Rocket)
            //speed up the ship and then stop the increment otherwise it just disappears 
            if(this.speed_up == true){
                this.ship01.speedUp()
                this.ship02.speedUp()
                this.ship03.speedUp()
                this.turnip_ship.speedUp()
                this.speed_up = false;
            }
        }
        //I also used the documentation here for the remaining timer left for the timers: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/
        this.timerProgress = this.clock.getRemainingSeconds()
        this.text.setText(`${Math.round(this.timerProgress)}`);
    }

    //collison checking
    checkCollison(rocket, ship){
        //checking if the rectangles of the ship overlap 
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true 
        }
        else{
            return false 
        }
    }

    shipExplode(ship){
        //hide the ship temp 
        ship.alpha = 0
        //create explosion sprite at the ship's position 
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0)
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            ship.reset()
            ship.alpha = 1
            boom.destroy()
        })
        //score add and update the text
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        //have a random number generator here with console.log that goes from 0 to 3. 
        let rand_num = Math.floor(Math.random() * 4)
        if(rand_num == 0){
            this.sound.play('wipe-explosion')
        }
        else if(rand_num == 1){
            this.sound.play('decay-explosion')
        }
        else if(rand_num == 2){
            this.sound.play('high-explosion')
        }
        else if(rand_num == 3){
            this.sound.play('bomba')
        }
    }

    fireUpdate(rocket){
        if(rocket.isFiring){
            this.fireCenter.setVisible(true);
        }
        else{
            this.fireCenter.setVisible(false);
        }
    }

    speedUpdate(ship){
        ship.moveSpeed = ship.moveSpeed * 2
    }
}