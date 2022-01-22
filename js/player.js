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
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.playerImage}`
        this.draw()
        this.setEventHandlers()
        
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y + 200, 100, 200)
        this.move()
    }

    move() {
        this.checkCollision()
    }

    checkCollision() {
        if (this.playerPos.x >= this.gameSize.w || this.playerPos.x <= -100) {
            alert('Derecha e izquierda')
        }
        console.log(this.playerPos.y)
        if (this.playerPos.y || this.playerPos.y >= 500) {
            alert('Arriba y abajo')
        }
    }

    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === 'ArrowRight' ? this.playerPos.x += 100 : null
            key === 'ArrowLeft' ? this.playerPos.x -= 100 : null
            key === 'ArrowUp' ? this.playerPos.y -= 100 : null
            key === 'ArrowDown' ? this.playerPos.y += 100 : null
        })
    }
}