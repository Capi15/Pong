class MenuSceneMobile extends Phaser.Scene {
    gameDiv = document.getElementById('game');
    constructor() {
        super({ key: 'MenuSceneMobile' });
    }
    preload() {
        
        this.FN = document.createElement("input");
        this.FN.setAttribute("type", "text");
        this.FN.setAttribute("name", "FullName");
        this.FN.setAttribute("placeholder", "Full Name");
        this.tag = document.createElement("div");
        this.tag.appendChild(this.FN);
        // this.tag.style.zIndex = 1;
        this.tag.style.cssText = "left: 100px; top: 150px; zIndex : 1; position : \"absolute\"; wjwe";
        // this.tag.style.position = "absolute";
        this.div = this.gameDiv.getElementsByTagName('div');
        console.log(this.gameDiv.getElementsByTagName('div'))
        this.div[0].style.zIndex = 1;
        this.div[0].append(this.tag);
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
