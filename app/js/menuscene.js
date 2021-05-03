class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        this.buttonJogar = this.add
            .image(
                this.game.canvas.width / 2,
                this.game.canvas.height / 2,
                'startButtonImg'
            )
            .setScale(0.3)
            .setInteractive({ useHandCursor: true });

        //click no butão jogar
        this.buttonJogar.once(
            'pointerdown',
            function (pointer) {
                this.scene.start('WorldScene');
            },
            this
        );
    }
}
