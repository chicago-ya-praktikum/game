import {Dot} from './Dot'

enum View {
    front = './assets/gameElements/player/front.png',
    back = './assets/gameElements/player/back.png',
    right = './assets/gameElements/player/right.png',
    left = './assets/gameElements/player/left.png'
}
export class PlayerDot extends Dot {
    draw() {
        const img = new Image()
        img.src = View.front
        this.ctx.beginPath()
        img.onload = () => {
            this.ctx.drawImage(img, this.x, this.y, 45, 45)
            this.ctx.stroke()
        }
    }
}
