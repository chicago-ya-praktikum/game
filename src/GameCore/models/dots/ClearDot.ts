import {Dot} from './Dot'

enum Theme {
    sand = './assets/gameElements/ground/ground.png'
}

export class ClearDot extends Dot {
    draw(theme: string | null = null) {
        const img = new Image()
        switch (theme) {
            case 'sand':
                img.src = Theme.sand
                break;
            case null:
                this.ctx.fillRect(this.x, this.y, this.step, this.step)
                return
            default:
                break;
        }

        img.onload = () => {
            this.ctx.drawImage(img, this.x, this.y, this.step, this.step)
        }
    }
}
