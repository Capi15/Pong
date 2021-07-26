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
let currentRound = 1;
const NoOfRounds = 3;
let playerGameArray;

dataEcra = {
    nome: null,
    isDesktop: null,
    socket: null,
};

dataJogadores = {
    listaJogadores: [],
};

// jogador = {
//   id: null,
//   playerData = {
//     'posX'  : null,
//     'posY'  : null,
//     'side'  : false,
//     'points': 0,
// }
// }

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
    socket.on('startGame', function () {
        console.log('L134 -> startFirstGame');

        if (currentRound <= NoOfRounds) {
            if (currentRound == 1) {
                let sideBool = false; //====================================  Booliano para player esquerda e player direita
                const maxNoPlayer = 2;
                playerGameArray = [maxNoPlayer];
                if (dataJogadores.listaJogadores.length >= 2) {
                    //====================================  Verifica se ainda existem + de 2 jogadores na lista de espera
                    for (
                        let i = 0;
                        i < dataJogadores.listaJogadores.length;
                        i++
                    ) {
                        if (i + 1 <= maxNoPlayer) {
                            //====================================   define os 2 jogadores iniciais
                            dataJogadores.listaJogadores[i].play = true;
                            playerGameArray.push({
                                //=================================   adiciona no array "playerGameArray" os 2 jogadores a jogar primeiro
                                id: dataJogadores.listaJogadores[i].id,
                                posY: 0,
                                //side false representa o lado esquedo do campo, side true representa a direita
                                side: sideBool, //==========================================   Primeiro defenido como false (troca na linha 149)
                                points: 0,
                            });
                            sideBoll = true; //==========================================   define o da direita como true
                        } else {
                            dataJogadores.listaJogadores[i].play = false;
                        }
                        //
                        // while (playerGameArray <= maxNoPlayer)

                        //     if ((maxNoPlayer % 2) = 0) playerData.side = true;
                        //     playerGameArray.push({ 'jogadorId' : element.id, 'playerData' : playerData});
                    }
                }
            }

            playerGameArray.forEach((player) => {
                SocketList.forEach((playerSocket) => {
                    if (player.id === playerSocket.id) {
                        console.log('L159 -> MostraComando');
                        playerSocket.objSocket.emit('MostraComando');
                    } else {
                        console.log('L162 -> MostraComando');
                        SocketList.objSocket.emit('SalaDeEspera');
                    }
                });
            });
            //depois apaga os dados todos
            if (ecraPrincipal != null) {
                ecraPrincipal.emit('trocaEcraJogo'); //=========================== Envia informação para troca de ecrã no DesckTop
            }
        }
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

//Valida Listas com Socket depois de eliminar
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
