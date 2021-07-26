class BootScene extends Phaser.Scene {
    kick = false;
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
        this.load.image('pe', '/assets/images/p1.png');
        this.load.image('pd', '/assets/images/p2.png');
    }

    create() {
        window.addEventListener('resize', resize);
        window.addEventListener('orientationchange', resize);
        resize();
        // -- inicia uma nova Scene
        //this.scene.start('MenuScene');
        socket.on('valida', (valida) => {
            // console.log("adeus");
            // this.scene.start('BlockGame');
            window.location.href =
                'https://i0.wp.com/www.fbtb.net/wp-content/uploads/2017/11/gandalf.gif?fit=1180%2C488&ssl=1';
            this.kick = true;
        });

        if (globalVariable.isDesktop) {
            if (!this.kick) {
                this.scene.start('MenuSceneDesktop'); // alterado para verificar o jogo no descktop. Voltar a meter ""MenuSceneDesktop"""
                // console.log('Desktop');
            }
        } else {
            this.scene.start('MenuSceneMobile');
            // console.log('Mobile');
        }
    }
}
