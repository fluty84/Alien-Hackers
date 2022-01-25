const alienHack = {
    appName: 'ALIEN HACK',
    authors: ['Guillermo Perez', 'Eduardo Gordillo'],
    version: '1.0.0',
    license: 'GNU',
    gameSize: { w: undefined, h: undefined },
    ctx: undefined,
    FPS: 60,
    framesCounter: 0,
    background: undefined,
    gameBoard: undefined,
    player: undefined,
    enemy: [],
    wall: [],
    bullets: [],
    init() {
        this.setContext()
        this.setSize()
        this.createBackGround()
        this.createGameboard()
        this.createPlayer()
        this.createEnemy()
        this.createWall()
        this.drawAll()
        this.setEventHandlers()
    },
    setContext() {
        this.ctx = document.querySelector('#myCanvas').getContext('2d')
        console.log(this.ctx)
    },
    setSize() {
        this.gameSize = {
            w: 1200,
            h: 900
        }
        document.querySelector('#myCanvas').setAttribute('width', this.gameSize.w)
        document.querySelector('#myCanvas').setAttribute('height', this.gameSize.h)
    },
    createBackGround() {
        this.background = new Background(this.ctx, 0, 0, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize)
    },
    createGameboard() {
        this.gameBoard = new Gameboard(this.ctx, 0, 200, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize)
    },
    createPlayer() {
        this.player = new Player(this.ctx, 0, 100, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize, 100)
    },
    createEnemy() {
        this.enemy.push(new Enemy(this.ctx, 800, 300, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize))
    },
    createWall() {
        this.wall.push(new Wall(this.ctx, 500, 400, 100, 200, this.gameSize.w, this.gameSize.h, this.gameSize))
        // this.wall.push(new Wall(this.ctx, 900, 600, this.gameSize.w, this.gameSize.h, this.gameSize))ss
    },
    createBullets() {
        this.bullets.push(new Bullets(this.ctx, this.player.playerPos.x, this.player.playerPos.y));
        
    },
    drawAll() {
        setInterval(() => {
            this.clearAll()
            this.background.draw()
            this.gameBoard.draw()
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.followEnemy
            this.enemyCollision()
            this.player.frameCollision()
            this.wallCollision()
            this.bullets.forEach(elm => elm.draw())
            this.enemy.forEach(elm => elm.draw())
            this.wall.forEach(elm => elm.draw())
            this.clearBullets()
            console.log(this.bullets.length)
            this.player.draw()
        }, 40)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },
    clearEnemy() {
        this.enemy = this.enemy.filter(elm => elm.enemyPos.x >= 0)
    },
    clearWall() {
        this.wall = this.wall.filter(elm => elm.wallPos.x >= 0)
    },
    clearBullets() {
        this.bullets = this.bullets.filter(elm => elm.posX <= this.gameSize.w)
    },
    enemyCollision() {
        return this.enemy.some(elm => {
            console.log(this.player.playerPos, elm.enemyPos)
            if (
                this.player.playerPos.x < elm.enemyPos.x + elm.enemySize.w &&                                    //Izquierda
                this.player.playerPos.x + this.player.playerSize.w > elm.enemyPos.x &&   //Arriba
                this.player.playerPos.y < elm.enemyPos.y + elm.enemySize.h &&         //Abajo
                this.player.playerSize.h + this.player.playerPos.y > elm.enemyPos.y              //Derecha
            ) {
                return true
            }
          
        })
    },
    wallCollision() {

        return this.wall.some(elm => {
            console.log(this.player.playerPos, elm.wallPos)
            if (
                this.player.playerPos.x < elm.wallPos.x + elm.wallSize.w &&                                    //Izquierda
                this.player.playerPos.x + this.player.playerSize.w > elm.wallPos.x &&   
                this.player.playerPos.y < elm.wallPos.y + elm.wallSize.h &&        
                this.player.playerSize.h + this.player.playerPos.y > elm.wallPos.y             
            ) {
                console.log('collision')
                return true
            }         
        })
    },
    bulletCollisionW() {
        return this.bullets.some(bullet => {
            console.log(this.player.playerPos, elm.enemyPos)
            if (
                this.player.playerPos.x < elm.enemyPos.x + elm.enemySize.w &&                                    //Izquierda
                this.player.playerPos.x + this.player.playerSize.w > elm.enemyPos.x &&   //Arriba
                this.player.playerPos.y < elm.enemyPos.y + elm.enemySize.h &&         //Abajo
                this.player.playerSize.h + this.player.playerPos.y > elm.enemyPos.y              //Derecha
            ) {
                return true
            }

        })
        
    },
    followEnemy() {
        if (this.player.playerPos.x && this.player.playerPos.y) {
            this.enemyMove1()
        }
    },
    enemyMove1() {
        this.enemy.forEach(elm => {
            if (elm.enemyPos.y < 500 && elm.enemyPos.x < 600) {
                elm.enemyPos.y += 50
                elm.enemyPos.x += 50
            } else if (elm.enemyPos.y > 500 && elm.enemyPos.x > 600) {
                elm.enemyPos.y -= 50
                elm.enemyPos.y -= 50
            }
        })
    },

    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === ' ' ? this.createBullets() : null
        })
    }
}