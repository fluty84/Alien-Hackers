class Enemy {
    constructor(ctx, posX, posY, gameWidth, gameHeight) {
        this.ctx = ctx
        this.enemyPos = {
            x: posX,
            y: posY
        }
        this.enemySize = {
            w: 100,
            h: 100
        }
        this.enemyImage = 'alien.png'
        this.imageInstance = undefined
        this.gameSize = {
            w: gameWidth,
            h: gameHeight
        }
        this.lives = 5
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.enemyImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
    }

    goHide() { //enemy to K4 900 500

        if (this.enemyPos.x < 700 && this.enemyPos.y < 500) {
            this.enemyPos.x += 50
            this.enemyPos.y += 50
        } else if (this.enemyPos.x > 700 && this.enemyPos.y > 500) {
            this.enemyPos.x -= 50
            this.enemyPos.y -= 50
        } else {
            //alienHack.enemyBullets()
           // console.log('me escondo')
        }

    }


}