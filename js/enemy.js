class Enemy {
    constructor(ctx, posX, posY, gameWidth, gameHeight) {
        this.ctx = ctx
        this.enemyPos = {
            x: posX = 800,
            y: posY = 700
        }
        this.enemySize = {
            w: 100,
            h: 100
        }
        this.enemyImage = 'enemy.png'
        this.imageInstance = undefined
        this.gameSize = {
            w: gameWidth,
            h: gameHeight
        }
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.enemyImage}`
        this.imageInstance.onload = () => {
            this.draw()
        }
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemyPos.x, this.enemyPos.y, 100, 100)
    }
}