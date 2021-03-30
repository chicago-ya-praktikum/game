import {Dot} from './Dot'
import {ThemeReducer} from '../../../store/reducers/gameThemeReduser'

enum Ground {
    SAND = './assets/gameElements/ground/ground.png',
    STONE = './assets/gameElements/ground/stone.png'
}

export class ClearDot extends Dot {
    draw(theme: ThemeReducer) {
        const img = new Image()
        switch (theme.ground) {
            case 'sand':
                img.src = Ground.SAND
                break
            case 'stone':
                img.src = Ground.STONE
                break
            default:
                break
        }

        img.onload = () => {
            this.ctx.drawImage(img, this.x, this.y, this.step, this.step)
        }
    }
}
