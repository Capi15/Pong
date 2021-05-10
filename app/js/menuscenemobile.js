var socket;

playerList = [];
var obj = {
    playerList: playerList, 
}

class MenuSceneMobile extends Phaser.Scene {
    gameDiv = document.getElementById('game');
    constructor() {
        super({ key: 'MenuSceneMobile' });
    }
    preload() {
        this.widthPos = this.sys.game.canvas.width / 2 - 200;
        this.heightPos = this.sys.game.canvas.height / 2 + 50;
        this.FN = document.createElement('input');
        this.FN.setAttribute('type', 'text');
        this.FN.setAttribute('name', 'FullName');
        this.FN.setAttribute('placeholder', 'Full Name');
        this.FN.classList.add('form-control-lg');
        this.FN.classList.add('mb-2');
        this.FN.style.width = 400 + 'px';
        this.tag = document.createElement('div');
        this.tag.appendChild(this.FN);
        this.tag.style.zIndex = 1;
        this.tag.style.cssText =
            'left: ' + this.widthPos + 'px; top:' + this.heightPos + 'px;';
        this.tag.style.position = 'absolute';
        this.div = this.gameDiv.getElementsByTagName('div');
        console.log(this.gameDiv.getElementsByTagName('div'));
        this.div[0].style.zIndex = 1;
        this.div[0].append(this.tag);
    }

    create() {
        socket = io.connect('http://localhost:3000');
        
        this.message = this.add
            .text(
                this.sys.game.canvas.width / 2,
                this.sys.game.canvas.height / 2,
                'Digite o seu Nome',
                {
                    color: '#FFFFFF',
                    fontSize: 40,
                    fontStyle: 'bold',
                }
            )
            .setOrigin(0.5);

        this.returnKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );

        this.returnKey.on('down', (event) => {
            this.name = this.FN;
            if (this.name.value != '') {
                this.message.setText(this.name.value);
                this.name.value = '';
                this.hasChangedName = true;
            }
            playerList.add(new Player(data.androidPlayerID, this.name));
            
        });
      
    }
}
