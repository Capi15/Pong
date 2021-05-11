class MobileScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MobileScene' });
    }

    create() {
        const backgroundImage = this.add.image(
            this.cameras.main.width / this.width,
            this.cameras.main.height / this.height,
            'mBackImg'
        );
    }
}
