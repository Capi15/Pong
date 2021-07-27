class MobileScene extends Phaser.Scene {
    changedOrientation = false;
    rightClick;
    leftClick;
    jogador;
    updated = false;

    constructor() {
        super({ key: 'MobileScene' });
    }

    init(lado) {
        this.jogador = lado.direita;
    }

    create() {
        const backgroundImage = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'mBackImg'
        );

        let scaleX = this.cameras.main.width / backgroundImage.width;
        let scaleY = this.cameras.main.height / backgroundImage.height;

        backgroundImage.setScale(scaleY).setScrollFactor(0);
        window.addEventListener('orientationchange', () => {
            this.changedOrientation = true;
        });
        this.controls();
        socket.on('ForaDeJogo', () => {
            window.location.href =
                'https://i0.wp.com/www.fbtb.net/wp-content/uploads/2017/11/gandalf.gif?fit=1180%2C488&ssl=1';
        });
    }

    update() {
        if (this.changedOrientation) {
            this.rightClick.destroy();
            this.leftClick.destroy();
            this.controls();
        }
    }

    controls() {
        if (window.innerHeight > window.innerWidth) {
            //portrait
            const aThird = this.cameras.main.width / 3;
            this.rightClick = this.add
                .sprite(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2 - aThird,
                    'arrowImg',
                    this.rightInput
                )
                .setInteractive()
                .setScale(0.2);

            this.rightClick.angle = -90;

            this.rightClick.on(
                'pointerdown',
                () => {
                    this.rightClick.setScale(0.3);
                    socket.emit('moveJogadorBaixo', this.jogador);
                },
                this
            );

            this.leftClick = this.add
                .sprite(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2 + aThird,
                    'arrowImg',
                    this.leftInput
                )
                .setInteractive()
                .setScale(0.2);

            this.leftClick.on(
                'pointerdown',
                () => {
                    this.leftClick.setScale(0.3);
                    socket.emit('moveJogadorCima', this.jogador);
                },
                this
            );
            this.leftClick.setFlipX(-1);

            this.rightClick.on(
                'pointerup',
                () => {
                    this.rightClick.setScale(0.2);
                },
                this
            );
            this.leftClick.angle = -90;

            this.leftClick.on(
                'pointerup',
                () => {
                    this.leftClick.setScale(0.2);
                },
                this
            );
        } else {
            //landscape
            const aSixth = this.cameras.main.width / 6;
            this.rightClick = this.add
                .sprite(
                    this.cameras.main.width / 2 + aSixth,
                    this.cameras.main.height / 2,
                    'arrowImg',
                    this.rightInput
                )
                .setInteractive()
                .setScale(0.2);

            this.rightClick.on(
                'pointerdown',
                () => {
                    this.rightClick.setScale(0.3);
                    socket.emit('moveJogadorBaixo', this.jogador);
                },
                this
            );

            this.leftClick = this.add
                .sprite(
                    this.cameras.main.width / 2 - aSixth,
                    this.cameras.main.height / 2,
                    'arrowImg',
                    this.leftInput
                )
                .setInteractive()
                .setScale(0.2);

            this.leftClick.on(
                'pointerdown',
                () => {
                    this.leftClick.setScale(0.3);
                    socket.emit('moveJogadorCima', this.jogador);
                },
                this
            );

            this.leftClick.setFlipX(-1);

            this.rightClick.on(
                'pointerup',
                () => {
                    this.rightClick.setScale(0.2);
                },
                this
            );

            this.leftClick.on(
                'pointerup',
                () => {
                    this.leftClick.setScale(0.2);
                },
                this
            );
        }
    }
}
