class MenuSceneDesktop extends Phaser.Scene {
    noPlayers;
    totalPlayers;
    playerCount;
    gamingList = [];
    gamingListFunction;
    waitingList = [];
    
    timedEvent;

    timer;
    total = 0;

    constructor() {
        super({ key: 'MenuSceneDesktop' });
    }
    // ------------------------------  Create  ------------------------------
    create() {
        document.getElementById('game').classList.add('gameWindow');

        // ------------------------------  Numero de jogadores atuais  ------------------------------
        this.noPlayers = 0;
        this.totalPlayers = this.add.text(10, 10, 'A aguardar jogadores...  ' + this.noPlayers + '/6');

        // ------------------------------  Texto inicio da partida / Timmer  ------------------------------
        this.initialTime = 90;
        this.timmerText = this.add.text(500, 100, 'O jogo iniciará em ' + this.formatTime(this.initialTime) + ' segundos');
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        
        // ------------------------------  QR code Dispositivo Movel  ------------------------------
        this.stringAndroid = this.add.text(130, 150, 'Acesso android');
        this.add.sprite(200,300,"QrAndroid");

        // ------------------------------ Var com info do Ecra principal + Emit para servidor  ------------------------------
        var info = {
            nome: "EcraPrincipal",
            isDesktop: true,
        }
        socket.emit('novoPlayer', info);

        // ------------------------------  Receção info players atuais / Numero Total e Nomes  ------------------------------
        socket.on('mostraJogadores', dataJogadores => {
            this.noPlayers = dataJogadores.listaJogadores.length;
            this.stringLista = this.add.text(450, 200, '***  Lista de Jogadores  ***');
            var y = 250;
            for (let i = 0; i < dataJogadores.listaJogadores.length; i++) {
                this.stringListaNomes.setText(450, y, i+1 + "  ->  ");
                this.stringListaNomes.setText(460, y, "       " + dataJogadores.listaJogadores[i].nome);
                y += 20;
            }
        });
    }
    // ------------------------------  Update  ------------------------------
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
        this.totalPlayers.setText('A aguardar jogadores...  ' + this.noPlayers + '/6');

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
   
