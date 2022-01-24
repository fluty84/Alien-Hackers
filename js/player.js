class Player {
    constructor(ctx, posX, posY, width, height, gameWidth, gameHeight) {
        this.ctx = ctx
        this.playerPos = {
            x: posX,
            y: posY
        }
        this.playerSize = {
            w: width,
            h: height
        }
        this.playerImage = 'player.png'
        this.imageInstance = undefined
        this.gameSize = {
            w: gameWidth,
            h: gameHeight
        }
        this.init()
        this.actualPlayerPos = []
        this.lives = 5
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.playerImage}`
        this.draw()
        this.move()
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y + 200, 100, 200)
        
    }

    frameCollision() {
        if (this.playerPos.x >= this.gameSize.w) {
            //this.playerPos.x -= 100
            return true
        } else if (this.playerPos.x < 0) {
            //this.playerPos.x += 100
            return true
        } else if (this.playerPos.y < 0) {
            //this.playerPos.y += 100
            return true
        } else if (this.playerPos.y >= 600) {
            //this.playerPos.y -= 100
            return
        } else {
            return false
        }
    }
    
    move() {
        document.addEventListener('keydown', event => {
            const { key } = event
            switch (key) {
                case 'w':
                    if (this.frameCollision() || alienHack.isCollision()) {
                        this.playerPos += 100
                        return "up collision"
                    } else {
                        this.playerPos.y -= 100
                    }
                    break;
                case 's': 
                    if (this.frameCollision() || alienHack.isCollision()) {
                        this.playerPos.y -=100
                        return "down collision"
                    } else {
                        this.playerPos.y += 100
                    }
                    break;
                case 'd':
                    if (this.frameCollision() || alienHack.isCollision()) {
                        this.playerPos.x -=100
                        return "right collision"
                    } else {
                        this.playerPos.x += 100
                    }
                    break;
                case 'a':
                    if (this.frameCollision() || alienHack.isCollision()) {
                        this.playerPos.x +=100
                        return "left collision"
                    } else {
                        this.playerPos.x -= 100
                    }
                    
            }
        })
    }
}