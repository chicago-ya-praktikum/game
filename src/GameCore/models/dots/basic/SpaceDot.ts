import {Dot} from '../Dot'

export class SpaceDot extends Dot {
    draw() {
        this.ctx.clearRect(this.x, this.y, this.step, this.step)
    }
}
