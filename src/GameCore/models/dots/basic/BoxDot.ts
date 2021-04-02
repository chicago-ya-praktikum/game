import {Dot} from '../Dot'

export class BoxDot extends Dot {
    draw() {
        const shift = (this.step - this.boxDiameter) / 2
        this.ctx.strokeRect(this.x + shift, this.y + shift, this.boxDiameter, this.boxDiameter)
    }
}
