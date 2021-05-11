class MenuSceneDesktop extends Phaser.Scene {
    noPlayers;
    waitPlayers;
    playerCount;
    gamingList = [2];
    gamingListFunction;
    waitingList = [4];
    
    timedEvent;

    timer;
    total = 0;

    constructor() {
        super({ key: 'MenuSceneDesktop' });
    }

    create() {
        document.getElementById('game').classList.add('gameWindow');

        this.waitPlayers = this.add.text(10, 10, 'A aguardar jogadores...');
        this.noPlayers = 0;
        this.playerCount = this.add.text(250, 10, '0/6');

        

        this.initialTime = 90;

        this.timmerText = this.add.text(500, 100, 'O jogo iniciará em ' + this.formatTime(this.initialTime) + ' segundos');
        
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        
        this.stringAndroid = this.add.text(130, 150, 'Acesso android');
        this.add.sprite(200,300,"QrAndroid");

        socket.on('userCount', (connectCounter) => {
            this.noPlayers = connectCounter;
        });

        var info = {
            nome: "desktop",
            isDesktop: true,
            play: false,
        }
        socket.emit('novoPlayer', info);
    }
    update() {
        if (this.initialTime <= 0 && this.noPlayers >= 3) {
            this.scene.start('DesktopScene');
            
        }else if (this.noPlayers >= 7) {
            this.scene.start('DesktopScene');
        }

        while (this.initialTime < 0) {
            this.initialTime = 90;
            // this.timedEvent.pause = true;
        }

        this.playerCount.text = this.noPlayers < 1 ? 0 + '/6' : this.noPlayers - 1 + '/6'
        data.playerList.forEach(element => {
            this.print = this.add
        .text(
            10,
            this.sys.game.canvas.height - element * 100,
            'socket: ' + element.id + ' \n nome:' + element.name + ' \n address:' + element.adress)
        });
    }
    
        formatTime(seconds){
        
        let minutes = Math.floor(seconds/60);
        
        let partInSeconds = seconds%60;
        
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        
        return `${minutes}:${partInSeconds}`;
    }
    
    
    onEvent ()
    {
        this.initialTime -= 1; // One second
        this.timmerText.setText('O jogo iniciará em ' + this.formatTime(this.initialTime) + ' segundos');
    }
        
    }
   
