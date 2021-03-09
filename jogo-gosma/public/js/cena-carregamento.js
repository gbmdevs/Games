export default class CenaCarregamento extends Phaser.Scene{
    constructor(){
        super ({
            key: 'CenaCarregamento' 
         });
    }
    preload(){
        
        // Barra de Progresso
        const larguraJogo = this.sys.canvas.width;
        const barraDeProgresso =  this.add.graphics();
        const larguraBarra = 0.8 * larguraJogo;

        this.load.on('progress', (porcentagem) =>{
            barraDeProgresso.clear();
            barraDeProgresso.fillStyle(0xffffff, 1);
            barraDeProgresso.fillRect((larguraJogo - larguraBarra)/2 , this.sys.game.config.height / 2 , larguraBarra * porcentagem, 20);
            barraDeProgresso.lineStyle(4, 0xffff00, 1);
            barraDeProgresso.strokeRect((larguraJogo - larguraBarra)/ 2 , this.sys.game.config.height /2 , larguraBarra, 20);
            
          });

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