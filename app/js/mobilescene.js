class MobileScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MobileScene' });
    }

    create() {
        let scaleY = this.cameras.main.height / backgroundImage.height;
        const backgroundImage = this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'mBackImg'
        );
    }
}
