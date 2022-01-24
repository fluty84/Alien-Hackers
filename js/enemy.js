class Enemy {
    constructor(ctx, posX, posY, gameWidth, gameHeight) {
        this.ctx = ctx
        this.enemyPos = {
            x: posX = 800,
            y: posY = 400
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
        this.lives
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.enemyImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemyPos.x, this.enemyPos.y, 100, 100)
    }

    frameCollision() {
        if (this.playerPos.x > 1101) { //salida derecha
            //this.playerPos.x -= 100
            return true
        } else if (this.playerPos.x < 0) { //salida izquierda
            this.playerPos.x = 0
            return true
        } else if (this.playerPos.y < 0) {
            this.playerPos.y += 100
            return true
        } else if (this.playerPos.y > 500) {
            //this.playerPos.y -= 100
            return true
        } else {
            return false
        }
    }
}