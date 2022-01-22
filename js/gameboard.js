class Gameboard {
    constructor(ctx, posX, posY, width, height, gameSize) {
        this.ctx = ctx
        this.gmPos = {
            x: posX,
            y: posY
        }
        this.gmSize = {
            w: width,
            h: height
        }
        this.gameSize = gameSize
        this.gmImage = 'grid.png'
        this.imageInstance = undefined
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.gmImage}`
        this.imageInstance.onload = () => {
            this.draw()
        }
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.gmPos.x, this.gmPos.y, 1200, 600)
    }
}