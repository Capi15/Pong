const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { Socket } = require('dgram');
let connectCounter = 0;
let data;

const publicPath = path.join(__dirname, '/../');
console.log(publicPath);

const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

io.on('connection', function (socket) {
    connectCounter++;
    console.log(connectCounter);
    console.log('Player logado com o id ' + connectCounter + ' tem o adress ' + socket.id);
    console.log(socket);
    socket.emit('userCount', connectCounter);
    socket.on('disconnect', function () {
        connectCounter--;
        console.log('A user has disconnected.');
    });

    socket.on('teste', teste);
});

data = {
    userCount: connectCounter,
};

function teste(data) {
    console.log(data);
}
