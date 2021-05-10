class MenuSceneDesktop extends Phaser.Scene {
    noPlayers;
    waitPlayers;
    playerCount;
    gamingList = [2];
    waitingList = [4];

    timer;
    total = 0;

    constructor() {
        super({ key: 'MenuSceneDesktop' });
    }

    create() {
        document.getElementById('game').classList.add('gameWindow');

        this.waitPlayers = this.add.text(10, 10, 'A aguardar jogadores...');
        this.noPlayers = 0;
        this.playerCount = this.add.text(250, 10, this.noPlayers + '/6');
        this.playerCount = this.add.text(500, 100, this.noPlayers + '/6');
    }
    update() {
        
        if (this.noPlayers != data.userCount) {
            this.noPlayers = data.userCount -1;
            this.playerCount.text = this.noPlayers + '/6'
        }
        
        if (data.userCount >= 2) {
            this.scene.start('DesktopScene');
        }
        
    }

    updateCounter() {

        total++;
    
    }
    
    render() {
    
        game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        game.debug.text('Loop Count: ' + total, 32, 64);
    
    }
}
