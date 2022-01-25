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
            this.enemyObjetives()
            this.enemyCollision()
            this.player.frameCollision()
            this.wallCollision()
            this.bulletCollisionW()
            this.bulletCollisionE()
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
        return this.bullets.some(elm => {
            console.log(this.wall.wallPos, elm.posX)
           
           for (let i = 0 ; i < this.wall.length; i++){ //// si sobra tiempo ForEEECH
            if (this.wall[i].wallPos.x < elm.posX  &&                                    //Izquierda
                this.wall[i].wallPos.x + this.wall[i].wallSize.w > elm.posX &&   //Arriba
                this.wall[i].wallPos.y < elm.posY &&         //Abajo
                this.wall[i].wallSize.h + this.wall[i].wallPos.y > elm.posY              //Derecha
            ) {          
                console.log('pun')
                this.bullets = []
                return true
            }
        }

        })//final bucle some
        
    },
    
    bulletCollisionE() {
        return this.bullets.some(elm => {
            for (let i = 0; i < this.enemy.length; i++) { //// si sobra tiempo ForEEECH
                if (this.enemy[i].enemyPos.x < elm.posX &&
                    this.enemy[i].enemyPos.x + this.enemy[i].enemySize.w > elm.posX &&
                    this.enemy[i].enemyPos.y < elm.posY &&
                    this.enemy[i].enemySize.h + this.enemy[i].enemyPos.y > elm.posY) {
                    this.bullets = []
                    this.enemy[i].lives--
                    if (this.enemy[i].lives === 0) {
                        this.enemy = []
                    }
                    return true
                }
            }
        })
    },
  

    
    enemyObjetives() {
        if (this.player.playerPos.x === 200 && this.player.playerPos.y === 400) {
            this.enemyMove1()
        }
    },
    enemyMove1() { // 3D 200 400 enemy to G1 500 200
       
        setTimeout(() => {
            this.enemy.forEach(elm => {
                //alert('the fulminooo')
                if (elm.enemyPos.x < 500 && elm.enemyPos.y < 200) {
                    elm.enemyPos.x += 50
                    elm.enemyPos.y += 50
                } else if (elm.enemyPos.x > 500 && elm.enemyPos.y > 200) {
                    elm.enemyPos.x -= 50
                    elm.enemyPos.y -= 50
                }
            })
        }, 1000)
        setTimeout(() =>{  this.enemy[0].goHide()},4000)
        
    },



    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === ' ' ? this.createBullets() : null
        })
    }
}