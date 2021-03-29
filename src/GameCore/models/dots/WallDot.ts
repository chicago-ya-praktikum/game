import {Dot} from './Dot'

export class WallDot extends Dot {
    draw() {
        const img = new Image()
        img.src = './assets/gameElements/wall/wall.png'
        // this.ctx.fillRect(this.x, this.y, this.step, this.step)
        img.onload = () => {
            this.ctx.drawImage(img, this.x, this.y, this.step, this.step)
        }
    }
}
