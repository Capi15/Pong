class DesktopScene extends Phaser.Scene {
    //var bola
    bola;
    posXBal;
    posYBal;
    posVXBal;
    posVYBal;
    vSpeedBal;
    corPlayeEsquerda = 0x0099ff;
    corPayerDireita = 0x990000;
    sizeB;

    //var jogaEsquerda
    peJogador;
    peX;
    peY;
    pontuacaoPe;

    //var jogaDireita
    pdJogador;
    pdX;
    pdY;
    pontuacaoPd;

    //var GameDescktopScene
    perdeu = false;
    width;
    height;
    ronda = 0;

    //textos
    textoPontuacao;

    constructor() {
        super({ key: 'DesktopScene' });
    }

    create() {
        // Define tamanho do ecra de jogo
        this.width = this.sys.game.canvas.width;
        this.height = this.sys.game.canvas.height;
        this.peX = (this.width * 2) / 10;
        this.pdX = (8 * this.width) / 10;
        //Define posição da bola no centro do jogo
        this.posXBal = this.width / 2;
        this.posYBal = this.height / 2;

        this.peY = this.posYBal;
        this.pdY = this.posYBal;

        console.log('L7 DesktopScene Dentro');

        //adiciona uma imagem de fundo ao menu
        const backgroundImage = this.add.image(
            this.posXBal,
            this.posYBal,
            'backgroundImg'
        );

        //Cria objecto bola
        this.bola = this.add
            .image(this.posXBal, this.posYBal, 'ballImg')
            .setScale(0.05);

        this.sizeB = this.bola.width * 0.05;

        //Cria Jogador 1
        this.peJogador = this.add.rectangle(
            this.peX,
            this.peY,
            10,
            100,
            0x6666ff
        );

        //Cria Jogador 2
        this.pdJogador = this.add.rectangle(
            this.pdX,
            this.pdY,
            10,
            100,
            0x6666ff
        );

        this.textoPontuacao = this.add.text(
            this.posXBal,
            10,
            'Ronda -> ' + this.ronda + '/3'
        );

        // let scaleX = this.cameras.main.width / backgroundImage.width;
        let scaleY = this.cameras.main.height / backgroundImage.height;
        backgroundImage.setScale(scaleY).setScrollFactor(0);
        this.initJogo();

        //Alterar a informação com o que vem do servidor
        socket.on('moveJogadorPe', (data) => {
            if (data) {
                this.peY++;
            } else {
                this.peY--;
            }
        });

        socket.on('moveJogadorPd', (data) => {
            if (data) {
                this.pdY++;
            } else {
                this.pdY--;
            }
        });
    }

    initJogo() {
        // this.textoPontuacao.setText('Ronda -> ' + ronda + '/3');
        this.textoPontuacao.setText(
            this.pontuacaoPe + ' / ' + this.pontuacaoPd
        );

        //RetornaValores JogadorPe
        this.peY = this.height / 2;
        this.peJogador.setY(this.peY);

        //RetornaValores JogadorPd
        this.pdY = this.height / 2;
        this.pdJogador.setY(this.pdY);

        //RetornaValores bola
        this.vSpeedBal = 0.3;
        this.posVXBal = 3;
        this.posVYBal = 3;
        this.bola.setPosition(this.posXBal, this.posYBal);
    }

    update() {
        if (!this.perdeu) {
            this.moveTudo();
            this.verificaJogo();
        }
    }

    verificaJogo() {
        console.log(this.posVXBal);
        if (this.bola.x - this.sizeB / 2 >= this.pdJogador.x) {
            this.posVXBal = -(this.posVXBal + this.vSpeedBal);
        }
        if (this.bola.y >= this.height) {
            this.posVYBal = -this.posVYBal;
        }
        if (this.bola.x + this.sizeB / 2 <= this.peJogador.x) {
            this.posVXBal = -(this.posVXBal - this.vSpeedBal);
        }
        if (this.bola.y <= 0) {
            this.posVYBal = -this.posVYBal;
        }
    }

    //Informa as posições dos objectos
    moveTudo() {
        this.posXBal += this.posVXBal;
        this.posYBal += this.posVYBal;
        //this.peJogador.setY(this.peX);
        //this.pdJogador.setY(this.pdX);
        this.bola.setPosition(this.posXBal, this.posYBal);
    }
}
