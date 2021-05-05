let IS_TOUCH = false;
let gameWidth;
let gameHeight;
let sceneArray;

let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
console.log(isMobile);

let isDesktopPlatform = true;

if (isMobile) {
    isDesktopPlatform = true;

    gameWidth = 1000;
    gameHeight = 600;
    sceneArray = [BootScene, MenuSceneDesktop, DesktopScene, GameOverDesktop];
} else {
    isDesktopPlatform = false;

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
    dom: {
        createContainer: true
    },
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

var globalVariable = {
    isDesktop: isDesktopPlatform,
};
//exportação das configurações de jogo
let game = new Phaser.Game(config);
