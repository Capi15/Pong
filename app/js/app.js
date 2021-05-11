var socket = io();
var data;

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
};

if (data.userCount <1){
    androidPlayerID = 0;
}else
{
    data.androidPlayerID = data.userCount -1;
}


// socket.on('room_message', function (data) {
//     socket.emit(playerInfo);
// });
