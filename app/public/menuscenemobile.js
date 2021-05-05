class MenuSceneMobile extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuSceneMobile' });
    }
    preload() {
            this.load.html("form", "form.html");
    }

    create() {
        this.nameInput = this.add.dom(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2).createFromCache("form");

    this.message = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, "Digite o seu Nome", {
        color: "#FFFFFF",
        fontSize: 40,
        fontStyle: "bold"
    }).setOrigin(0.5);

    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey.on("down", event => {
        let name = this.nameInput.getChildByName("name");
        if(name.value != "") {
            this.message.setText(name.value);
            name.value = "";
        }
    });
        
        //document.write("<input type=\"text\" name=\"username\" id=\"utext\">");
    }
}
