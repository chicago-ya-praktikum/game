import {LevelStore} from '../models/LevelStore'
import {LayerContent} from '../enums/LayerContent'
import {XYCoordinate} from '../models/XYCoordinate'
import {DynamicContent} from '../enums/DynamicContent'
import {EventKey} from '../enums/EventKey'
import {BoxSpaceDot} from '../models/dots/BoxSpaceDot'
import {getDotConstructor} from './getDotConstructor'
import {getDynamicConstructor} from './getDynamicConstructor'
import {ClearDot} from '../models/dots/ClearDot'

export class GameCore {
    private ctx: CanvasRenderingContext2D
    private level!: LevelStore
    private readonly canvasDiameter: number
    private step!: number

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

        return this
    }

    drawLevel(level: LevelStore) {
        this.level = level
        this.level.currentPosition = JSON.parse(JSON.stringify(level.initialPosition))
        this.step = Math.floor(this.canvasDiameter / level.layerDots.length)

        level.layerDots.forEach((row, y) => {
            row.forEach((dot, x) => {
                const constructor = getDotConstructor(dot)
                new constructor(this.ctx, this.step, {x, y}).draw()
            })
        })

        const {initialPosition} = level

        this.drawDynamicContent(initialPosition.playerCoordinate, DynamicContent.Player)

        initialPosition.boxesCoordinates
            .forEach((coordinate) => this.drawDynamicContent(coordinate, DynamicContent.Box))

        return this
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

            this.moveDynamicContent(next, doubleNext, DynamicContent.Box)
            Object.assign(nextBox, doubleNext)

            this.checkBoxesPlaces()
        }

        this.moveDynamicContent(coordinate, next, DynamicContent.Player)
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

        // eslint-disable-next-line no-console
        console.log('all boxes on places')
    }

    private invalidDynamicCoordinate(coordinate: XYCoordinate) {
        const fn = (c: number) => c < 1 || c > this.level.layerDots.length - 2

        return fn(coordinate.x) || fn(coordinate.y)
    }

    private moveDynamicContent(previous: XYCoordinate, next: XYCoordinate, type: DynamicContent) {
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

        new ClearDot(this.ctx, this.step, coordinate).draw()

        if (this.isBoxSpace(coordinate)) {
            this.drawBoxSpace(coordinate)
        }
    }

    private drawDynamicContent(coordinate: XYCoordinate, type: DynamicContent) {
        this.checkDrawDot(coordinate)
        const constructor = getDynamicConstructor(type)
        new constructor(this.ctx, this.step, coordinate).draw()
    }

    private drawBoxSpace(coordinate: XYCoordinate) {
        new BoxSpaceDot(this.ctx, this.step, coordinate).draw()
    }

    private getBox({x, y}: XYCoordinate) {
        return this.level.currentPosition?.boxesCoordinates
            .find((c) => c.x === x && c.y === y)
    }

    private isWall(coordinate: XYCoordinate) {
        return this.level.layerDots[coordinate.y][coordinate.x] === LayerContent.Wall
    }

    private isBoxSpace(coordinate: XYCoordinate) {
        return this.level.layerDots[coordinate.y][coordinate.x] === LayerContent.BoxSpace
    }
}
