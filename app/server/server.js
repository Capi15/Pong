const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { Socket } = require('dgram');
let connectCounter = 0;
var data;
playerList = [];
playerListNames = [];
ecraPrincipal = null;
ecraPrincipalValida = false;

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

data = {
    newPlayer: false,
    androidPlayerID: 0,
};

infoJogadores = {
    num: 0,
    playerListNames,
};

io.on('connection', function (socket) {
    //recebe info do Player e do Ecra Principal e cria um objecto na lista playerList
    socket.on('novoPlayer', function (info) {
        playerList.push({
            id: connectCounter,
            ...info,
            socket,
        })
        console.log('Nome do Player ' + info.nome);
        console.log('Player criado com o id ' + connectCounter + ' tem o adress ' + socket.id);

        if(!info.isDesktop){ 
            console.log(connectCounter);
            infoJogadores.num = connectCounter;
            infoJogadores.playerListNames.push({nome: info.nome, id: connectCounter});
            console.log("Envia dados do player para Ecra");
            ecraPrincipal.emit('novoJogador', infoJogadores);
            connectCounter++;
        }else if(!ecraPrincipalValida){
            ecraPrincipal = socket;
            ecraPrincipalValida = true;
            console.log("Ecra principal ativado");
            connectCounter++;
        }else if (info.isDesktop && ecraPrincipalValida){
            console.log("Adeus noob");
            socket.emit('valida', ecraPrincipalValida);
        }        
    })
    
    socket.on('disconnect', function () {
       playerList.forEach(element => {
            if (element.socket.id === socket.id) {
                infoJogadores.playerListNames.forEach(element2 => {
                    console.log("teste if");
                    console.log(element2.id + " -> " + element.id);
                    if (element2.id === element.id) {
                        element.pop();
                        connectCounter--; 
                        infoJogadores.num = connectCounter;
                        element2.pop();
                        console.log("Verifica lista de player list  depois do pop \n" + playerList);
                        console.log("Verifica info depois do pop \n" + info)
                    }
                });
            }
        });
        console.log('Cliente desconectado. Até breve!');
    });
});


