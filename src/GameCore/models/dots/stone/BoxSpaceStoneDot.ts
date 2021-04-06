import {Dot} from '../Dot'
import {gameImage} from '../../images/gameImage'
import {ImageContent} from '../../../enums/ImageContent'

export class BoxSpaceStoneDot extends Dot {
    draw() {
        if (!gameImage) return
        this.ctx.drawImage(gameImage.images[ImageContent.Target], this.x, this.y,
            this.boxSpaceDiameter * 2, this.boxSpaceDiameter * 2)
    }
}
