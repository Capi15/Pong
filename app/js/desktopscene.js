class DesktopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DesktopScene' });
    }

    create() {
        let { width, height } = this.sys.game.canvas;
        //adiciona uma imagem de fundo ao menu
        const backgroundImage = this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'backgroundImg'
        );

        // let scaleX = this.cameras.main.width / backgroundImage.width;
        let scaleY = this.cameras.main.height / backgroundImage.height;

        backgroundImage.setScale(scaleY).setScrollFactor(0);
        const ballImage = this.add
            .image(
                this.sys.game.canvas.width / 2,
                this.sys.game.canvas.height / 2,
                'ballImg'
            )
            .setScale(0.02, 0.02);
    }
}
