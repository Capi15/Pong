class WaitingMobileScene extends Phaser.Scene {
    changedOrientation = false;
    WaintingText;
    CurrGameRounds;

    constructor() {
        super({ key: 'WaitingMobileScene' });
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

        this.WaintingText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            ''
        );

        socket.on('SalaDeEspera', () => {
            this.scene.start('WaitingMobileScene');
        });
    }

    update() {}
}
