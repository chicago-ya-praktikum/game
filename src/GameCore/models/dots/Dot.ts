import {XYCoordinate} from '../XYCoordinate'
import {GameTheme} from '../../enums/GameTheme'

export abstract class Dot {
    protected ctx: CanvasRenderingContext2D
    protected step: number
    protected x: number
    protected y: number
    protected theme?: GameTheme

    protected get boxSpaceDiameter() {
        return Math.floor(this.step / 2)
    }

    protected get boxDiameter() {
        return Math.floor(0.9 * this.step)
    }

    constructor(ctx: CanvasRenderingContext2D, step: number, {x, y}: XYCoordinate) {
        this.ctx = ctx
        this.step = step
        this.x = x * this.step
        this.y = y * this.step
    }

    abstract draw(): void
}
