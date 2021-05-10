let socket = io();
var data;


socket.on('connect', () => {});
socket.on('userCount', (connectCounter) => {
    data.userCount = connectCounter;
    console.log('myData: ' + connectCounter);
    console.log(data.userCount);
    if (userCount <1){
        androidPlayerID = 0;
    }else
    {
        androidPlayerID = userCount -1;
    }
});

data = {
    userCount: 0,
    androidPlayerID: 0,

};

// socket.on('room_message', function (data) {
//     socket.emit(playerInfo);
// });
