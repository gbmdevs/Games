export default class MundoCena extends  Phaser.Scene{
    constructor(){
        super({
        key: 'MundoCena'
        });
    }


    create(){

      //Variavel para criar o mapa
      var map = this.make.tilemap({
         key: 'map'
      });

      // first parameter is the name of the tilemap in tiled
      var tiles = map.addTilesetImage('spritesheet', 'tiles', 16, 16, 1, 2);

      // creating the layers
      var grass = map.createStaticLayer('Grass', tiles, 0, 0);
      var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);

      // make all tiles in obstacles collidable
      obstacles.setCollisionByExclusion([-1]);

    }

    update(){

    }
}