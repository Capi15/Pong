let IS_TOUCH = false;
let gameWidth;
let gameHeight;
let sceneArray;
let gameBody = document.getElementsByTagName("body")[0];
let gameDiv = document.getElementById("game");
let title = document.createElement("h1");
gameBody.prepend(title);
title.classList.add("text-center", "mt-3");

let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let isDesktopPlatform = true;

if (!isMobile) {
  gameDiv.classList.add("deskBack");
  title.textContent += "Pong";
  isDesktopPlatform = true;

  gameWidth = 1000;
  gameHeight = 600;
  sceneArray = [
    BootScene,
    DesktopScene,
    MenuSceneDesktop,
    GameOverDesktop,
    BlockGame,
  ];
} else {
  gameDiv.classList.add("mobileBack");
  isDesktopPlatform = false;
  document.querySelector("h1.text-center.mt-3").remove();

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
  parent: "game",
  width: gameWidth,
  heigth: gameHeight,
  dom: {
    createContainer: true,
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
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

function resize() {
  const canvas = game.canvas,
    width = window.innerWidth,
    height = window.innerHeight;
  console.log(canvas);
  canvas.width = width;
  canvas.height = height;
  window.requestAnimationFrame(() => {
    canvas.removeAttribute("style");
  });
}
