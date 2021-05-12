const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { Socket } = require('dgram');
let idJogador = 0;
let limiteJogadores = 0;
var data;
playerList = [];
listaJogadores = [];
ecraPrincipal = null;
ecraPrincipalValida = false;
// let nome = 0;
// let isDesktop = 0;
// let socket = 0;

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
    listaJogadores,
};

io.on('connection', function (socket) {
    //recebe info do Player e do Ecra Principal e cria um objecto na lista playerList
    socket.on('novoPlayer', function (info) {
        if (!ecraPrincipalValida) {
            if (info.isDesktop) {
                dataEcra.nome = info.nome;
                dataEcra.isDesktop = true;
                dataEcra.socket = socket;
                ecraPrincipalValida = true;
                console.log("Ecra criado. Socket ID " + socket.id);
            }
        }else if (!info.isDesktop) {
            limiteJogadores ++;
            
            if (limiteJogadores < 7 && limiteJogadores > 0) {
                idJogador++;
                dataJogadores.listaJogadores = {
                    id: idJogador,
                    nome: info.nome, 
                    isDesktop: info.isDesktop, 
                    play: info.play,
                    socket: socket
                }
                console.log("Jogador numero: " + limiteJogadores + ". Socket ID " + socket.id);
                console.log(dataEcra.socket);
                dataEcra.socket.id.emit("mostraJogadores", dataJogadores);
            }else{
                console.log("Numero de jogadores chegou ao limite");
            }
        }else if(info.isDesktop){
            console.log("Adeus noob");
            socket.emit('valida', ecraPrincipalValida);
        }
    })
        
    socket.on('disconnect', function () {
        console.log("flag -> Disconectado");
        dataJogadores.listaJogadores.forEach(element => {
            if (element.socket.id == socket.id) {
                removePlayer(element);
                console.log("removeu jogador");
                dataEcra.socket.emit("mostraJogadores", dataJogadores);
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