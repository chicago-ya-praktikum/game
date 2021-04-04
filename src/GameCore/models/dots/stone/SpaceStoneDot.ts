import {Dot} from '../Dot'
import {gameImage} from '../../images/gameImage'
import {ImageContent} from '../../../enums/ImageContent'

export class SpaceStoneDot extends Dot {
    draw() {
        if (!gameImage) return
        this.ctx.drawImage(gameImage.images[ImageContent.GroundStone],
            this.x, this.y, this.step, this.step)
    }
}
