class Player {
    constructor(ctx, posX, posY, width, height, gameWidth, gameHeight) {
        this.ctx = ctx
        this.playerPos = {
            x: posX,
            y: posY
        }
        this.playerSize = {
            w: 100,
            h: 200
        }
        this.playerImage = 'player.png'
        this.imageInstance = undefined
        this.gameSize = {
            w: gameWidth,
            h: gameHeight
        }
        this.init()
        this.lives = 5
        this.speed = 100
        this.bullets = [];
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.playerImage}`
        this.draw()
        this.move()
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }

    frameCollision() {
        if (this.playerPos.x + this.speed > 1201) {
            this.playerPos.x = 1100
            return true
        } else if (this.playerPos.x + this.speed < 99) {
            this.playerPos.x = 0
            return true
        } else if (this.playerPos.y < -1) {
            this.playerPos.y = 0
            return true
        } else if (this.playerPos.y > 501) {
            this.playerPos.y = 500
            return true
        } else {
            return false
        }
    }
    
    move() {
        document.addEventListener('keydown', event => {
            const { key } = event
            switch (key) {
                case 'w':
                    this.playerPos.y -= this.speed
                    if (this.frameCollision() || alienHack.enemyCollision()) {
                        this.playerPos.y += this.speed
                        return "up collision"
                    }
                    break;
                case 's':
                    this.playerPos.y += this.speed
                    if (this.frameCollision() || alienHack.enemyCollision()) {
                        this.playerPos.y -= this.speed
                        return "down collision"
                    }
                    break;
                case 'd':
                    this.playerPos.x += this.speed
                    if (this.frameCollision() || alienHack.enemyCollision()) {
                        this.playerPos.x -= this.speed
                        return "right collision"
                    }
                    break;
                case 'a':
                    this.playerPos.x -= this.speed
                    if (this.frameCollision() || alienHack.enemyCollision()) {
                        this.playerPos.x += this.speed
                        return "left collision"
                    }
                    break;
            }













        })
    }
}