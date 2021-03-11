const { static } = require('express');
const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);

//PORTA UTILIZADA
const PORT = 8080;

app.use(express.static('public'));


// Diretorios dos Arquivos
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));


//Rotas
app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html')
});

//
server.lastPlayerID = 0; //Guardar o Ultimo ID de registro.

// Socket - Estudos em Realização
io.on("connection", (socket) =>{ 
    console.log('feita conexao');
   socket.on('newplayer', () =>{
          socket.player = {
              id: server.lastPlayerID++,
              x: 050,
              y: 050
           }
       console.log('Chamou ' + socket.player.id);
       socket.broadcast.emit('newplayer', socket.player);

    });
});

 
server.listen(PORT , () =>{
    console.log('Servidor rodando em localhost:' + server.address().port);
})


