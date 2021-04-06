import {Dot} from '../Dot'
import {gameImage} from '../../images/gameImage'
import {ImageContent} from '../../../enums/ImageContent'

export class SpaceSandDot extends Dot {
    draw() {
        if (!gameImage) return
        this.ctx.drawImage(gameImage.images[ImageContent.GroundSand],
            this.x, this.y, this.step, this.step)
    }
}
