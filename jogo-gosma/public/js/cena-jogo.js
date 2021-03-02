export default class CenaJogo extends Phaser.Scene{
   constructor(){
        super ({
           key: 'CenaJogo' 
        });
   }
   preload(){

   }
   create(){
       this.add.image(0 , 0 , 'forest');
   }
   update(){

   }
}