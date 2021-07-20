class DesktopScene extends Phaser.Scene {
    perdeu = false;
    bola;
    VxBal = 1;
    VyBal = 1;
    centerX;
    centerY;
    VspeedBal = 5;
    difCentro = 120;

    constructor() {
        super({ key: 'DesktopScene' });
    }

    // ballImage;

    setup() {
        this.centerX = this.sys.game.canvas.width / 2;
        this.centerY = this.sys.game.canvas.height / 2;
        frameRate(60);
        smooth();
        noCursor();
        this.initJogo();

        //somFundo.loop();
    }

    initJogo() {
        this.perdeu = false;
        this.VxBal = 1;
        this.VyBal = 1;
        this.centerX = width / 2 - difCentro;
        this.centerY = height / 2 - difCentro;
        // -- desenhar os players
        //this.initPlayers();
    }

    //initPlayers() {}

    spawnBola() {
        let randX = integerInRange(-50, 50);
        let randY = integerInRange(-50, 50);
        let dx = randX - this.centerX - this.difCentro;
        let dy = randY - this.centerY - this.difCentro;

        let angulo = atan2(dy, dx);

        translate(this.centerX + difCentro, this.centerY + difCentro);
        rotate(angulo);
        bola = new Bola(
            this.centerX + this.difCentro,
            this.centerY + this.difCentro,
            angulo,
            this.VspeedBal
        );

        if (perdeu) {
            initJogo();
            perdeu = false;
            loop();
        }
    }

    create() {
        console.log('L7 DesktopScene Dentro');

        let { width, height } = this.sys.game.canvas;
        //adiciona uma imagem de fundo ao menu
        const backgroundImage = this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'backgroundImg'
        );

        // let scaleX = this.cameras.main.width / backgroundImage.width;
        let scaleY = this.cameras.main.height / backgroundImage.height;

        backgroundImage.setScale(scaleY).setScrollFactor(0);

        this.bola = new Bola(centerX, centerY, -1, VspeedBal);

        // let VxBal = 1;
        // let VyBal = 1;

        // let tamanho = 0.02;

        // this.VxBal = 0.1;
        // this.VyBal = 0.1;

        // this.ballImage = this.add
        //     .sprite(
        //         this.sys.game.canvas.width / 2,
        //         this.sys.game.canvas.height / 2,
        //         'ballImg'
        //     )
        //     .setScale(0.02, 0.02);
    }

    draw() {
        if (!this.perdeu) {
            this.bola.moveBola();
        }
    }

    update() {}

    // if ( (x - blob_radius < 0) | (x + blob_radius > width) ) {
    //    //vx = ????;  // fix this!
    //    //vy = ????;  // fix this!
    // }

    // if ( (y - blob_radius < ypaddle) & abs(x - xpaddle) < paddle_width/2) {
    //   //vx = ????;  // fix this!
    //   //vy = ????;  // fix this!
    // }

    // // Move the paddle
    // if (keyIsDown(LEFT_ARROW)) {
    //    xpaddle += -10;
    // }

    // if (keyIsDown(RIGHT_ARROW)) {
    //    xpaddle += 10;
    // }

    // // Draw axes and other stuff
    // // This will clear the screen and re-draw it
    // display();

    // drawBlob(x,y,vx,vy,blob_radius);
    // drawLine(xpaddle-paddle_width/2,ypaddle,xpaddle+paddle_width/2,ypaddle);
}
