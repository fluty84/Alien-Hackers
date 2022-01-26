class Player {
    constructor(ctx, posX, posY, width, height, gameWidth, gameHeight, framesCounter) {
        this.ctx = ctx
        this.playerPos = {
            x: posX,
            y: posY
        }
        this.playerSize = {
            w: 100,
            h: 200
        }
        this.playerImage = 'playerSprite1.png'
        
        
        // this.image.frames = 3;
        // this.image.framesIndex = 0;
        
        
        
        this.imageInstance = undefined

        this.gameSize = {
            w: gameWidth,
            h: gameHeight
        }
        this.init()
        this.lives = 5
        this.speed = 100
        this.bullets = [];
        this.framesCounter = framesCounter
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.playerImage}`

        this.draw()
        this.move()
    }

    draw() {
        this.ctx.drawImage(
            this.imageInstance,
            
            
            
            // this.image.framesIndex * (this.image.width / this.image.frames),
            // 0,
            // this.image.width / this.image.frames,
            // this.image.height,



            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h)
        
        // this.animate(framesCounter)
    }
    // animate(framesCounter) {
    //     if (framesCounter % 5 == 0) {
    //         this.image.framesIndex++;
    //     }
    //     if (this.image.framesIndex >= this.image.frames) {
    //         this.image.framesIndex = 0;
    //     }
    // }

    frameCollision() {
        if (this.playerPos.x + this.speed > 1201) {

            return true
        } else if (this.playerPos.x + this.speed < 99) {

            return true
        } else if (this.playerPos.y < 99) {

            return true
        } else if (this.playerPos.y > 602) {

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
                    if (this.frameCollision() || alienHack.enemyCollision() || alienHack.wallCollision()) {
                        this.playerPos.y += this.speed
                        return "up collision"
                    }
                    break;
                case 's':
                    this.playerPos.y += this.speed
                    if (this.frameCollision() || alienHack.enemyCollision() || alienHack.wallCollision()) {
                        this.playerPos.y -= this.speed
                        return "down collision"
                    }
                    break;
                case 'd':
                    this.playerPos.x += this.speed
                    if (this.frameCollision() || alienHack.enemyCollision() || alienHack.wallCollision()) {
                        this.playerPos.x -= this.speed
                        return "right collision"
                    }
                    break;
                case 'a':
                    this.playerPos.x -= this.speed
                    if (this.frameCollision() || alienHack.enemyCollision() || alienHack.wallCollision()) {
                        this.playerPos.x += this.speed
                        return "left collision"
                    }
                    break;
            }

        })
    }

}