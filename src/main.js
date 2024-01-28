//have a config object beforehand to get the settings we want 
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

