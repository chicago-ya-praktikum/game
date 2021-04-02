import {Dot} from '../Dot'

export class PlayerDot extends Dot {
    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.x + this.boxSpaceDiameter, this.y + this.boxSpaceDiameter,
            this.boxSpaceDiameter / 1.1, 0, 2 * Math.PI)
        this.ctx.stroke()
    }
}
