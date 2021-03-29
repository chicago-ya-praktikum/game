import {Dot} from './Dot'

export class BoxSpaceDot extends Dot {
    draw() {
        const img = new Image()
        img.src = './assets/gameElements/target/target.png'
        // const shift = (this.step - this.boxSpaceDiameter) / 2

        img.onload = () => {
            this.ctx.drawImage(img, this.x, this.y,
                this.boxSpaceDiameter * 2, this.boxSpaceDiameter * 2)
        }
    }
}
