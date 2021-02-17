import {Dot} from './Dot'

export class BoxSpaceDot extends Dot {
    draw() {
        const shift = (this.step - this.boxSpaceDiameter) / 2

        this.ctx.fillRect(this.x + shift, this.y + shift,
            this.boxSpaceDiameter, this.boxSpaceDiameter)
    }
}
