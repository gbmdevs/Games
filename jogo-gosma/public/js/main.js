import CenaCarregamento from './cena-carregamento.js';
import CenaJogo from './cena-jogo.js';

// Estudar cada comando abaixo
const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 240,
    parent: 'jogo-slime-floresta',
    scene: [
        CenaCarregamento,
        CenaJogo
    ]
};

const jogo = new Phaser.Game(config);
