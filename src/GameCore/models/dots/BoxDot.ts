import {Dot} from './Dot'

export class BoxDot extends Dot {
    draw() {
        const img = new Image()
        img.src = './assets/gameElements/box/box.png'
        img.onload = () => {
            const shift = (this.step - this.boxDiameter) / 2
            this.ctx.strokeRect(this.x + shift, this.y + shift, this.boxDiameter, this.boxDiameter)
        }
    }
}
