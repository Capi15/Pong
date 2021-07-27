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
    noConn = 1;
    jogName = '';
    width;
    height;
    constructor() {
        super({ key: 'MenuSceneDesktop' });
    }
    // ------------------------------  Create  ------------------------------
    create() {
        document.getElementById('game').classList.add('gameWindow');

        // ------------------------------  Numero de jogadores atuais  ------------------------------
        this.noPlayers = 0;
        this.totalPlayers = this.add.text(
            10,
            10,
            'A aguardar jogadores...  ' + this.noPlayers + '/6',
            {
                color: '#FFFFFF',
                fontSize: 25,
                // fontStyle: 'regular',
                fontFamily: 'roboto',
            }
        );

        // ------------------------------  Texto inicio da partida / Timmer  ------------------------------
        this.initialTime = 40;
        this.timmerText = this.add.text(
            500,
            100,
            'O jogo iniciará em ' +
                this.formatTime(this.initialTime) +
                ' segundos'
        );
        this.timedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.onEvent,
            callbackScope: this,
            loop: true,
        });

        // ------------------------------  QR code Dispositivo Movel  ------------------------------
        this.stringAndroid = this.add.text(130, 150, 'Acesso android');
        this.add.sprite(200, 300, 'QrAndroid').setScale(2);

        // ------------------------------  Texto Titulo Lista Jogadores  ------------------------------
        this.stringLista = this.add.text(
            450,
            200,
            '***  Lista de Jogadores  ***'
        );
        // ------------------------------  Texto com todos jogadores   ------------------------------
        this.stringListaNomes = this.add.text(450, 250, ' Nenhum ');

        // ------------------------------ Var com info do Ecra principal + Emit para servidor  ------------------------------
        var info = {
            nome: 'EcraPrincipal',
            isDesktop: true,
        };
        socket.emit('novoPlayer', info);

        const style = { font: 'bold 32px Arial', fill: '#fff' };
        // ------------------------------  Receção info players atuais / Numero Total e Nomes  ------------------------------
        socket.on('JogadorEntrou', (listaJogadores) => {
            console.log('L68');
            this.noPlayers = listaJogadores.length;
            this.totalPlayers.setText(
                'A aguardar jogadores...  ' + this.noPlayers + '/6',
                {
                    color: '#FFFFFF',
                    fontSize: 40,
                    fontStyle: 'bold',
                    fontFamily: 'Roboto',
                }
            );
            var y = 250;
            let id = 0;

            this.stringListaNomes.setText('');
            this.jogName = '';
            for (let i = 0; i < listaJogadores.length; i++) {
                this.jogName +=
                    i + 1 + '  ->  ' + listaJogadores[i].nome + '\n';
            }
            console.log(this.jogName);
            this.stringListaNomes = this.add.text(450, y, this.jogName);
            y += 20;
        });

        socket.on('JogadorSaiu', (listaJogadores) => {
            this.noPlayers = listaJogadores.length;
            this.totalPlayers.setText(
                'A aguardar jogadores...  ' + this.noPlayers + '/6'
            );
            var y = 250;
            let id = 0;
            this.stringListaNomes.setText('');
            this.jogName = '';
            for (let i = 0; i < listaJogadores.length; i++) {
                this.jogName +=
                    i + 1 + '  ->  ' + listaJogadores[i].nome + '\n';
            }
            console.log(this.jogName);
            this.stringListaNomes = this.add.text(450, y, this.jogName);
            y += 20;
        });

        socket.on('trocaEcraJogo', () => {
            this.scene.start('DesktopScene');
        });
    }

    // ------------------------------  Update  ------------------------------
    update() {
        if (this.noPlayers >= 6) {
            this.scene.start('DesktopScene');
            socket.emit('startGame');
        }

        if (this.initialTime <= 0) {
            if (this.noPlayers >= 2) {
                socket.emit('startGame');
                this.scene.start('DesktopScene');
            } else {
                this.initialTime = 90;
            }
        }
    }

    formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let partInSeconds = seconds % 60;
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        return `${minutes}:${partInSeconds}`;
    }

    onEvent() {
        this.initialTime -= 1; // One second
        this.timmerText.setText(
            'O jogo iniciará em ' +
                this.formatTime(this.initialTime) +
                ' segundos'
        );
    }
}
