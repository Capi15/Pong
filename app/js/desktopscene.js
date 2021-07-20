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

    let XBal = this.sys.game.canvas.width / 2;
    let YBal = this.sys.game.canvas.height / 2;
    let VxBal = 0;
    let VyBal = 0;
    let VspeedBal = 5;

    VxBal = 0.1;
    VyBal = 0.1;

    this.ballImage = this.add.image(XBal, YBal, "ballImg").setScale(0.02, 0.02);
  }

  update() {
    this.XBal += this.VxBal; //posBalVx * speedBal;
    this.YBal += this.VyBal; //posBalVy * speedBal;
    this.ballImage.setPosition(this.XBal, this.YBal);
  }
  // x += vx*dt;
  // y += vy*dt;

  // if ( y + blob_radius > height ) {
  //   //vx = ????;  // fix this!
  //   //vy = ????;  // fix this!
  // }

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
