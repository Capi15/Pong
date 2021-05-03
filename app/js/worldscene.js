class WorldScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WorldScene' });
    }

    create() {
        let { width, height } = this.sys.game.canvas;
        //adiciona uma imagem de fundo ao menu
        const backgroundImage = this.add
            .image(
                this.sys.game.canvas.width / 2,
                this.sys.game.canvas.height / 2,
                'backgroundImg'
            )
            .setScale(this.width, this.height);
        const ballImage = this.add
            .image(
                this.sys.game.canvas.width / 2,
                this.sys.game.canvas.height / 2,
                'ballImg'
            )
            .setScale(0.02, 0.02);
    }
}
