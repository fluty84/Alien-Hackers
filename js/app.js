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
    init() {
        this.setContext()
        this.setSize()
        this.createBackGround()
        this.createGameboard()
        this.createPlayer()
        this.createEnemy()
        this.drawAll()
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
        if (this.framesCounter % 90 === 0) {
            this.enemy.push(new Enemy(this.ctx, 300, 300, this.gameSize.w, this.gameSize.h, this.gameSize))
        }
    },
    drawAll() {
        setInterval(() => {
            this.clearAll()
            this.background.draw()
            this.gameBoard.draw()
            this.player.draw()
            this.enemy.forEach(elm => elm.draw())
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.isCollision()
        }, 40)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },
    clearEnemy() {
        this.enemy = this.enemy.filter(elm => elm.enemyPos.x >= 0)
    },
    isCollision() {
        return this.enemy.some(enm => {
            return (   
                this.player.playerPos.x + this.player.playerSize.w >= enm.enemyPos.x &&
                this.player.playerPos.y + this.player.playerSize.h >= enm.enemyPos.y &&
                this.player.playerPos.x <= enm.enemyPos.x + enm.enemySize.w
            )
        })
    }
}