class Enemy {
    constructor(ctx, posX, posY, gameWidth, gameHeight, playerPos) {
        this.ctx = ctx
        this.enemyPos = {
            x: posX,
            y: posY
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
        this.lives = 5
        this.playerPos = playerPos
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.enemyImage}`
        this.draw()
        this.move()
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemyPos.x, this.enemyPos.y, 100, 100)
    }
   
    move(){
        if (this.playerPos.x === 200 && this.playerPos.y === 300) {
            alert('te voy a hacer papilla')
        }
    }
}