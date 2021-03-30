import {Dot} from './Dot'

enum Ground {
    SAND = './assets/gameElements/ground/ground.png'
}

export class ClearDot extends Dot {
    draw(theme: {box?: string; ground: any; player?: string;} | undefined) {
        const img = new Image()
        switch (theme?.ground) {
            case 'sand':
                img.src = Ground.SAND
                break;
            default:
                break;
        }

        img.onload = () => {
            this.ctx.drawImage(img, this.x, this.y, this.step, this.step)
        }
    }
}
