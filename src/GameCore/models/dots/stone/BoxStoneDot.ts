import {Dot} from '../Dot'
import {gameImage} from '../../images/gameImage'
import {ImageContent} from '../../../enums/ImageContent'

export class BoxStoneDot extends Dot {
    draw() {
        if (!gameImage) return
        const shift = (this.step - this.boxDiameter) / 2
        this.ctx.drawImage(
            gameImage.images[ImageContent.Box],
            this.x + shift,
            this.y + shift,
            this.boxDiameter,
            this.boxDiameter
        )
    }
}
