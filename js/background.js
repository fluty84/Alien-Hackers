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
        this.bgImage = 'bgdemo.png'
        this.imageInstance = undefined
        this.init()

    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.bgImage}`
        this.imageInstance.onload = () => {
            this.draw()
        }
    }

    draw() {
        
        this.ctx.drawImage(this.imageInstance, this.bgPos.x, this.bgPos.y, this.bgSize.w, this.bgSize.h)
        //this.ctx.drawImage(this.imageInstance, 0, 0, 1200, 900)

        
    }
}