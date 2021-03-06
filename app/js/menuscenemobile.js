class MenuSceneMobile extends Phaser.Scene {
    gameDiv = document.getElementById('game');
    body = document.body;
    currPlayerName = '';
    constructor() {
        super({ key: 'MenuSceneMobile' });
    }
    preload() {
        //this.body.classList.add('forMobile');
        this.gameCanvas = this.gameDiv.getElementsByTagName('canvas')[0];
        //this.gameCanvas.classList.add('forMobile');
        this.gameCanvas.classList.add('html');
        this.widthPos = this.sys.game.canvas.width / 2 - 1/3;
        this.heightPos = this.sys.game.canvas.height / 2 + 1/3;
        this.FN = document.createElement('input');
        this.FN.setAttribute('type', 'text');
        this.FN.setAttribute('name', 'FullName');
        this.FN.setAttribute('placeholder', 'Full Name');
        this.FN.classList.add('form-control-lg', 'mb-2');
        this.FN.style.width = 400 + 'px';
        this.tag = document.createElement('div');
        this.tag.appendChild(this.FN);
        this.tag.style.zIndex = 1;
        this.tag.style.cssText =
            'left: ' + this.widthPos + 'px; top:' + this.heightPos + 'px;';
        this.tag.style.position = 'absolute';
        this.div = this.gameDiv.getElementsByTagName('div');
        this.div[0].style.zIndex = 1;
        this.div[0].appendChild(this.tag);
    }

    create() {
        // SocketAnd = io.connect('https://warm-citadel-14378.herokuapp.com/');

        this.message = this.add
            .text(
                this.sys.game.canvas.width / 2,
                this.sys.game.canvas.height / 2,
                'Digite o seu Nome',
                {
                    color: '#FFFFFF',
                    fontSize: 40,
                    fontStyle: 'bold',
                }
            )
            .setOrigin(0.5);

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

        //click no but??o jogar
        this.buttonJogar.once(
            'pointerdown',
            function (pointer) {
                console.log(this.currPlayerName);
                this.scene.start('MobileScene');
            },
            this
        );
    }
}
