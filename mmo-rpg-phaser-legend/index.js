const express = require('express');
const app = express();
const server = require('http').Server(app);
const io  = require('socket.io')(server);

// Guarda a quantidade de jogadores
const players = {};


app.use(express.static('public'));

// Arquivos Utilizados no fonte.
app.use('/js',     express.static(__dirname + '/js'));  

app.get('/', (req,res) => {
   res.sendFile(__dirname + '/index.html');
});


// Conexao de Sockets do Jogo
io.on('connection' , function(socket) {
   console.log('Usuario conectado = ' + socket.id);
   // Adicionando Novo Usuario ao Objeto Jogador
   players[socket.id] = {
      flipX: false,
      x: Math.floor(Math.random() * 400) + 50,
      y: Math.floor(Math.random() * 500) + 50,
      playerId: socket.id
   };
   

   // Emitir quantidade de Jogadores Online
   socket.emit('currentPlayers', players);

   //Atualizar todos falando que existe novo jogador
   socket.broadcast.emit('newPlayer', players[socket.id]);

   // Desconectar Jogador
   socket.on('disconnect', function(){
      console.log('Usuario Desconectado: ' , socket.id);
      delete players[socket.id];
      // Emit Mensagem para todos os Jogadores
      io.emit('disconnectPlayer', socket.id);
   });

});

//Executar o servidor
server.listen(8080, () => {
     console.log("Servidor rodando na porta localhost:8080");
     console.log(__dirname);
});