const alienHack = {
    appName: 'ALIEN HACK',
    authors: ['Guillermo Perez','Eduardo Gordillo'],
    version: '1.0.0',
    license: 'GNU',
    gameSize: { w: undefined, h: undefined },
    ctx: undefined,
    grid: undefined,
    init() {
        this.setContext()
        this.setSize()
        this.drawAll()
    },
    setContext() {
        this.ctx = document.querySelector('#myCanvas').getContext('2d')
        console.log(this.ctx)
    },
    setSize() {
        this.gameSize = {
            w: 1200,
            h: 600
        }
        document.querySelector('#myCanvas').setAttribute('width', this.gameSize.w)
        document.querySelector('#myCanvas').setAttribute('height', this.gameSize.h)
    },
    drawAll() {
        this.drawLinearRectangle1B

    },

    drawLinearRectangle1B() { //pruebas borrar

        this.ctx.lineWidth = 20
        this.ctx.strokeStyle = 'green'
        this.ctx.strokeRect(200, 0, 200, 200)
    },

}