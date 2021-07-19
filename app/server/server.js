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
    socket.on('novoPlayer', function (info) {
        if (!isEcraPrincipal) {
            if (info.isDesktop) {
                dataEcra.nome = info.nome;
                dataEcra.isDesktop = true;
                dataEcra.socket = socket.id;
                isEcraPrincipal = true;
                ecraPrincipal = socket;
            }
        } else if (!info.isDesktop) {
            if (playerCount <= limiteJogadores) {
                playerCount++;
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

                consoleLogListas();
                ecraPrincipal.emit(
                    'JogadorEntrou',
                    dataJogadores.listaJogadores //=========================== Envia Lista total de Jogadores para apresentação no Ecrã Principal
                );
                idJogador++;
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
                console.log(
                    'Jogador com o id ' +
                        element.id +
                        ' socket -> ' +
                        element.socket +
                        ' saiu.'
                );
                removePlayer(element, dataJogadores.listaJogadores);
                ecraPrincipal.emit('JogadorSaiu', dataJogadores.listaJogadores);
                playerCount--;
                idJogador--;
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
    console.log('Jogadores total -> ' + playerCount);
    console.log('Lista jogadores => ');
    if (dataJogadores.listaJogadores.length > 0) {
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
    } else {
        console.log('Lista Vazia');
    }

    console.log('Lista do servidor => ');
    if (SocketList.length > 0) {
        SocketList.forEach((element) => {
            console.log(
                'Id socket -> ' +
                    element.objSocketId +
                    ' | Id jogo -> ' +
                    element.id +
                    '\n'
            );
        });
    } else {
        console.log('Lista Vazia');
    }
}
