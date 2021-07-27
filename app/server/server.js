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
let playerGameArray = [];
const maxNoPlayer = 2;
let JogoADecorrer = false;
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
            playerCount++;
            if (playerCount <= limiteJogadores) {
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

                // consoleLogListas();
                ecraPrincipal.emit(
                    'JogadorEntrou',
                    dataJogadores.listaJogadores //=========================== Envia Lista total de Jogadores para apresentação no Ecrã Principal
                );
                idJogador++;
            } else {
                socket.emit('playerToCkick');
            }
        } else if (info.isDesktop) {
            if (!(socket === ecraPrincipal)) {
                socket.emit('valida', isEcraPrincipal);
            }
        }
    });

    socket.on('disconnect', function () {
        if (JogoADecorrer) {
            console.log('Saiu a meio do jogo');
            let jogadorSaiu;
            let jogadorVenceu;
            const arrayJ = dataJogadores.listaJogadores;
            const arrayG = playerGameArray;
            const arrayS = SocketList;
            for (let i = 0; i < arrayJ.length; i++) {
                if (arrayG[i].play) {
                    if (arrayJ.socket.id !== socket.id) {
                        ecraPrincipal.emit(
                            'JogadorSaiuAMeioDoJogo',
                            arrayG[i].nome
                        );
                    }
                    removePlayer(arrayJ[i], arrayJ);
                    removePlayer(arrayG[i], arrayG);
                    removePlayer(arrayS[i], arrayS);
                    playerCount--;
                }
            }
        } else {
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
                    ecraPrincipal.emit(
                        'JogadorSaiu',
                        dataJogadores.listaJogadores
                    );
                    playerCount--;
                }
            });

            SocketList.forEach((element) => {
                console.log('L98 -> ' + element);
                if (element.objSocketId === socket.id) {
                    removePlayer2(element, SocketList);
                }
            });
        }
        // consoleLogListas();
    });
    socket.on('startGame', () => {
        atualizaJogadores();
    });

    socket.on('GameOver', () => {
        JogoADecorrer = false;
        console.log('GameOver');
        if (SocketList.length >= 2) {
            for (let i = SocketList.length - 1; i >= 0; i--) {
                console.log(' comprimento do array -> ' + SocketList.length);
                if (
                    playerGameArray[i].play === true &&
                    playerGameArray[i].id === SocketList[i].id
                ) {
                    console.log(
                        'removeu player i-> ' +
                            i +
                            ' |  playerGameArray[i].id -> ' +
                            playerGameArray[i].id +
                            ' | SocketList[i].id -> ' +
                            SocketList[i].id
                    );
                    SocketList[i].objSocket.emit('ForaDeJogo');
                    removePlayer(playerGameArray[i], playerGameArray);
                    removePlayer(SocketList[i], SocketList);
                    remocePlayer(
                        dataJogadores.listaJogadores[i],
                        dataJogadores.listaJogadores
                    );
                    console.log(
                        ' comprimento do array dentro do for -> ' +
                            SocketList.length
                    );
                }
            }
            if (SocketList.length <= 1) {
                console.log('Sem jogadores');
                dataJogadores.listaJogadores.forEach((element) => {
                    removePlayer(element, dataJogadores.listaJogadores);
                });
                ecraPrincipal.emit('NovoEcraJogo');
            } else {
                ecraPrincipal.emit('ProximaPartida');
            }
        }
    });

    socket.on('startNextRound', () => {
        console.log('startNextRound');
        currentRound++;
        atualizaJogadores();
    });

    socket.on('moveJogadorCima', (jogador) => {
        if (!jogador) {
            ecraPrincipal.emit('CimaJogadorE');
        } else {
            ecraPrincipal.emit('CimaJogadorD');
        }
    });

    socket.on('moveJogadorBaixo', (jogador) => {
        if (!jogador) {
            ecraPrincipal.emit('BaixoJogadorE');
        } else {
            ecraPrincipal.emit('BaixoJogadorD');
        }
    });

    function atualizaJogadores() {
        console.log('teste');
        if (currentRound <= NoOfRounds) {
            if (currentRound === 1) {
                let sideBool = false; //====================================  Booliano para player esquerda e player direita
                if (dataJogadores.listaJogadores.length >= maxNoPlayer) {
                    console.log(
                        'arrayLength' + dataJogadores.listaJogadores.length
                    );
                    //====================================  Verifica se ainda existem + de 2 jogadores na lista de espera
                    for (
                        let i = 0;
                        i < dataJogadores.listaJogadores.length;
                        i++
                    ) {
                        if (i + 1 <= maxNoPlayer) {
                            //====================================   define os 2 jogadores iniciais
                            playerGameArray.push({
                                //=================================   adiciona no array "playerGameArray" os 2 jogadores a jogar primeiro
                                id: dataJogadores.listaJogadores[i].id,
                                play: true,
                                posY: 0,
                                side: sideBool, //==========================================   side false representa o lado esquedo do campo, side true representa a direita Primeiro defenido como false (troca na linha 149)
                                points: 0,
                            });
                            sideBool = !sideBool; //==========================================   define o da direita como true
                        } else {
                            playerGameArray.push({
                                //=================================   adiciona no array "playerGameArray" os 2 jogadores a jogar primeiro
                                id: dataJogadores.listaJogadores[i].id,
                                play: false,
                                posY: 0,
                                side: sideBool, //==========================================   side false representa o lado esquedo do campo, side true representa a direita Primeiro defenido como false (troca na linha 149)
                                points: 0,
                            });
                        }
                    }
                }
            } else if (currentRound === 2) {
                //outras condições
                let sideBool = false; //====================================  Booliano para player esquerda e player direita
                for (let i = 0; i < playerGameArray; i++) {
                    if (i + 1 <= maxNoPlayer) {
                        playerGameArray[i].play = true;
                        playerGameArray[i].side = sideBool;
                        sideBool = !sideBool;
                        if (
                            SocketList[i].objSocketId ===
                                playerGameArray[i].id &&
                            playerGameArray[i].play
                        ) {
                            SocketList[i].objSocket.emit(
                                'MostraComando',
                                playerGameArray[i].side
                            );
                        }
                    }
                }
            } else {
                let sideBool = false; //====================================  Booliano para player esquerda e player direita
                for (let i = 0; i < playerGameArray; i++) {
                    playerGameArray[i].play = true;
                    playerGameArray[i].side = sideBool;
                    sideBool = !sideBool;
                    if (
                        SocketList[i].objSocketId === playerGameArray[i].id &&
                        playerGameArray[i].play
                    ) {
                        SocketList[i].objSocket.emit(
                            'MostraComando',
                            playerGameArray[i].side
                        );
                    }
                }

                currentRound == 1;
            }
            playerGameArray.forEach((player) => {
                SocketList.forEach((element) => {
                    if (player.id === element.id) {
                        if (player.play) {
                            element.objSocket.emit(
                                'MostraComando',
                                player.side
                            );
                        } else {
                            element.objSocket.emit('SalaDeEspera');
                        }
                    }
                });

                //depois apaga os dados todos
                if (ecraPrincipal != null) {
                    ecraPrincipal.emit('trocaEcraJogo'); //=========================== Envia informação para troca de ecrã no DesckTop
                }
            });
        }
        JogoADecorrer = true;
    }

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
});
