class Wall {
    constructor(ctx, posX, posY, gameWidth, gameHeight) {
        this.ctx = ctx
        this.wallPos = {
            x: posX = 700,
            y: posY = 400
        }
        this.wallSize = {
            w: 100,
            h: 300
        }
        this.wallImage = 'wall.png'
        this.imageInstance = undefined
        this.gameSize = {
            w: gameWidth,
            h: gameHeight
        }
        this.lives = 100
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.wallImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.wallPos.x, this.wallPos.y, this.wallSize.w, this.wallSize.h)
    }

    
}