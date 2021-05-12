const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { Socket } = require('dgram');
let idJogador = 0;
let limiteJogadores = 0;
var data;
playerList = [];
ecraPrincipal = null;
isEcraPrincipal = false;
SocketList = [];

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

dataEcra = {
    nome : null,
    isDesktop : null,
    socket : null,
};

dataJogadores = {
    listaJogadores: [],
};



io.on('connection', function (socket) {
    SocketList.push(socket);
    socket.on('novoPlayer', function (info) {
        if (!isEcraPrincipal) {
            if (info.isDesktop) {
                dataEcra.nome = info.nome;
                dataEcra.isDesktop = true;
                dataEcra.socket = socket.id;
                isEcraPrincipal = true;
                ecraPrincipal = socket;
            }
        }else if (!info.isDesktop) {
            limiteJogadores ++;
            if (limiteJogadores <= 7) {
                idJogador++;
                dataJogadores.listaJogadores.push({
                    id: idJogador,
                    nome: info.nome,
                    isDesktop: info.isDesktop,
                    play: info.play,
                    socket: socket.id
                });
                SocketList.push({socket: socket, id: idJogador})
                ecraPrincipal.emit("mostraJogadores", dataJogadores.listaJogadores);
            } else {
                console.log("Numero de jogadores chegou ao limite");
                return;    
            }
        }else if(info.isDesktop){
            socket.emit('valida', isEcraPrincipal);
        }
    })
        
    socket.on('disconnect', function () {
        console.log("flag -> Disconectado");
        dataJogadores.listaJogadores.forEach(element => {
            if (element.socket == socket.id) {
                removePlayer(element);
                console.log("removeu jogador");
                ecraPrincipal.emit("mostraJogadores", dataJogadores.listaJogadores);
                limiteJogadores--;
            }
        });
    })
    })

//apaga player
function removePlayer(obj) {
    let index = dataJogadores.listaJogadores.indexOf(obj);
    if (index > -1) {
        dataJogadores.listaJogadores.splice(index, 1);
    }
}