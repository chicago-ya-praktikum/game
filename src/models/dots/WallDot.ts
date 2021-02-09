import {Dot} from './Dot'

export class WallDot extends Dot {
    draw() {
        this.ctx.fillRect(this.x, this.y, this.step, this.step)
    }
}
