const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
let connectCounter = 0;
let data;

const publicPath = path.join(__dirname, '/../');

const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

io.on('connection', function (socket) {
    console.log('A user just connected.');
    connectCounter++;
    console.log(connectCounter);
    socket.emit('userCount', connectCounter)
    socket.on('disconnect', function() {
        connectCounter--;
        console.log('A user has disconnected.');
    });
});


data = {
    userCount: connectCounter,
};

    
// socket.on('startGame', () => {
//     io.emit('startGame');
// });
