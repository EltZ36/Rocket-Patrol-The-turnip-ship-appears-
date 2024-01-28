class SpaceShip extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed 
        this.ship_random = Math.floor(Math.random() * 2)
    }

    update() {
        if(this.ship_random == 0){
            this.x -= this.moveSpeed
            if(this.x <= 0 - this.width) {
                this.x = game.config.width 
            }
        }   
        else{
            this.x += this.moveSpeed
            //I found the wrapping with this old code found on https://stackoverflow.com/questions/25713429/wrap-a-sprite-portion-outside-the-boundary-to-the-other-side
            if(this.x > game.config.width + this.width){
                this.x = -30;
            }
            this.flipX = true;
        }
    }

    reset(){
        if(this.ship_random == 0){
            this.x = game.config.width
        }
        else{
            this.x = -30
        }
    }

    //get the random value of the ship and follow the black box implementation of classes
    getRandom(){
        return this.ship_random 
    }

    speedUp(){
        this.moveSpeed = this.moveSpeed * 2
    }
}