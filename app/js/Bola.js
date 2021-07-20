class Bola {
    constructor(px, py, dir, vel) {
        // -- posição
        this.x, this.y;

        // -- velocidade
        this.myvx, this.myvy;

        // -- diâmetro
        this.diam = 16;

        // -- posicionar Bola
        this.x = px;
        this.y = py;

        this.myvx = vel * cos(dir);
        this.myvy = vel * sin(dir);
    }

    // -- moveBola()

    moveBola() {
        this.x += this.myvx;
        this.y += this.myvy;

        imageMode(CENTER);
        image('ballImg', this.x, this.y);
        imageMode(CORNER);

        // -- verificar se a bola sai do canvas
        if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
            // -- se sim, remover a Bola
            this.eliminaBola();
        }
    }

    // -- eliminaBola()
    eliminaBola() {
        // -- esta função esta na classe principal
        // -- remover Bola do array;
        removeBola(this);
    }
}
