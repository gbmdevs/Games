"use srtict"
export default class MundoCena extends  Phaser.Scene{
    constructor(){
        super({
        key: 'MundoCena'
        });
    }


    create(){

      // Conexao com o Servidor
      this.socket = io();
      // Area de Jogadores - Grupo 
      this.otherPlayers = this.physics.add.group();

      // Criar o Mapa
      this.createMap();
 
      // Entrada de Comando do usuario
      this.cursors = this.input.keyboard.createCursorKeys();
       
      // Criando Jogador
      //this.createPlayer();

      // Atualizar a Camera
      //this.updateCamera();


      //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
      this.anims.create({
          key: 'left',
       frames: this.anims.generateFrameNumbers('player', {
         frames: [1, 7, 1, 13]
         }),
       frameRate: 10,
       repeat: -1
      });

      // Animação do Personagem : tecla direita
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [1, 7, 1, 13]
        }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [2, 8, 2, 14]
        }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [0, 6, 0, 12]
        }),
        frameRate: 10,
        repeat: -1
      });
      

      // Listagem de eventos Socket WEB
      this.socket.on('currentPlayers', function(players) {
        Object.keys(players).forEach(function(id) {
          if(players[id].playerId === this.socket.id){
             console.log('Player = ' + Object.values(players[id])); 
             this.createPlayer(players[id]);
          }else{
             this.addOtherPlayers(players[id]);      
          }
        }.bind(this));
      }.bind(this)); 

      // Inserindo novo Jogador
      this.socket.on('newPlayer', function(playerInfo) {
         this.addOtherPlayers(playerInfo);
      }.bind(this));

     
      // Desconectar os Jogadores que 
      this.socket.on('disconnectPlayer', function(playerId){
        this.otherPlayers.getChildren().forEach(function (player) {
          if (playerId === player.playerId) {
            player.destroy();
          }
      }.bind(this));  
     }.bind(this));
     
      
      // Recebe do Servidor quem se moveu
      this.socket.on('playerMoved', function(playerInfo){
         this.otherPlayers.getChildren().forEach(function (player){
            if(playerInfo.playerId === player.playerId){
              player.flipX = playerInfo.flipX;
              player.setPosition(playerInfo.x, playerInfo.y);
            }
         }.bind(this));
      }.bind(this));
      
    }

    update(){
     if(this.container){         
       
      // Estudar o que é isso
      this.container.body.setVelocity(0);  

      // Movimento na Vertical
      if (this.cursors.up.isDown) {
        this.container.body.setVelocityY(-80);
      }else if (this.cursors.down.isDown) {
        this.container.body.setVelocityY(80);
      }

      //Movimento Horizontal
      if(this.cursors.right.isDown){
        this.container.body.setVelocityX(80)
      }else if(this.cursors.left.isDown){
        this.container.body.setVelocityX(-80);
      }

     // Atualizar a animação do personagem
     if(this.cursors.right.isDown){ 
       this.player.anims.play('right', true);
       this.player.flipX = false;
     }else if(this.cursors.left.isDown){
       this.player.anims.play('left',true);
       this.player.flipX = true;
     }else if(this.cursors.up.isDown) {
       this.player.anims.play('up', true);
     }else if(this.cursors.down.isDown){
       this.player.anims.play('down', true);  
     }else{
       this.player.anims.stop();
      }       
     
     
      // Atualiza a posição do jogador
      var x = this.container.x;
      var y = this.container.y;
      var flipX = this.player.flipX;
      if (this.container.oldPosition && (x !== this.container.oldPosition.x || y !== this.container.oldPosition.y || flipX !== this.container.oldPosition.flipX)) {
        this.socket.emit('playerMovement', { x, y, flipX });
      }
      // save old position data
      this.container.oldPosition = {
        x: this.container.x,
        y: this.container.y,
        flipX: this.player.flipX
      }; 
     } 
  }
  


// Area das Funções externas do Jogo
addOtherPlayers(playerInfo){ 
   const otherPlayer = this.add.sprite(playerInfo.x, playerInfo.y , 'player' , 9);
   otherPlayer.setTint(Math.random() * 0xffffff)
   otherPlayer.playerId = playerInfo.playerId;
   this.otherPlayers.add(otherPlayer);

}

createMap(){
     //Variavel para criar o mapa
     this.map = this.make.tilemap({
      key: 'map'
     });

    // first parameter is the name of the tilemap in tiled
    var tiles = this.map.addTilesetImage('spritesheet', 'tiles', 16, 16, 1, 2);
    // Criar as Camadas de Gramas e Obstaculos
    this.map.createStaticLayer('Grass', tiles, 0, 0);    
    var obstacles = this.map.createStaticLayer('Obstacles', tiles, 0, 0);

    // Não sair do Mapa
    this.physics.world.bounds.width  = this.map.widthInPixels;
    this.physics.world.bounds.height = this.map.heightInPixels; 

    // Criar Colisão nos obstaculos citados
    obstacles.setCollisionByExclusion([-1]);

    // Não deixar andar nas arvores
    //this.physics.add.collider(this.player, obstacles);
}

createPlayer(playerInfo){
  
  console.log(playerInfo + ' Criando');
  this.player = this.add.sprite(0, 0, 'player', 6);

  // Container Estudar isso
  this.container = this.add.container(playerInfo.x, playerInfo.y);
  this.container.setSize(16,16);
  this.physics.world.enable(this.container);
  this.container.add(this.player);

  // Atualiza a Camera
  this.updateCamera();

  // Não deixar Sair do Mapa
  this.container.body.setCollideWorldBounds(true);
}

updateCamera(){
      console.log('entrou camera')
      // limit camera to map
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
      this.cameras.main.startFollow(this.container);
      this.cameras.main.roundPixels = true; // avoid tile bleed
}

}