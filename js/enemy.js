class Enemy {
    constructor(ctx, posX, posY, width, height, gameSize) {
        this.ctx = ctx
        this.enemyPos = {
            x: posX = 800,
            y: posY = 700
        }
        this.enemySize = {
            w: 100,
            h: 100
        }
        this.gameSize = gameSize
        this.enemyImage = 'enemy.png'
        this.imageInstance = undefined
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