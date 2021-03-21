import InicioCena  from './InicioCena.js';
import MundoCena   from './MundoCena.js';

// Configurações do jogo

const config = { 
  type: Phaser.AUTO,
  parent: 'mmo-rpg',
  width: 800, // Largura
  heigth: 600, // Altura
  zoom: 3,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
       gravity: {
          y: 0
       },
       debug: true
    }
  },
  scene: [
    InicioCena,
    MundoCena
  ]
};

// Iniciar o Jogo em si
// Estudar passagem de parametros
var game = new Phaser.Game(config);
 