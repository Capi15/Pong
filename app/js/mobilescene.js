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
        this.controls();
    }

    update() {}

    controls() {
        const aQuarter = this.cameras.main.width / 4;
        this.rightClick = this.add
            .sprite(
                this.cameras.main.width / 2 + aQuarter,
                this.cameras.main.height / 2,
                'arrowImg',
                this.rightInput
            )
            .setInteractive();

        this.rightClick.on(
            'pointerdown',
            function (pointer) {
                this.rightClick.setScale(1.2);
            },
            this
        );

        this.leftClick = this.add
            .sprite(
                this.cameras.main.width / 2 - aQuarter,
                this.cameras.main.height / 2,
                'arrowImg',
                this.leftInput
            )
            .setInteractive();

        this.leftClick.on(
            'pointerdown',
            function (pointer) {
                this.leftClick.setScale(1.2);
            },
            this
        );

        this.leftClick.setFlipX(-1);

        this.rightClick.on(
            'pointerup',
            function (pointer) {
                this.rightClick.setScale(1);
            },
            this
        );

        this.leftClick.on(
            'pointerup',
            function (pointer) {
                this.leftClick.setScale(1);
            },
            this
        );
    }
}
