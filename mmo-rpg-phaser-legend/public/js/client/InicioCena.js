export default class InicioCena extends Phaser.Scene{
    
    // Inicializador
    constructor(){
        super({
           key: 'InicioCena',
           active: true
        });
    }

     preload(){
         // Map Tiles
         this.load.image('tiles' ,'/assets/map/spritesheet-extruded.png');
         
         //Mapa em formato JSON
         this.load.tilemapTiledJSON('map', '/assets/map/map.json');

         // Dois Caracteres
         this.load.spritesheet('player', 'assets/RPG_assets.png', {
            frameWidth: 16,
            frameHeight: 16
         });

     }

     create(){
         this.scene.start('MundoCena');
     }


}