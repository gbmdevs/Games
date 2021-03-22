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

      //Variavel para criar o mapa
      var map = this.make.tilemap({
         key: 'map'
      });

      // first parameter is the name of the tilemap in tiled
      var tiles = map.addTilesetImage('spritesheet', 'tiles', 16, 16, 1, 2);

      // Criar as Camadas de Gramas e Obstaculos
      var grass = map.createStaticLayer('Grass', tiles, 0, 0);
      var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);

      // Criar Colisão nos obstaculos citados
      obstacles.setCollisionByExclusion([-1]);
 
      // Não deixar andar nas arvores
      this.physics.add.collider(this.player, obstacles);

      // Entrada de Comando do usuario
      this.cursors = this.input.keyboard.createCursorKeys();
       
      //
      this.createPlayer();


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
      
/*
      // Listagem de eventos Socket WEB
      this.socket.on('currentPlayers', function(players) {
        Object.keys(players).forEach(function(id) {
          if(players[id].playerId === this.socket.id){
             console.log('É igual');
          }else{
             console.log('Não É igual');            
          }
        })
      }); */

      // Inserindo novo Jogador
      this.socket.on('newPlayer', function(playerInfo) {
         this.addOtherPlayers(playerInfo);
      });


      // Desconectar os Jogadores que 
      this.socket.on('disconnectPlayer', function(playerId){
         console.log('Jogador Saiu' , playerId);
      });

    }

    update(){
     
      // Estudar o que é isso
      this.player.body.setVelocity(0);  

      // Movimento na Vertical
      if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-80);
      }else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(80);
      }

      //Movimento Horizontal
      if(this.cursors.right.isDown){
        this.player.body.setVelocityX(80)
      }else if(this.cursors.left.isDown){
        this.player.body.setVelocityX(-80);
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
  }

// Area das Funções externas do Jogo

addOtherPlayers(playerInfo){
   console.log(playerInfo);
   const otherPlayer = this.add.sprite(playerInf.x, playerInfo.y , 'player' , 9);

}

createPlayer(){
  this.player = this.add.sprite(0, 0, 'player', 6);

  // Container Estudar isso
  this.container = this.add.container(500, 500);
  this.container.setSize(16,16);
  this.physics.world.enable(this.container);
  this.container.add(this.player);

  // Atualiza a Camera
  this.updateCamera();

  // Não deixar Sair do Mapa
  this.container.body.setCollideWorldBounds(true);



}

updateCamera(){
      // limit camera to map
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.player);
      this.cameras.main.roundPixels = true; // avoid tile bleed
}

}