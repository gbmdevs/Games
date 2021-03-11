var Client = {}
Client.socket = io.connect();

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer'); 
    console.log('fez')
};


// Adicionar o Jogador da Tela Atual no jogo
Client.socket.on('newplayer', (data) => {
   Game.addNewPlayer(data.id , data.x, data,y);
   console.log(data);
});


