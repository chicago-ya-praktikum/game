import {LevelStore} from './models/LevelStore'
import {LayerContent} from './enums/LayerContent'
import {XYCoordinate} from './models/XYCoordinate'
import {DynamicContent} from './enums/DynamicContent'
import {EventKey} from './enums/EventKey'
import {BoxSpaceDot} from './models/dots/BoxSpaceDot'
import {getDotConstructor} from './helpers/getDotConstructor'
import {getDynamicConstructor} from './helpers/getDynamicConstructor'
import {ClearDot} from './models/dots/ClearDot'
import {deepClone} from '../utils/deepClone'
import {UpdateListener} from '../models/UpdateListener'
import {GamePosition} from './models/GamePosition'
import {ThemeReducer} from '../store/reducers/gameThemeReduser'

export class GameCore {
    private ctx: CanvasRenderingContext2D
    private level!: LevelStore
    private readonly canvasDiameter: number
    private step!: number

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

        return this
    }

    drawLevel(level: LevelStore, theme: ThemeReducer) {
        this.level = deepClone(level)
        this.step = Math.floor(this.canvasDiameter / this.level.layerDots.length)

        this.level.layerDots.forEach((row, y) => {
            row.forEach((dot, x) => {
                new ClearDot(this.ctx, this.step, {x, y}).draw(theme)
                const constructor = getDotConstructor(dot)
                new constructor(this.ctx, this.step, {x, y}).draw()
            })
        })

        this.level.currentPosition = deepClone(this.level.initialPosition)
        const position = this.level.currentPosition as GamePosition

        this.drawDynamicContent(position.playerCoordinate, DynamicContent.Player)
        position.boxesCoordinates
            .forEach((coordinate) => this.drawDynamicContent(coordinate, DynamicContent.Box))

        return this
    }

    move(event: KeyboardEvent, theme: ThemeReducer) {
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

            this.moveDynamicContent(next, doubleNext, DynamicContent.Box, theme)
            Object.assign(nextBox, doubleNext)

            this.checkBoxesPlaces()
        }

        this.moveDynamicContent(coordinate, next, DynamicContent.Player, theme)
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
        previous: XYCoordinate, next: XYCoordinate, type: DynamicContent, theme: ThemeReducer
    ) {
        this.clearDynamicContent(previous, theme)
        this.drawDynamicContent(next, type)
    }

    private checkDrawDot(coordinate: XYCoordinate) {
        if (this.isWall(coordinate)) {
            throw new Error('try to draw dynamic content on wall')
        }
    }

    private clearDynamicContent(coordinate: XYCoordinate, theme: ThemeReducer) {
        this.checkDrawDot(coordinate)
        new ClearDot(this.ctx, this.step, coordinate).draw(theme)

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

    private isWall({x, y}: XYCoordinate) {
        return this.invalidDynamicCoordinate({x, y})
        || this.level.layerDots[y][x] === LayerContent.Wall
    }

    private isBoxSpace({x, y}: XYCoordinate) {
        return this.level.layerDots[y][x] === LayerContent.BoxSpace
    }
}
