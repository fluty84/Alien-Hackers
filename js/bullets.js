class Bullets {
    constructor(ctx, playerPosX, playerPosY) {
        this.ctx = ctx
        this.posX = playerPosX +100
        this.posY = playerPosY + 50 
        this.radius = 10
      
    }

    
    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "orange"
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