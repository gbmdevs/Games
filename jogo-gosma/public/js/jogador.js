export default class Jogador { 
    constructor(cena)  {
        this.cena   = cena;
        console.log(cena);
        this.sprite = cena.physics.add.sprite(10 , 50, 'slime');
        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);

        cena.anims.create({
            key: 'direita',
            frames: cena.anims.generateFrameNumbers('slime', { start: 3 , end: 5}),
            frameRate: 10,
            repeat: -1
        })

        cena.anims.create({
            key: 'esquerda',
            frames: cena.anims.generateFrameNumbers('slime', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    }
}