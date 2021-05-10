class Player extends Phaser {
    id;
    //endereço que liga o cliente ao servidor
    adress;
    name;
    active;
        constructor(x, a, n){
            this.id = x;
            this.adress = a;
            this.name = n;
            this.active = false;
        }


}
