import { Dot } from './Dot'

export class ClearDot extends Dot {
    draw() {
        const img = new Image()
        img.src = './assets/gameElements/ground/ground.png'

        img.onload = () => {
            this.ctx.drawImage(img, this.x, this.y, this.step, this.step)
        }
    }
}
