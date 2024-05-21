class Breakout extends Phaser.Scene {
    /**
     * Cria uma nova cena Breakout.
     */
    constructor() {
        super({ key: 'breakout' });

        // Referências aos elementos do jogo
        this.bricks; // Grupo de tijolos
        this.paddle; // Pá do jogador
        this.ball;   // Bola do jogo
    }

    /**
     * Pré-carrega os recursos necessários para o jogo.
     */
    preload() {
        // Carrega a imagem de fundo e a folha de sprites do jogo
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.atlas('assets', 'assets/games/breakout/breakout.png', 'assets/games/breakout/breakout.json');
    }

    /**
     * Cria os elementos do jogo na cena.
     */
    create() {
        // Adiciona a imagem de fundo
        this.add.image(400, 300, 'sky');

        // Habilita colisões com os limites do mundo, mas desabilita com o chão
        this.physics.world.setBoundsCollision(true, true, true, false);

        // Cria os tijolos em uma grade de 10x6
        this.bricks = this.physics.add.staticGroup({
            key: 'assets',
            frame: ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'],
            frameQuantity: 10,
            gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
        });

        // Adiciona a bola com física ativa, configurando limites de rebote
        this.ball = this.physics.add.image(400, 500, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
        this.ball.setData('onPaddle', true); // Define o estado inicial da bola

        // Adiciona a pá do jogador com física ativa e a torna imóvel
        this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle1').setImmovable();

        // Define os colisores entre os elementos do jogo
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

        // Eventos de entrada do jogador
        this.input.on('pointermove', function(pointer) {
            // Mantém a pá dentro dos limites do jogo
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
            // Se a bola estiver na pá, a move junto com a pá
            if (this.ball.getData('onPaddle')) {
                this.ball.x = this.paddle.x;
            }
        }, this);

        this.input.on('pointerup', function(pointer) {
            // Quando o jogador solta o botão do mouse/touch, libera a bola
            if (this.ball.getData('onPaddle')) {
                this.ball.setVelocity(-75, -300);
                this.ball.setData('onPaddle', false);
            }
        }, this);
    }

    /**
     * Chamado quando a bola colide com um tijolo.
     * @param {Phaser.GameObjects.Image} ball - A bola do jogo.
     * @param {Phaser.GameObjects.Image} brick - O tijolo colidido.
     */
    hitBrick(ball, brick) {
        brick.disableBody(true, true); // Remove o tijolo do jogo
        // Verifica se não há mais tijolos ativos, e se não houver, reseta o nível
        if (this.bricks.countActive() === 0) {
            this.resetLevel();
        }
    }

    /**
     * Reseta a posição da bola para a posição inicial na pá do jogador.
     */
    resetBall() {
        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddle.x, 500);
        this.ball.setData('onPaddle', true);
    }

    /**
     * Reseta o nível do jogo.
     */
    resetLevel() {
        this.resetBall(); // Reseta a bola
        // Habilita todos os tijolos do jogo
        this.bricks.children.each(brick => {
            brick.enableBody(false, 0, 0, true, true);
        });
    }

    /**
     * Chamado quando a bola colide com a pá do jogador.
     * @param {Phaser.GameObjects.Image} ball - A bola do jogo.
     * @param {Phaser.GameObjects.Image} paddle - A pá do jogador.
     */
    hitPaddle(ball, paddle) {
        let diff = 0;
        if (ball.x < paddle.x) {
            // A bola está à esquerda da pá
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        } else if (ball.x > paddle.x) {
            // A bola está à direita da pá
            diff = ball.x - paddle.x;
            ball.setVelocityX(10 * diff);
        } else {
            // A bola está no centro da pá, adiciona um pouco de aleatoriedade para evitar que ela suba em linha reta
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }

    /**
     * Atualiza a lógica do jogo a cada quadro.
     */
    update() {
        // Se a bola passar do limite inferior da tela, reseta sua posição
        if (this.ball.y > 600) {
            this.resetBall();
        }
    }
}

// Configurações do jogo
const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [Breakout],
    physics: {
        default: 'arcade'
    }
};

// Inicializa o jogo com as configurações especificadas
const game = new Phaser.Game(config);
