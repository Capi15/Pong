var socket = io();
var data;


socket.on('connect', () => {});
socket.on('userCount', (connectCounter) => {
    data.userCount = connectCounter;
    console.log('myData: ' + connectCounter);
    console.log(data.userCount);
    data.newPlayer = true;
});

