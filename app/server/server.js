//conneção ao servidor;
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { Socket } = require('dgram');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
const publicPath = path.join(__dirname, '/../');

let idJogador = 0; //============== id do jogador
let limiteJogadores = 6; //======== máximo de jogadores
let playerCount = 0; //============ número de jogadores em espera
// let playerList = [];
let ecraPrincipal = null; //======= ecrá da página web
let isEcraPrincipal = false; //==== verifica se está a ser acedido no browser
let SocketList = []; //============ Lista dos sockets (jogadores[moboile] + browser)

dataEcra = {
    nome: null,
    isDesktop: null,
    socket: null,
};

dataJogadores = {
    listaJogadores: [],
};

app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

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
                console.log('Web 46');
            }
        } else if (!info.isDesktop) {
            playerCount++;
            if (playerCount <= limiteJogadores) {
                idJogador++;
                //========================================== Adiciona Dispositivo á Lista
                dataJogadores.listaJogadores.push({
                    id: idJogador,
                    nome: info.nome,
                    isDesktop: info.isDesktop,
                    play: info.play,
                    socket: socket.id,
                });
                //========================================== Adiciona Dispositivo á Lista
                SocketList.push({
                    objSocket: socket,
                    objSocketId: socket.id,
                    id: idJogador,
                });
                ecraPrincipal.emit('playerCount', playerCount); //============================================== Envia contagem de jogadores para o Ecrã Principal
                ecraPrincipal.emit(
                    'JogadorEntrou',
                    dataJogadores.listaJogadores //=========================== Envia Lista total de Jogadores para apresentação no Ecrã Principal
                );
                console.log(
                    'Mobile 65 => idJogador ' +
                        SocketList[SocketList.length - 1].id
                );
            } else {
                console.log('Numero de jogadores chegou ao limite');
                return;
            }
        } else if (info.isDesktop) {
            socket.emit('valida', isEcraPrincipal);
        }
    });

    socket.on('disconnect', function () {
        dataJogadores.listaJogadores.forEach((element) => {
            console.log('L84 -> ' + element.id);
            if (element.socket === socket.id) {
                removePlayer(element, dataJogadores.listaJogadores);
                console.log('removeu jogador');
                ecraPrincipal.emit('JogadorSaiu', dataJogadores.listaJogadores);
                console.log('L89 - JogadorSaiu');
                limiteJogadores--;
            }
        });

        SocketList.forEach((element) => {
            console.log('L98 -> ' + element);
            if (element.objSocketId === socket.id) {
                removePlayer2(element, SocketList);
            }
        });
        consoleLogListas();
    });
});

//Elimina o Jogador da Lista pretendida com informação das sockets
function removePlayer(obj, lista) {
    let index = lista.indexOf(obj);
    if (index > -1) {
        lista.splice(index, 1);
    }
}

function removePlayer2(obj, lista) {
    let index = lista.indexOf(obj);
    if (index > -1) {
        lista.splice(index, 1);
    }
}

//Valida Lisas com Socket depois de eliminar
function consoleLogListas() {
    if (dataJogadores.listaJogadores > 0) {
        console.log('Lista jogadores => ');
        dataJogadores.listaJogadores.forEach((element) => {
            console.log(
                'id Jogador ' +
                    element.id +
                    ', nome ' +
                    element.nome +
                    ', play ' +
                    element.play +
                    ', socket id ' +
                    element.socket +
                    '\n'
            );
        });
    }

    console.log('Lista do servidor => ');
    SocketList.forEach((element) => {
        console.log(
            'Id socket -> ' +
                element.objSocketId +
                'Id jogo -> ' +
                element.id +
                '\n'
        );
    });
}
