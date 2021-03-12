const express = require('express');
const app = express();
const server = require('http').Server(app);
const io  = require('socket.io')(server);


app.use(express.static('public'));

app.use('/js', express.static(__dirname + '/js')); 

app.get('/', (req,res) => {
   res.sendFile(__dirname + '/index.html');
});

//Executar o servidor
app.listen(8080, () => {
     console.log("Servidor rodando na porta localhost:8080");
});