//configurações de jogo
const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1000,
    heigth: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: [BootScene, MenuScene, InstructionsScene, WorldScene, GameOver],
};

//exportação das configurações de jogo
let game = new Phaser.Game(config);
