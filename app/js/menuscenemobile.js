class MenuSceneMobile extends Phaser.Scene {
    gameDiv = document.getElementById('game');
    body = document.body;
    currPlayerName = '';
    canvasWidth;
    canvasHeight;
    message;
    changedOrientation = false;
    constructor() {
        super({ key: 'MenuSceneMobile' });
    }
    preload() {
        //this.body.classList.add('forMobile');
        this.gameCanvas = this.gameDiv.getElementsByTagName('canvas')[0];
        //this.gameCanvas.classList.add('forMobile');
        this.gameCanvas.classList.add('html');
        this.widthPos =
            this.sys.game.canvas.width / 2 - this.sys.game.canvas.width / 10;
        this.heightPos = this.sys.game.canvas.height / 2;
        this.FN = document.createElement('input');
        this.FN.setAttribute('type', 'text');
        this.FN.setAttribute('name', 'FullName');
        this.FN.setAttribute('placeholder', 'Full Name');
        this.FN.classList.add('form-control-lg', 'mb-2', 'mx-auto');
        this.FN.style.width = 250 + 'px';
        this.tag = document.createElement('div');
        this.tag.appendChild(this.FN);
        this.tag.style.zIndex = 1;
        this.tag.classList.add(
            'mx-auto',
            'my-auto',
            'd-flex',
            'align-items-center'
        );
        // this.tag.style.cssText =
        //     'left: ' + this.widthPos + 'px; top:' + this.heightPos + 'px;';
        // this.tag.style.position = 'absolute';
        this.div = this.gameDiv.getElementsByTagName('div');
        this.div[0].style.zIndex = 1;
        this.div[0].appendChild(this.tag);
    }

    create() {
        this.canvasWidth = this.sys.game.canvas.width;
        this.canvasHeight = this.sys.game.canvas.height;
        this.message = this.add
            .text(
                this.canvasWidth / 2,
                this.canvasHeight / 2 - this.canvasHeight / 5,
                'Digite o seu Nome',
                {
                    color: '#FFFFFF',
                    fontSize: 20,
                    fontStyle: 'bold',
                }
            )
            .setOrigin(0.5);

        window.addEventListener('orientationchange', () => {
            this.changedOrientation = true;
        });

        this.returnKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );

        this.returnKey.on('down', (event) => {
            this.name = this.FN;
            if (this.name.value != '') {
                this.message.setText(this.name.value);
                this.currPlayerName = this.name.value;
                this.hasChangedName = true;
            }

            var info = {
                nome: this.name.value,
                isDesktop: false,
                play: false,
            };
            socket.emit('novoPlayer', info);

            this.name.value = '';
            this.FN.remove();
            this.tag.remove();
            this.div[0].remove();
        });

        this.buttonJogar = this.add
            .image(
                this.game.canvas.width / 2,
                this.game.canvas.height / 2 + 300,
                'acceptButtonImg'
            )
            .setScale(0.3)
            .setInteractive({ useHandCursor: true });

        //click no butão jogar
        this.buttonJogar.once(
            'pointerdown',
            function (pointer) {
                console.log(this.currPlayerName);
                this.scene.start('MobileScene');
            },
            this
        );

        socket.on('MostraComando', () => {
            this.scene.start('MobileScene');
        });
    }

    update() {
        this.canvasWidth = this.sys.game.canvas.width;
        this.canvasHeight = this.sys.game.canvas.height;
        if (this.changedOrientation) {
            this.message.destroy();
            this.message = this.add
                .text(
                    this.canvasWidth / 2,
                    this.canvasHeight / 2 - this.canvasHeight / 5,
                    'Digite o seu Nome',
                    {
                        color: '#FFFFFF',
                        fontSize: 20,
                        fontStyle: 'bold',
                    }
                )
                .setOrigin(0.5);
            this.changedOrientation = false;
        }
    }
}
