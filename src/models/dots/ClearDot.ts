import {Dot} from './Dot'

export class ClearDot extends Dot {
    draw() {
        this.ctx.clearRect(this.x, this.y, this.step, this.step)
    }
}
