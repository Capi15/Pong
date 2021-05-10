class MenuSceneDesktop extends Phaser.Scene {
    noPlayers;
    waitPlayers;
    playerCount;
    gamingList = [2];
    waitingList = [4];
    
    timedEvent;

    constructor() {
        super({ key: 'MenuSceneDesktop' });
    }

    create() {
        document.getElementById('game').classList.add('gameWindow');

        this.waitPlayers = this.add.text(10, 10, 'A aguardar jogadores...');
        this.noPlayers = 0;
        this.playerCount = this.add.text(250, 10, this.noPlayers + '/6');

        

        this.initialTime = 30;

        this.timmerText = this.add.text(500, 100, 'O jogo iniciará em ' + this.formatTime(this.initialTime) + ' segundos');
        
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

    }
    update() {
        if (data.newPlayer == true) {
            data.newPlayer = false
            this.noPlayers = data.userCount -1;
        }

        if (this.initialTime <= 0 && data.userCount >= 3) {
            this.scene.start('DesktopScene');
            
        }else if (data.userCount >= 7) {
            this.scene.start('DesktopScene');
        }
        
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
        this.playerCount.text = this.noPlayers + '/6'
    }

}
