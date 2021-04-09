import {Dot} from '../Dot'

export class SpaceDot extends Dot {
    draw() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(this.x, this.y, this.step, this.step)
        this.ctx.fillStyle = 'black'
    }
}
