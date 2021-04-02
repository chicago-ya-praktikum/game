import {LevelStore} from './models/LevelStore'
import {LayerContent} from './enums/LayerContent'
import {XYCoordinate} from './models/XYCoordinate'
import {EventKey} from './enums/EventKey'
import {deepClone} from '../utils/deepClone'
import {UpdateListener} from '../models/UpdateListener'
import {GamePosition} from './models/GamePosition'
import {layerContent} from './constants/layerContent'
import {GameTheme} from './enums/GameTheme'

export class GameCore {
    private ctx: CanvasRenderingContext2D
    private level!: LevelStore
    private theme!: GameTheme
    private readonly canvasDiameter: number
    private step!: number
    private canvas: HTMLCanvasElement

    end = new UpdateListener<boolean>()

    constructor(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d')

        if (ctx === null) {
            throw new Error('ctx is null')
        }

        if (canvas.width !== canvas.height) {
            throw new Error('canvas should be square')
        }

        this.canvasDiameter = canvas.width
        this.ctx = ctx
        this.canvas = canvas

        return this
    }

    drawLevel(level: LevelStore, theme: GameTheme) {
        this.level = deepClone(level)
        const {length} = this.level.layerDots
        this.step = Math.floor(this.canvasDiameter / length)

        this.canvas.width = this.step * length
        this.canvas.height = this.step * length

        this.redraw(theme)

        return this
    }

    redraw(theme: GameTheme) {
        this.theme = theme

        const {layerDots, initialPosition} = this.level

        if (!layerDots || !initialPosition) {
            return
        }

        layerDots.forEach((row, y) => {
            row.forEach((dot, x) => {
                this.clearSpace({x, y})

                const constructor = this.getDotConstructor(dot)
                new constructor(this.ctx, this.step, {x, y}).draw()
            })
        })

        if (!this.level.currentPosition) {
            this.level.currentPosition = deepClone(initialPosition)
        }

        const position = this.level.currentPosition as GamePosition

        this.drawDynamicContent(position.playerCoordinate, LayerContent.Player)
        position.boxesCoordinates
            .forEach((coordinate) => this.drawDynamicContent(coordinate, LayerContent.Box))
    }

    move(event: KeyboardEvent) {
        const {currentPosition} = this.level
        if (currentPosition === undefined) {
            throw new Error('current position is undefined')
        }

        const coordinate = currentPosition.playerCoordinate

        if (this.invalidDynamicCoordinate(coordinate)) {
            throw new Error('coordinate is invalid')
        }

        const next = {...coordinate}
        const doubleNext = {...coordinate}
        switch (event.key) {
            case EventKey.Down:
                next.y += 1
                doubleNext.y += 2
                break
            case EventKey.Up:
                next.y -= 1
                doubleNext.y -= 2
                break
            case EventKey.Left:
                next.x -= 1
                doubleNext.x -= 2
                break
            case EventKey.Right:
                next.x += 1
                doubleNext.x += 2
                break
            default:
                return
        }

        if (this.isWall(next)) {
            return
        }

        const nextBox = this.getBox(next)
        if (nextBox) {
            if (this.isWall(doubleNext) || this.getBox(doubleNext)) {
                return
            }

            this.moveDynamicContent(next, doubleNext, LayerContent.Box)
            Object.assign(nextBox, doubleNext)

            this.checkBoxesPlaces()
        }

        this.moveDynamicContent(coordinate, next, LayerContent.Player)
        Object.assign(coordinate, next)
    }

    private checkBoxesPlaces() {
        const boxesCoordinates = this.level.currentPosition?.boxesCoordinates

        if (boxesCoordinates === undefined) {
            throw new Error('boxes coordinates is undefined')
        }

        for (const coordinate of boxesCoordinates) {
            if (!this.isBoxSpace(coordinate)) {
                return
            }
        }

        this.end.value = true
    }

    private invalidDynamicCoordinate(coordinate: XYCoordinate) {
        const fn = (c: number) => c < 0 || c > this.level.layerDots.length - 1

        return fn(coordinate.x) || fn(coordinate.y)
    }

    private moveDynamicContent(
        previous: XYCoordinate, next: XYCoordinate, type: LayerContent
    ) {
        this.clearDynamicContent(previous)
        this.drawDynamicContent(next, type)
    }

    private checkDrawDot(coordinate: XYCoordinate) {
        if (this.isWall(coordinate)) {
            throw new Error('try to draw dynamic content on wall')
        }
    }

    private clearDynamicContent(coordinate: XYCoordinate) {
        this.checkDrawDot(coordinate)
        this.clearSpace(coordinate)

        if (this.isBoxSpace(coordinate)) {
            this.drawBoxSpace(coordinate)
        }
    }

    private drawDynamicContent(coordinate: XYCoordinate, type: LayerContent) {
        this.checkDrawDot(coordinate)
        const constructor = this.getDotConstructor(type)
        new constructor(this.ctx, this.step, coordinate).draw()

        if (this.isBoxSpace(coordinate)) {
            this.drawBoxSpace(coordinate)
        }
    }

    private drawBoxSpace(coordinate: XYCoordinate) {
        const SpaceConstructor = this.getDotConstructor(LayerContent.BoxSpace)
        new SpaceConstructor(this.ctx, this.step, coordinate).draw()
    }

    private getBox({x, y}: XYCoordinate) {
        return this.level.currentPosition?.boxesCoordinates
            .find((c) => c.x === x && c.y === y)
    }

    private isWall({x, y}: XYCoordinate) {
        return this.invalidDynamicCoordinate({x, y})
        || this.level.layerDots[y][x] === LayerContent.Wall
    }

    private isBoxSpace({x, y}: XYCoordinate) {
        return this.level.layerDots[y][x] === LayerContent.BoxSpace
    }

    private getDotConstructor(dot: LayerContent) {
        return layerContent[this.theme][dot]
    }

    private clearSpace({x, y}: XYCoordinate) {
        const SpaceConstructor = this.getDotConstructor(LayerContent.Space)
        new SpaceConstructor(this.ctx, this.step, {x, y}).draw()
    }
}
