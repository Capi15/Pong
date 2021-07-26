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

    // controls() {
    //     if (window.innerHeight > window.innerWidth) {
    //         //portrait
    //         const aThird = this.cameras.main.width / 3;
    //         this.rightClick = this.add
    //             .sprite(
    //                 this.cameras.main.width / 2,
    //                 this.cameras.main.height / 2 - aThird,
    //                 'arrowImg',
    //                 this.rightInput
    //             )
    //             .setInteractive()
    //             .setScale(0.2);

    //         this.rightClick.angle = -90;

    //         this.rightClick.on(
    //             'gameobjectdown',
    //             function (pointer) {
    //                 this.rightClick.setScale(0.3);
    //             },
    //             this
    //         );

    //         this.leftClick = this.add
    //             .sprite(
    //                 this.cameras.main.width / 2,
    //                 this.cameras.main.height / 2 + aThird,
    //                 'arrowImg',
    //                 this.leftInput
    //             )
    //             .setInteractive()
    //             .setScale(0.2);

    //         this.leftClick.on(
    //             'gameobjectdown',
    //             function (pointer) {
    //                 this.leftClick.setScale(0.3);
    //             },
    //             this
    //         );

    //         this.leftClick.setFlipX(-1);

    //         this.rightClick.on(
    //             'gameobjectup',
    //             function (pointer) {
    //                 this.rightClick.setScale(0.2);
    //             },
    //             this
    //         );
    //         this.leftClick.angle = -90;

    //         this.leftClick.on(
    //             'gameobjectup',
    //             function (pointer) {
    //                 this.leftClick.setScale(0.2);
    //             },
    //             this
    //         );
    //     } else {
    //         //landscape
    //         const aSixth = this.cameras.main.width / 6;
    //         this.rightClick = this.add
    //             .sprite(
    //                 this.cameras.main.width / 2 + aSixth,
    //                 this.cameras.main.height / 2,
    //                 'arrowImg',
    //                 this.rightInput
    //             )
    //             .setInteractive()
    //             .setScale(0.2);

    //         this.leftClick = this.add
    //             .sprite(
    //                 this.cameras.main.width / 2 - aSixth,
    //                 this.cameras.main.height / 2,
    //                 'arrowImg',
    //                 this.leftInput
    //             )
    //             .setInteractive()
    //             .setScale(0.2);
    //     }
    // }

    controls() {
        if (window.innerHeight > window.innerWidth) {
            //portrait
            const aThird = this.cameras.main.width / 3;
            this.rightClick = this.add
                .sprite(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2 - aThird,
                    'arrowImg',
                    this.rightInput
                )
                .setInteractive()
                .setScale(0.2);

            this.rightClick.angle = -90;

            this.rightClick.on(
                this.input.activePointer.isDown,
                function (pointer) {
                    this.rightClick.setScale(0.3);
                },
                this
            );

            this.leftClick = this.add
                .sprite(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2 + aThird,
                    'arrowImg',
                    this.leftInput
                )
                .setInteractive()
                .setScale(0.2);

            this.leftClick.on(
                this.input.activePointer.isDown,
                function (pointer) {
                    this.leftClick.setScale(0.3);
                },
                this
            );

            this.leftClick.setFlipX(-1);

            this.rightClick.on(
                this.input.activePointer.isUp,
                function (pointer) {
                    this.rightClick.setScale(0.2);
                },
                this
            );
            this.leftClick.angle = -90;

            this.leftClick.on(
                this.input.activePointer.isUp,
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
                this.input.activePointer.isDown,
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
                this.input.activePointer.isDown,
                function (pointer) {
                    this.leftClick.setScale(0.3);
                },
                this
            );

            this.leftClick.setFlipX(-1);

            this.rightClick.on(
                this.input.activePointer.isUp,
                function (pointer) {
                    this.rightClick.setScale(0.2);
                },
                this
            );

            this.leftClick.on(
                this.input.activePointer.isDown,
                function (pointer) {
                    this.leftClick.setScale(0.2);
                },
                this
            );
        }
    }
}
