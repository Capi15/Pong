class Player {
    id;
    //endereço que liga o cliente ao servidor
    adress;
    name;
    active;
        constructor(id, adress, name){
            this.id = id;
            this.adress = adress;
            this.name = name;
            this.active = false;
        }


}
