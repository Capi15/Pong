class DesktopScene extends Phaser.Scene {
  constructor() {
    super({ key: "DesktopScene" });
  }

  ballImage;
  create() {
    console.log("L7 DesktopScene Dentro");

    let { width, height } = this.sys.game.canvas;
    //adiciona uma imagem de fundo ao menu
    const backgroundImage = this.add.image(
      this.sys.game.canvas.width / 2,
      this.sys.game.canvas.height / 2,
      "backgroundImg"
    );

    // let scaleX = this.cameras.main.width / backgroundImage.width;
    let scaleY = this.cameras.main.height / backgroundImage.height;

    backgroundImage.setScale(scaleY).setScrollFactor(0);

    let VxBal = 1;
    let VyBal = 1;
    let VspeedBal = 5;
    let tamanho = 0.02;

    this.VxBal = 0.1;
    this.VyBal = 0.1;

    this.ballImage = this.add
      .sprite(
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 2,
        "ballImg"
      )
      .setScale(0.02, 0.02);
  }

  update() {
    this.ballImage.y += VyBal;
    this.ballImage.x += VxBal;

    if (this.ballImage.y + tamanho >= this.sys.game.canvas.height) {
      this.VyBal -= 0.1;
    }
    if (this.ballImage.x + tamanho >= this.sys.game.canvas.width) {
      this.VxBal -= 0.1;
    }
    if (this.ballImage.y + tamanho <= this.sys.game.canvas.height) {
      this.VxBal += 0.1;
    }
    if (this.ballImage.x + tamanho <= this.sys.game.canvas.width) {
      this.VxBal += 0.1;
    }
    //commit
  }

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
