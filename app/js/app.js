var socket = io();
var data;

data = {
    userCount: 0,
    androidPlayerID: 0,

};

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
};

if (userCount <1){
    androidPlayerID = 0;
}else
{
    androidPlayerID = userCount -1;
}


// socket.on('room_message', function (data) {
//     socket.emit(playerInfo);
// });
