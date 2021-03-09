export default class CenaJogo extends Phaser.Scene{
   constructor(){
        super ({
           key: 'CenaJogo' 
        });
   }
   preload(){

   }
   create(){
      const larguraJogo = this.sys.canvas.width;
      const alturaJogo  = this.sys.canvas.height;
       this.add.image(larguraJogo/2 , alturaJogo/2 , 'forest');
   }
   update(){

   }
}