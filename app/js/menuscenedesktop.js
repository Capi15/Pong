class MenuSceneDesktop extends Phaser.Scene {
    noPlayers;
    waitPlayers;
    playerCount;
    gamingList = [2];
    gamingListFunction;
    waitingList = [4];

    constructor() {
        super({ key: 'MenuSceneDesktop' });
    }

    create() {
        document.getElementById('game').classList.add('gameWindow');

        this.waitPlayers = this.add.text(10, 10, 'A aguardar jogadores...');
        this.noPlayers = 0;
        this.playerCount = this.add.text(250, 10, this.noPlayers + '/6');
        this.stringAndroid = this.add.text(130, 150, 'Acesso android');
        this.add.sprite(200,300,"QrAndroid");

    }
    update() {
        this.noPlayers = data.userCount;
        this.playerCount.text = this.noPlayers + '/6'

        if (data.userCount >= 7) {
            this.scene.start('DesktopScene');
        }
        
    }

    mostraListaPlayers() {
        for (let i = 0; i < array.length; index++) {
            const element = array[index];
            
        }
    }
        
    }
   
