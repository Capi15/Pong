let IS_TOUCH = false;
let gameWidth;
let gameHeight;
let sceneArray;

window.addEventListener('touchstart', function () {
    IS_TOUCH = true;
});

if (!IS_TOUCH) {
    gameWidth = 1000;
    gameHeight = 600;
    sceneArray = [BootScene, MenuSceneDesktop, DesktopScene, GameOverDesktop];
} else {
    gameWidth = 500;
    gameHeight = 300;
    sceneArray = [
        BootScene,
        MenuSceneMobile,
        InstructionsScene,
        MobileScene,
        GameOverMobile,
    ];
}

//configurações de jogo
const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: gameWidth,
    heigth: gameHeight,
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
    scene: sceneArray,
};

//exportação das configurações de jogo
let game = new Phaser.Game(config);
