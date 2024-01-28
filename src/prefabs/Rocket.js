class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.isFiring = false
        this.moveSpeed = 2
        this.sfxShot = scene.sound.add('sfx-shot')
    }

    update(){
        // for the mouse input and left click: https://labs.phaser.io/edit.html?src=src/game%20objects/graphics/mouse%20trail.js&v=3.70.0
        // and https://labs.phaser.io/view.html?src=src/input\pointer\pointer%20buttons.js
        //left/right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed
            }
            else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed
            }
            else if(pointerCLICK.distance != 0){
                this.x = pointerCLICK.worldX
                if(this.x > 594){
                    this.x = 594
                }
                else if(this.x < 46){
                    this.x = 46
                }
            }
        }
        console.log(this.x)
        //console.log(pointerCLICK.worldX)
        //console.log(pointerCLICK.distance)
        //fire button with both keyboard input and mouse input
        if((Phaser.Input.Keyboard.JustDown(keyFIRE) || pointerCLICK.leftButtonDown()) && !this.isFiring){
            this.isFiring = true
            this.sfxShot.play() 
        }
        //if fire move up 
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed
        }
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false
            this.y = game.config.height - borderUISize - borderPadding
        } 
    }

    reset(){
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
    }
}
