var express = require('express');
var app = express();
// Estudar isso depois 
var server = require('http').Server(app);


app.get('/' , (req,res) => {
   res.sendFile(__dirname + '/index.html');
});

server.listen(8080 , function(){
   console.log(`Servidor rodando no ${server.address().port}`);
});

