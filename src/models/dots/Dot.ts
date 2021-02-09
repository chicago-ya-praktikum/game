import {XYCoordinate} from '../XYCoordinate'

export abstract class Dot {
    protected ctx: CanvasRenderingContext2D
    protected step: number
    protected x: number
    protected y: number

    protected get boxSpaceDiameter() {
        return Math.floor(this.step / 2)
    }

    protected get boxDiameter() {
        return Math.floor(0.9 * this.step)
    }

    constructor(ctx: CanvasRenderingContext2D, step: number, coordinate: XYCoordinate) {
        this.ctx = ctx
        this.step = step
        this.x = coordinate.x * this.step
        this.y = coordinate.y * this.step
    }

    abstract draw(): void
}
