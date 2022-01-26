class Bullets {
    constructor(ctx, playerPosX, playerPosY,color, mousePos) {
        this.ctx = ctx
        this.posX = playerPosX + 150
        this.posY = playerPosY + 100
        this.radius = 10
        this.color = color
        this.mousePos = mousePos
        this.orgX = this.posX
        this.orgY = this.posY
        
    }
  
    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.move()
        console.log(this.mousePos)
       // this.fire()
        
    }
  
    move() {
        this.posX += (this.mousePos.x - this.orgX)*0.1
        this.posY += (this.mousePos.y - this.orgY)*0.1
    }

    

}

// class EnemyBullets extends Bullets {
//     constructor(ctx, playerPosX, playerPosY,enemyPosX, enemyPosY, color){
//     super(ctx, playerPosX, playerPosY, color)
    
//     this.playerPosX = playerPosX
//     this.playerPosY = playerPosY
//     this.enemyPosX = enemyPosX
//     this.enemyPosY = enemyPosY
//     this.posX = enemyPosX + 51
//     this.posY = enemyPosY - 50
    
// }
//     move(){
        
//         console.log("donde coño "+this.playerPosX, this.playerPosY)
//         if (this.enemyPosY < this.playerPosY && this.enemyPosX < this.playerPosX) {
//             this.posX += 150
//             this.posY += 150
//         } else if (this.enemyPosX > this.playerPosX && this.enemyPosY > this.playerPosY) {
//             this.posX -= 150
//             this.posY -= 150
//         }
 
//     }
// }