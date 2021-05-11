var socket = io();
var data;
playerList = [6];

socket.on('connect', () => {});
socket.on('userCount', (connectCounter) => {
    data.userCount = connectCounter;
    console.log('myData: ' + connectCounter);
    console.log(data.userCount);
    data.newPlayer = true;
});

data = {
    userCount: 0,
    newPlayer: false,
    androidPlayerID: 0,
    playerList: playerList, 
};



// socket.on('room_message', function (data) {
//     socket.emit(playerInfo);
// });
