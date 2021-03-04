import {Dot} from './Dot'

export class PlayerDot extends Dot {
    draw() {
        const img = new Image()
        img.src = './assets/gameElements/player/front.png'
        this.ctx.beginPath()
        img.onload = () => {
            this.ctx.drawImage(img, this.x, this.y, 45, 45)
            this.ctx.stroke()
        }
    }
}
