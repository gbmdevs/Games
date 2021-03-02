export default class CenaCarregamento extends Phaser.Scene{
    constructor(){
        super ({
            key: 'CenaCarregamento' 
         });
    }
    preload(){
        this.load.on('complete',  () =>{
           this.scene.start('CenaJogo');
        });

        this.load.image('forest','images/forest.jpg'); 
        this.load.image('chao', 'images/chao.png');
        this.load.image('platform', 'images/platform.png');
      //  this.load.spritesheet('slime-vermelha', 'images/slime-vermelha.png');
 
    }
    create(){
 
    }
    update(){
        
    }
 }