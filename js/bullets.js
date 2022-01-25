class Bullets {
    constructor(ctx, playerPosX, playerPosY,color) {
        this.ctx = ctx
        this.posX = playerPosX 
        this.posY = playerPosY + 50
        this.radius = 10
        this.color = color
        
    }
  
    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.move()
       // this.fire()
        
    }
  
    move() {
        this.posX += 120
        this.posY += 0
    }

}

class EnemyBullets extends Bullets {
    constructor(ctx, playerPosX, playerPosY,enemyPosX, enemyPosY, color){
    super(ctx, playerPosX, playerPosY, color)
    
    this.playerPosX = playerPosX
    this.playerPosY = playerPosY
    this.enemyPosX = enemyPosX
    this.enemyPosY = enemyPosY
    this.posX = enemyPosX + 51
    this.posY = enemyPosY - 50
    
}
    move(){
        
        console.log("donde coño "+this.playerPosX, this.playerPosY)
        if (this.enemyPosY < this.playerPosY && this.enemyPosX < this.playerPosX) {
            this.posX += 150
            this.posY += 150
        } else if (this.enemyPosX > this.playerPosX && this.enemyPosY > this.playerPosY) {
            this.posX -= 150
            this.posY -= 150
        }
 
    }
}