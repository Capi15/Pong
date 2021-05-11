class BlockGame extends Phaser.Scene {
    constructor() {
        super({ key: 'BlockGame' });
    }

    create() {
        this.denied = this.add.text( 
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2, 
            'Acesso bloqueado. By By' );
    }

}