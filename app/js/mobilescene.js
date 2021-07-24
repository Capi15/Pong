class MobileScene extends Phaser.Scene {
    changedOrientation = false;
    rightClick;
    leftClick;
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
        window.addEventListener('orientationchange', () => {
            this.changedOrientation = true;
        });
        this.controls();
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
                function (pointer) {
                    this.rightClick.setScale(0.3);
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
                function (pointer) {
                    this.leftClick.setScale(0.3);
                },
                this
            );

            this.leftClick.setFlipX(-1);

            this.rightClick.on(
                'pointerup',
                function (pointer) {
                    this.rightClick.setScale(0.2);
                },
                this
            );

            this.leftClick.on(
                'pointerup',
                function (pointer) {
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
                function (pointer) {
                    this.rightClick.setScale(0.3);
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
                function (pointer) {
                    this.leftClick.setScale(0.3);
                },
                this
            );

            this.leftClick.setFlipX(-1);

            this.rightClick.on(
                'pointerup',
                function (pointer) {
                    this.rightClick.setScale(0.2);
                },
                this
            );

            this.leftClick.on(
                'pointerup',
                function (pointer) {
                    this.leftClick.setScale(0.2);
                },
                this
            );
        }
    }
}
