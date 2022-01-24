class Wall {
    constructor(ctx, posX, posY, gameWidth, gameHeight, playerPos) {
        this.ctx = ctx
        this.wallPos = {
            x: posX,
            y: posY
        }
        this.wallSize = {
            w: 100,
            h: 200
        }
        this.wallImage = 'wall.png'
        this.imageInstance = undefined
        this.gameSize = {
            w: gameWidth,
            h: gameHeight
        }
        this.lives = 100
        this.playerPos = playerPos
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.wallImage}`
        this.draw()
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.wallPos.x, this.wallPos.y, this.wallSize.w, this.wallSize.h)
    }
}