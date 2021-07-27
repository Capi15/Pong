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
    colidePe = false;

    //var jogaDireita
    pdJogador;
    pdX;
    pdY;
    pontuacaoPd;
    colidePd = false;

    //var GameDescktopScene
    backgroundImage;
    perdeu = false;
    width;
    height;
    ronda = 1;
    perdeuEsquerda = true;
    passeBola = false;
    passaForca = false;
    collisionPe;
    collisionPd;

    //textos
    textoPontuacao;
    textoRonda;

    constructor() {
        super({ key: 'DesktopScene' });
    }

    create() {
        // Define tamanho do ecra de jogo
        // this.bola.physics.arcade.checkCollision.right = false;
        // this.bola.physics.arcade.checkCollision.left = false;

        this.width = this.sys.game.canvas.width;
        this.height = this.sys.game.canvas.height;
        this.peX = this.width / 10;
        this.pdX = (9 * this.width) / 10;
        //Define posição da bola no centro do jogo

        this.peY = this.posYBal;
        this.pdY = this.posYBal;
        this.posXBal = this.width / 2;
        this.posYBal = this.height / 2;

        //adiciona uma imagem de fundo ao menu
        this.backgroundImage = this.physics.add.image(
            this.posXBal,
            this.posYBal,
            'backgroundImg'
        );

        //Cria objecto bola
        this.bola = this.physics.add
            .image(this.posXBal + 10, this.posYBal, 'ballImg')
            .setScale(0.05);
        //this.bola.setCircle(200);

        this.sizeB = this.bola.width * 0.05;

        //Cria Jogador 1
        this.peJogador = this.physics.add
            .image(this.peX, this.peY, 'pe')
            .setScale(0.6);
        // //Teste collider Bola com players

        //Cria Jogador 2
        this.pdJogador = this.physics.add
            .image(this.pdX, this.pdY, 'pd')
            .setScale(0.6);

        this.textoRonda = this.add.text(
            50,
            this.height - 30,
            'Ronda -> ' + this.ronda + '/5'
        );
        this.pontuacaoPe = 0;
        this.pontuacaoPd = 0;

        this.textoPontuacao = this.add.text(
            this.posXBal - 50,
            40,
            this.pontuacaoPe + ' / ' + this.pontuacaoPd
        );

        // let scaleX = this.cameras.main.width / backgroundImage.width;
        let scaleY = this.cameras.main.height / this.backgroundImage.height;
        this.backgroundImage.setScale(scaleY).setScrollFactor(0);
        this.initJogo();

        const canvas = this.sys.canvas.height;

        //Alterar a informação com o que vem do servidor
        socket.on('CimaJogadorE', () => {
            if (
                this.peJogador.y + this.peJogador.displayHeight / 2 <=
                this.height
            ) {
                this.peY += 10;
            }
        });
        socket.on('BaixoJogadorE', () => {
            if (this.peY - this.peJogador.displayHeight / 2 >= 0) {
                this.peY -= 10;
            }
        });
        socket.on('CimaJogadorD', () => {
            if (
                this.pdJogador.y + this.pdJogador.displayHeight / 2 <=
                this.height
            ) {
                this.pdY += 10;
            }
        });
        socket.on('BaixoJogadorD', () => {
            if (this.pdY - this.peJogador.displayHeight / 2 >= 0) {
                this.pdY -= 10;
            }
        });

        socket.on('moveJogadorPd', (data) => {
            if (data) {
                this.pdY++;
            } else {
                this.pdY--;
            }
        });

        socket.on('NovoEcraJogo', () => {
            this.scene.start('MenuSceneDesktop');
        });
    }

    initJogo() {
        // setInterval(()=>{ this.passeBola = false); }, 50);
        this.passeBola = false;
        this.passaForca = false;
        this.posXBal = this.width / 2;
        this.posYBal = this.height / 2;

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
        // let randomMove = parseFloat(Phaser.Math.FloatBetween(0, this.sys.game.canvas.height));
        let randX = parseFloat(
            Phaser.Math.FloatBetween(
                (2 / 5) * this.sys.game.canvas.height,
                this.sys.game.canvas.height
            ) / this.sys.game.canvas.height
        );
        let randY =
            this.sys.game.canvas.height / this.sys.game.canvas.height - randX;
        let intensidade = 10;

        if (this.ronda > 1) {
            if (this.perdeuEsquerda) {
                this.posVXBal = -randX * intensidade;
                this.posVYBal = -randY * intensidade;
            } else {
                this.posVXBal = randX * intensidade;
                this.posVYBal = randY * intensidade;
            }
        } else {
            let randSignal = Phaser.Math.RND.between(0, 1);

            if (randSignal === 0) {
                this.posVXBal = randX * intensidade;
                this.posVYBal = randY * intensidade;
                // this.posVXBal = 40;
                // this.posVYBal = 0;
            } else {
                this.posVXBal = -randX * intensidade;
                this.posVYBal = -randY * intensidade;
                // this.posVXBal = 40;
                // this.posVYBal = 0;
            }
        }

        this.vSpeedBal = 1;
        this.bola.setPosition(this.posXBal, this.posYBal);
    }

    fimRonda() {
        if (this.bola.x > this.width / 2) {
            //perdeu direita
            this.perdeuEsquerda = false;
        } else {
            //perdeu equerda
            this.perdeuEsquerda = true;
        }
        if (this.ronda < 6) {
            this.ronda++;
            this.initJogo();
        }

        if (this.pontuacaoPd === 3 || this.pontuacaoPe === 3) {
            this.perdeu = true;
            this.textoFinalJogo = this.add.text(
                this.width / 2,
                this.height / 2,
                ''
            );
            if (this.pontuacaoPd > this.pontuacaoPe) {
                this.textoFinalJogo.setText('Jogador da direita ganhou!!');
            } else {
                // this.textoFinalJogo.setText("Jogador " + + " venceu!")
                this.textoFinalJogo.setText('Jogador da esquerda venceu!');
            }
            this.awaitForStart();
        }
    }

    awaitForStart() {
        this.timedEvent = this.time.addEvent({
            delay: 10000,
            callback: this.startAgain,
            callbackScope: this,
            loop: false,
        });
    }

    newGame() {
        this.pontuacaoPe = 0;
        this.pontuacaoPd = 0;
        this.ronda = 1;
        this.initJogo();
    }

    update() {
        if (!this.perdeu) {
            this.moveTudo();
            this.verificaJogo();
        }
    }

    startAgain() {
        socket.emit('GameOver');
        // newGame();
    }

    verificaJogo() {
        //Verifica colisao bola
        if (!this.passeBola) {
            if (this.physics.collide(this.bola, this.peJogador)) {
                this.passeBola = true;
                if (!this.passaForca) {
                    this.posVXBal = -(this.posVXBal - this.vSpeedBal);
                    this.passaForca = true;
                }
                // this.collisionPe.active = false;
                // this.posVXBal = this.bola.setBounce(1, 1);
            } else if (this.physics.collide(this.bola, this.pdJogador)) {
                this.passeBola = true;
                if (!this.passaForca) {
                    this.posVXBal = -(this.posVXBal + this.vSpeedBal);
                    this.passaForca = true;
                }
                // this.collisionPd.active = false;
                // this.posVXBal = -(this.posVXBal + this.vSpeedBal);
            } else if (
                !this.physics.collide(this.bola, this.pdJogador) &&
                !this.physics.collide(this.bola, this.peJogador)
            ) {
                this.passaForca = false;
            }
        } else {
            this.passeBola = false;
            // this.posVXBal = -(this.posVXBal + this.vSpeedBal);
        }

        if (this.bola.x - this.sizeB / 2 >= this.pdJogador.x) {
            //player esquerda
            this.posVXBal = -(this.posVXBal + this.vSpeedBal);
            this.textoRonda.setText('Ronda -> ' + this.ronda + '/5');
            this.pontuacaoPe++;
            this.fimRonda();
        }
        if (this.bola.y >= this.height) {
            this.posVYBal = -this.posVYBal;
        }
        if (this.bola.x + this.sizeB / 2 <= this.peJogador.x) {
            //player
            this.posVXBal = -(this.posVXBal - this.vSpeedBal);
            this.textoRonda.setText('Ronda -> ' + this.ronda + '/5');
            this.pontuacaoPd++;
            this.fimRonda();
        }
        if (this.bola.y <= 0) {
            this.posVYBal = -this.posVYBal;
        }
    }

    //Informa as posições dos objectos
    moveTudo() {
        this.posXBal += this.posVXBal;
        this.posYBal += this.posVYBal;
        this.bola.setPosition(this.posXBal, this.posYBal);
        this.peJogador.setY(this.peY);
        this.pdJogador.setY(this.pdY);
    }
}
