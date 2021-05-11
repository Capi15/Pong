class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.load.image('startButtonImg', '/assets/images/startButton.png');
        this.load.image('backgroundImg', '/assets/images/pong_background.png');
        this.load.image('arrowImg', '/assets/images/arrow.png');
        this.load.image('acceptButtonImg', '/assets/images/acceptButton.png');
        this.load.image('ballImg', '/assets/images/ball.png');
        this.load.image('mBackImg', '/assets/images/mobileBackground.png');
        this.load.image('QrAndroid', '/assets/images/QrAndroid.png');
    }

    create() {
        // -- inicia uma nova Scene
        //this.scene.start('MenuScene');
        if (globalVariable.isDesktop) {
            this.scene.start('MenuSceneDesktop');
            console.log('Desktop');
        } else {
            this.scene.start('MenuSceneMobile');
            console.log('Mobile');
        }
    }
}
