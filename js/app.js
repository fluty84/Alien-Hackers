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
    mousePosition: { x: 555, y: 666 },
    init() {
        this.setContext()
        this.setSize()
        this.createBackGround()
        this.createGameboard()
        this.createPlayer()
        this.createEnemy()
        this.createWall()
        this.drawAll()
        this.shoot()
        //this.enemyIntervalShoot()
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
        this.player = new Player(this.ctx, 0, 100, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize, 100, this.framesCounter)
    },
    createEnemy() {
        this.enemy.push(new Enemy(this.ctx, 800, 300, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize))
    },
    createWall() {
        this.wall.push(new Wall(this.ctx, 500, 450, 100, 200, this.gameSize.w, this.gameSize.h, this.gameSize))
        this.wall.push(new Wall(this.ctx, 500, 200, 100,100, this.gameSize.h, this.gameSize))
        this.wall.push(new Wall(this.ctx, 700, 575, 100, 225, this.gameSize.h, this.gameSize))

    },
    createBullets() {
        this.bullets.push(new Bullets(this.ctx, this.player.playerPos.x, this.player.playerPos.y, 'orange', this.mousePosition));

    },
    enemyBullets() {
        this.bullets.push(new EnemyBullets(this.ctx, this.player.playerPos.x, this.player.playerPos.y, this.enemy[0].enemyPos.x, this.enemy[0].enemyPos.y, 'green'))
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
            this.bulletCollisionP()
            this.bullets.forEach(elm => elm.draw())
            this.enemy.forEach(elm => elm.draw())
            this.wall.forEach(elm => elm.draw())
            this.enemyIntervalShoot()
            this.clearBullets()
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


        //////////////////////////////////////////// COLLISIONS/////////////////////////// //////////////////////////////

    },
    enemyCollision() {   ////PLAYER VS ENEMY
        return this.enemy.some(elm => {
            //console.log(this.player.playerPos, elm.enemyPos)
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
    wallCollision() {  ////PLAYER VS WALL

        return this.wall.some(elm => {
            //console.log(this.player.playerPos, elm.wallPos)
            if (
                this.player.playerPos.x < elm.wallPos.x + elm.wallSize.w &&                                    //Izquierda
                this.player.playerPos.x + this.player.playerSize.w > elm.wallPos.x &&
                this.player.playerPos.y < elm.wallPos.y + elm.wallSize.h &&
                this.player.playerSize.h + this.player.playerPos.y > elm.wallPos.y
            ) {
                return true
            }
        })
    },
    bulletCollisionW() { ///// BULLETS VS WALL
        return this.bullets.some(elm => {
            //console.log(this.wall.wallPos, elm.posX)

            for (let i = 0; i < this.wall.length; i++) { //// si sobra tiempo ForEEECH
                if (this.wall[i].wallPos.x < elm.posX &&                                    //Izquierda
                    this.wall[i].wallPos.x + this.wall[i].wallSize.w > elm.posX &&   //Arriba
                    this.wall[i].wallPos.y < elm.posY &&         //Abajo
                    this.wall[i].wallSize.h + this.wall[i].wallPos.y > elm.posY              //Derecha
                ) {
                    this.bullets = []
                    return true
                }
            }

        })//final bucle some

    },

    bulletCollisionE() { //// BULLETS VS ENEMY
        return this.bullets.some(elm => {
            for (let i = 0; i < this.enemy.length; i++) { //// si sobra tiempo ForEEECH
                if (this.enemy[i].enemyPos.x < elm.posX  &&
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
    bulletCollisionP() { ///// BULLETS VS PLAYER
        return this.bullets.some(elm => {
            if (this.player.playerPos.x < elm.posX + 20 &&
                this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                this.player.playerPos.y < elm.posY +20 &&
                this.player.playerSize.h + this.player.playerPos.y > elm.posY) {
                console.error('BUM')
                this.bullets = []
                this.player.lives--
                if (this.player.lives === 0) {
                    alert('Estoy morido')
                }
                return true
            }
        })
    },

    // if(rect1.x < rect2.x + rect2.width &&
    //     rect1.x + rect1.width > rect2.x &&
    //     rect1.y < rect2.y + rect2.height &&
    //     rect1.height + rect1.y > rect2.y) {
    // // ¡colision detectada!

    /////////////////////////////////////////////// MOVEMENTS////////////////////////////////////////////

    enemyObjetives() {
        if (this.player.playerPos.x === 200 && this.player.playerPos.y === 400) {
            this.enemyMove1()
        }
        if (this.player.playerPos.x <= 500 && this.player.playerPos.y === 600) { //if player down 500 and in his field
            this.enemyMove2()
        }
        if (this.player.playerPos.x === 400 && this.player.playerPos.y === 500) { //if player 400 500 enemy 600 600a
            this.enemyMove3()
        }
        if (this.player.playerPos.x <= 500 && this.player.playerPos.y === 500) { //if player down 500 and in his field
            this.enemyMove4()
        }
    },






    enemyMove1() { // 3D 200 400 enemy to G1 500 200

        setTimeout(() => {
            this.enemy.forEach(elm => {

                if (elm.enemyPos.x < 500 && elm.enemyPos.y < 200) {
                    elm.enemyPos.x += 50
                    elm.enemyPos.y += 50
                } else if (elm.enemyPos.x > 500 && elm.enemyPos.y > 200) {
                    elm.enemyPos.x -= 50
                    elm.enemyPos.y -= 50
                }
            })

        }, 500)


        setTimeout(() => { this.enemy[0].goHide() }, 4000)

    },
    enemyMove2() { // Y 600 enemy to G1 500 200

        setTimeout(() => {
            this.enemy.forEach(elm => {
                //alert('the fulminooo')

                if (elm.enemyPos.x < 1000 && elm.enemyPos.y < 600) {
                    elm.enemyPos.x += 50
                    elm.enemyPos.y += 50
                } else if (elm.enemyPos.x > 1000 && elm.enemyPos.y > 600) {
                    elm.enemyPos.x -= 50
                    elm.enemyPos.y -= 50
                }
            })

        }, 1000)


        setTimeout(() => { this.enemy[0].goHide() }, 4000)

    },
    enemyMove3() { // Player 400 - 500 enemy to 700 - 600

        setTimeout(() => {
            this.enemy.forEach(elm => {
                //alert('the fulminooo')

                if (elm.enemyPos.x < 700 && elm.enemyPos.y < 600) {
                    elm.enemyPos.x += 50
                    elm.enemyPos.y += 50
                } else if (elm.enemyPos.x > 700 && elm.enemyPos.y > 600) {
                    elm.enemyPos.x -= 50
                    elm.enemyPos.y -= 50
                }
            })

        }, 1000)


        setTimeout(() => { this.enemy[0].goHide() }, 4000)

    },
    enemyMove4() { // Player Y - 500 enemy to 1100 - 600

        setTimeout(() => {
            this.enemy.forEach(elm => {
                //alert('the fulminooo')

                if (elm.enemyPos.x < 1100 && elm.enemyPos.y < 600) {
                    elm.enemyPos.x += 50
                    elm.enemyPos.y += 50
                } else if (elm.enemyPos.x > 1100 && elm.enemyPos.y > 600) {
                    elm.enemyPos.x -= 50
                    elm.enemyPos.y -= 50
                }
            })

        }, 1000)


        setTimeout(() => { this.enemy[0].goHide() }, 4000)

    },




    /////////////////////////Shooots////////////////////////////////////////////
    shoot() {
        document.querySelector('#myCanvas').addEventListener('click', event => {
            this.createBullets()
            this.mouseX = event.clientX
            this.mouseY = event.clientY

            this.mousePosition.x = this.mouseX
            this.mousePosition.y = this.mouseY

        })
    },


    enemyIntervalShoot() {
        if (this.framesCounter % 20 === 0) {
            this.enemyBullets()
        }
    }
}