class Bullets {
    constructor(ctx, playerPosX, playerPosY) {
        this.ctx = ctx
        this.posX = playerPosX + 100
        this.posY = playerPosY + 300
               
        this.radius = 10
                
        this.init()
    }

    init() {
        this.draw()
        this.move()
    }
  
    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "green"
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.move()
    }
  
    move() {
        this.posX += 120
        this.posY += 0
    }
}