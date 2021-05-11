class MobileScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MobileScene' });
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

        const aQuarter = this.cameras.main.width / 4
        let rightClick = this.add.sprite(
            this.cameras.main.width/2  + aQuarter,
            this.cameras.main.height / 2,
            'arrowImg',
            this.rightInput
        ).setInteractive();


        this.rightClick.on('pointerdown',
        function (pointer) {
            this.setScale(1.2);
        },
            this)

        let leftClick = this.add.sprite(
            this.cameras.main.width/2 - aQuarter,
            this.cameras.main.height / 2,
            'arrowImg',
            this.leftInput
        ).setInteractive();

        this.leftClick.on('pointerdown',
        function (pointer) {
            this.setScale(1.2);
        },
            this)
        
        leftClick.setFlipX(-1)

        rightClick.onInputOut.add(this.outRight, this);
        leftClick.onInputOut.add(this.outLeft, this);



    }
}
