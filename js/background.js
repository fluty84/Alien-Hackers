class Background {
    constructor(ctx, posX, posY, width, height, gameSize) {
        this.ctx = ctx
        this.bgPos = {
            x: posX,
            y: posY
        }
        this.bgSize = {
            w: width,
            h: height
        }
        this.gameSize = gameSize
        this.bgImage = 'demo.jpeg'
        this.imageInstance = undefined
        this.init()

    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.bgImage}`
    }

    draw() {
        
        this.ctx.drawImage(this.imageInstance, this.bgPos.x, this.bgPos.y, this.bgSize.w, this.bgSize.h)

        this.ctx.lineWidth = 20
        this.ctx.strokeStyle = 'green'
        this.ctx.strokeRect(200, 0, 200, 200)
    }
}