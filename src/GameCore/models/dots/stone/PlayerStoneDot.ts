import {Dot} from '../Dot'
import {gameImage} from '../../images/gameImage'
import {ImageContent} from '../../../enums/ImageContent'

export class PlayerStoneDot extends Dot {
    draw() {
        if (!gameImage) return
        this.ctx.drawImage(gameImage.images[ImageContent.Player], this.x, this.y, 45, 45)
    }
}
