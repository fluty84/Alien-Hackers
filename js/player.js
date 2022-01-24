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
        this.speed = 100
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

        if (this.playerPos.x + this.speed > 1201) { //salida derecha
            this.playerPos.x = 1100
            return true
        } else if (this.playerPos.x + this.speed < 99) { //salida izquierda
            console.log('me las piro por la izquierda')
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
                    if (this.frameCollision() || alienHack.isCollision()) {
                        this.playerPos.y += this.speed
                        console.log(this.playerPos)
                        return "up collision"
                    } else {
                        console.log(this.playerPos)
                        this.playerPos.y -= this.speed
                    }
                    break;
                case 's': 
                    if (this.frameCollision() || alienHack.isCollision()) {
                        this.playerPos.y -= this.speed
                        console.log(this.playerPos.y)
                        return "down collision"
                    } else {
                        this.playerPos.y += this.speed
                        console.log(this.playerPos.y)
                    }
                    break;
                case 'd':
                    if (this.frameCollision() || alienHack.isCollision()) {
                        this.playerPos.x -= this.speed
                        return "right collision"
                    } else {
                        console.log(this.playerPos)
                        this.playerPos.x += this.speed
                    }
                    break;
                case 'a':
                    if (this.frameCollision() || alienHack.isCollision()) {
                        this.playerPos.x = 0
                        console.log('te empujo a la derecha')
                        return "left collision"
                        
                    } else {
                        console.log(this.playerPos)
                        this.playerPos.x -= this.speed
                    }
                    
            }
        })
    }
}