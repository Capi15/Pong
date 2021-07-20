class Bola {
    width;
    height;

    constructor(px, py, dir, vel, width, height) {
        // -- posição
        this.x, this.y;

        // -- velocidade
        this.myvx, this.myvy;

        // -- posicionar Bola
        this.x = px;
        this.y = py;

        this.width = width;
        this.height = height;

        this.myvx = vel * Math.cos(dir);
        this.myvy = vel * Math.sin(dir);
    }

    // -- moveBola()

    moveBola() {
        this.x += this.myvx;
        this.y += this.myvy;

        // console.log('Boas');
        // console.log(this.x);
        // console.log(this.y);

        // -- verificar se a bola sai do canvas

        if (this.y >= this.height) {
            this.y -= 0.1;
        }
        if (this.x >= this.width) {
            this.x -= 0.1;
        }
        if (this.y <= this.height) {
            this.y += 0.1;
        }
        if (this.x <= this.width) {
            this.x += 0.1;
        }

        return { x: this.x, y: this.y };
    }

    // if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
    //     // -- se sim, remover a bala
    // }
}
