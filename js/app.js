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
        this.background = new Background(this.ctx, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize)
    },
    createGameboard() {
        this.gameBoard = new Gameboard(this.ctx, 0, 300, this.gameSize.w, this.gameSize.h, this.gameSize)
    },
    createPlayer() {
        this.player = new Player(this.ctx, 0, 0, 100, 200, this.gameSize.w, this.gameSize.h, this.gameSize)
    },
    createEnemy() {
        this.enemy.push(new Enemy(this.ctx, 300, 300, this.gameSize.w, this.gameSize.h, this.gameSize))
    },
    createWall() {
        this.wall.push(new Wall(this.ctx, 200, 500, this.gameSize.w, this.gameSize.h, this.gameSize))
    },
    createBullets() {
        console.log('disparo')
        this.bullets.push(new Bullets(this.ctx, this.player.playerPos.x, this.player.playerPos.y));
        this.bullets.forEach(elm => elm.init())
    },
    drawAll() {
        setInterval(() => {
            this.clearAll()
            this.background.draw()
            this.gameBoard.draw()
            this.bullets.forEach(elm => elm.draw())
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.isCollision()
            this.player.frameCollision()
            this.wallCollision()
            this.enemy.forEach(elm => elm.draw())
            this.wall.forEach(elm => elm.draw())
            this.player.draw()
        }, 40)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },
    clearEnemy() {
        this.enemy = this.enemy.filter(elm => elm.enemyPos.x >= 0)
    },
    clearBullets() {
        this.bullets = this.bullets.filter(elm => elm.posX <= this.gameSize.w)
    },
    isCollision() {
        return this.enemy.some(enm => {
            return (   
                this.player.playerPos.x >= enm.enemyPos.x &&                                    //Izquierda
                this.player.playerPos.y + this.player.playerSize.h + 100 >= enm.enemyPos.y &&   //Arriba
                this.player.playerPos.y + this.player.playerSize.h <= enm.enemyPos.y &&         //Abajo
                this.player.playerPos.x <= enm.enemyPos.x + enm.enemySize.w - 100               //Derecha
            )
        })
    }, 
    wallCollision(){
        this.wall.forEach(el => {
            // console.log(playerPos, el.wallPos.x)
            if(this.player.playerPos.x + this.player.playerSize.h + this.player.speed > el.wallPos.x){
                console.log('me doy por la derecha con el muro')
                this.player.playerPos.x - this.player.speed
                return true
                
            } else if (this.player.playerPos.x < el.wallPos.x + el.wallSize.w){ 
                console.log('me doy por la izquierda con el muro')
            }
        });
    },
    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            switch (key) {
                case ' ':
                    this.createBullets()
                    break;
            }
            // key === ' ' ? this.bullets : null
        })
    }
}