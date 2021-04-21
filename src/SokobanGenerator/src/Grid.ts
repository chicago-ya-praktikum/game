/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
import {Matrix} from './Matrix'
import {emptyMatrix} from '../helpers/emptyMatrix'
import {XYCoordinate} from '../../GameCore/models/XYCoordinate'
import {Tile} from '../enums/Tile'
import {GeneratorDirection} from '../enums/GeneratorDirection'
import {templates} from '../contants/templates'
import {templateSize} from '../contants/templateSize'
import {directions} from '../contants/directions'
import {moveToDirection} from '../helpers/moveToDirection'
import {BacktrackMap} from '../models/BacktrackMap'
import {solveSteps} from '../contants/solveSteps'

interface PullStack {
    step: number
    pos: XYCoordinate
    matrix: Matrix
}

export class Grid {
    private readonly _width: number
    private readonly _height: number
    private readonly _box: number
    _data: Matrix
    private readonly _rand: typeof Math.random
    private readonly _minWall: number
    private readonly _playerFixedPos: XYCoordinate
    private _solutionStep: number
    private count: number

    constructor(
        width = 0,
        height = 0,
        box = 3,
        minWall = 0,
        playerPos: XYCoordinate = {x: 0, y: 0},
        count = solveSteps
    ) {
        this._width = width
        this._height = height
        this._box = box
        this._data = new Matrix(this._width, this._height, Tile.FLOOR)
        this._rand = Math.random
        this._minWall = minWall
        this._playerFixedPos = playerPos
        this._solutionStep = -1

        this.count = count
    }

    get(x: number, y: number) {
        return this._data.get(x, y)
    }

    set(x: number, y: number, tile: Tile) {
        this._data.set(x, y, tile)
    }

    setMatrixAsArray(array: string[][]) {
        this._data.setAsArray(array)
    }

    /**
     * Wrapper to move a tile
     * @param x
     * @param y
     * @param direction
     * @return boolean if the move is legit and successful
     */
    move(x: number, y: number, direction: GeneratorDirection) {
        return this._data.move(x, y, direction)
    }

    isInRange(x: number, y: number) {
        return this._data.isInRange(x, y)
    }

    clone() {
        const newGrid = new Grid(this._width,
            this._height,
            this._box,
            this._minWall,
            this._playerFixedPos,
            this.count)
        newGrid._data = this._data.clone()
        newGrid._solutionStep = this._solutionStep

        return newGrid
    }

    /**
     * If the grid has a solvable level, this will return the step needed to
     * solve it. Only call this after a puzzle has been successfully generated
     * @return {number|*}
     */
    getSolutionStep() {
        return this._solutionStep
    }

    /**
     * Resets the grid and apply template.
     * @return boolean - true if one is generated successfully
     */
    applyTemplates() {
        let wallCount = 0

        for (let x = 0; x < this._width; x += templateSize) {
            for (let y = 0; y < this._height; y += templateSize) {
                wallCount += this._applyTemplate(x, y)
            }
        }

        if (this._playerFixedPos) {
            if (this._data.isWall(this._playerFixedPos.x, this._playerFixedPos.y)) {
                return false
            }
        }

        return wallCount >= this._minWall
    }

    /**
     * Applies a single template at (x,y)
     * @param x
     * @param y
     * @return {Number} the number of walls, or -1 if not created successfully
     * @private
     *
     */
    private _applyTemplate(x: number, y: number) {
        // Choose a random template
        const temp = templates[Math.floor(this._rand() * templates.length)]
        let i = 0
        let t = 0

        for (let dx = 0; dx < templateSize && x + dx < this._width; ++dx) {
            for (let dy = 0; dy < templateSize && y + dy < this._height; ++dy, ++i) {
                if (temp[i] === Tile.WALL) {
                    ++t
                }

                this.set(x + dx, y + dy, temp[i] as Tile)
            }
        }

        return t
    }

    /**
     * Applies a string grid to this class
     * @param {String} str
     */
    applyStringGrid(str: string) {
        let i = 0

        for (let y = 0; y < this._height; ++y) {
            for (let x = 0; x < this._width; ++x) {
                this.set(x, y, str[i++] as Tile)
            }
        }
    }

    /**
     * Checks several things to make sure current grid is a good one for sokoban
     */
    isGoodCandidate() {
        return this._data.isAllConnected()
            && !this._data.hasLargeEmptySpace()
            && this.hasEnoughRoom()
            && !this._data.hasDeadEnd()
    }

    hasEnoughRoom() {
        return this._data.count(Tile.FLOOR) >= this._box + 2 // one for player, the
        // other for moving
    }

    /**
     * Wipes out any goals placed (if any) and randomly deploy goals on the
     * floor
     */
    redeployGoals() {
        this._data.clearGoals()

        // Find all floors
        const floors = []
        for (let x = 0; x < this._width; ++x) {
            for (let y = 0; y < this._height; ++y) {
                if (this.get(x, y) === Tile.FLOOR) {
                    floors.push({x, y})
                }
            }
        }

        if (floors.length <= this._box) {
            return false
        }

        // Randomly choose by shuffling
        let i = floors.length
        while (--i) {
            const j = Math.floor(this._rand() * (i + 1));

            [floors[i], floors[j]] = [floors[j], floors[i]]
        }

        // Set the first several to be goals
        // eslint-disable-next-line @typescript-eslint/no-shadow
        for (let i = 0; i < this._box; ++i) {
            const {x, y} = floors[i]
            this.set(x, y, Tile.GOAL)
        }

        return true
    }

    /**
     * Wipes out boxes, put them back to their goals and find the farthest
     * position each box can be
     */
    generateFarthestBoxes() {
        const boxes = this._data.resetBoxesToGoals()

        // Backtrack maps
        const map: BacktrackMap = {}
        const playerPos = this._data.findAvailablePlayerPositions()

        // Generate all possible maps
        for (const pos of playerPos) {
            this._pullBoxes(boxes, pos, map)
        }

        // Iterate over map to find the farthest one
        const keys = Object.keys(map)
        let maxMap = ''
        let maxPos = null
        let max = -1

        for (const key of keys) {
            const matrix = map[key]

            for (let x = 0; x < this._width; ++x) {
                for (let y = 0; y < this._height; ++y) {
                    if (!matrix[y][x] || matrix[y][x] <= max) {
                        continue
                    }

                    if (this._playerFixedPos) {
                        // The player position is fixed, so we need to know if current
                        // position is accessible by the player (to move the player
                        // position later)
                        this.applyStringGrid(key)

                        const isAccessible = this._data.isAccessible(
                            this._playerFixedPos.x,
                            this._playerFixedPos.y,
                            x,
                            y
                        )

                        if (!isAccessible) {
                            continue
                        }
                    }

                    maxMap = key
                    maxPos = {x, y}
                    max = matrix[y][x]
                }
            }
        }

        if (maxPos === null) {
            return false
        }

        if (max < this.count) {
            return false
        }

        this._solutionStep = max
        this.applyStringGrid(maxMap)

        // Set player position
        const x = this._playerFixedPos ? this._playerFixedPos.x : maxPos.x
        const y = this._playerFixedPos ? this._playerFixedPos.y : maxPos.y
        const tile = this.get(x, y) === Tile.GOAL ? Tile.PLAYER_GOAL : Tile.PLAYER

        this.set(x, y, tile)

        return true
    }

    /**
     * Generates an empty matrix based on current width and height
     * @return {any[][]}
     * @private
     */
    _emptyMatrix(initValue: Tile) {
        return emptyMatrix(this._width, this._height, initValue)
    }

    /**
     * Returns actual x and y coordinate given an index in the string
     * @param index
     * @return {{x: number, y: number}}
     * @private
     */
    _toCoord(index: number) {
        const x = Math.floor(index / this._width)

        return {
            x,
            y: index - x * this._width
        }
    }

    /**
     * To index
     * @param x
     * @param y
     * @return {Number}
     * @private
     */
    _toIndex(x: number, y: number) {
        return x * this._width + y
    }

    /**
     * Pull all boxes to a random position (using bfs)
     * @param {Array} initBoxes - an array of positions in the form of {x:number,
     *   y:number}
     * @param {{x:number, y:number}} initPos - current position of player
     * @param {Object} map - a backtrack map to keep track of what kind of grids
     *   have been explored, with each key as a string, and value as a 2d array
     *   to keep track of the steps when the player is at that specific location
     * @private
     */
    private _pullBoxes(initBoxes: XYCoordinate[], initPos: XYCoordinate, map: BacktrackMap) {
        const stack = [{
            boxes: initBoxes.map(b => ({...b})),
            pos: {...initPos},
            matrix: this._data.clone(),
            step: 0
        }]

        while (stack.length) {
            const top = stack.shift()

            if (top === undefined) {
                throw new Error('top of stack is undef')
            }

            const {
                boxes, pos, matrix, step
            } = top

            if (this._pullBoxesCheckIfMapCached(map, top)) {
                continue
            }

            for (let i = 0; i < boxes.length; ++i) {
                const box = boxes[i]

                // Go each direction
                for (const direction of directions) {
                    const {x, y} = box
                    const newBoxPos = moveToDirection(x, y, direction)

                    if (!matrix.isAccessible(pos.x, pos.y, newBoxPos.x, newBoxPos.y)) {
                        continue
                    }

                    const newPlayerPos = moveToDirection(newBoxPos.x, newBoxPos.y, direction)

                    if (!matrix.isAccessible(pos.x, pos.y, newPlayerPos.x, newPlayerPos.y)) {
                        continue
                    }

                    const matrixCopy = matrix.clone()
                    if (!matrixCopy.move(x, y, direction)) {
                        continue
                    }

                    // Set new box position
                    const boxesCopy = boxes.map(a => ({...a}))
                    boxesCopy[i] = newBoxPos
                    stack.push({
                        boxes: boxesCopy,
                        pos: newPlayerPos,
                        matrix: matrixCopy,
                        step: step + 1
                    })
                }
            }
        }
    }

    /**
     * A helper function for _pullBoxes to check if the map has cached value,
     * and modify the map accordingly
     * @param map
     * @param {{step:number, pos:object, matrix:Matrix}} obj - an object stored in
     *   the stack of _pullBoxes when doing bfs
     * @private
     */
    private _pullBoxesCheckIfMapCached(map: BacktrackMap, obj: PullStack) {
        const {step, pos, matrix} = obj
        const {x, y} = pos

        if (step === 0) {
            return false
        }

        const str = matrix.toString()

        // Check if the value is already cached
        if (map[str]) {
            if (map[str][y][x]) {
                if (step < map[str][y][x]) {
                    this._pullBoxesPropagateMapStepValue(matrix, map[str], x, y, step)
                }

                return true
            }
        }

        if (!map[str]) {
            map[str] = this._emptyMatrix(Tile.FLOOR)
        }

        this._pullBoxesPropagateMapStepValue(
            matrix,
            map[str],
            x,
            y,
            step
        )

        return false
    }

    /**
     * Use dfs to make sure connected cells has synced step value
     * @param {Matrix} matrix
     * @param {Array[][]} playerMatrix - a 2d matrix that caches the max step of
     *   player
     * @param x
     * @param y
     * @param step
     * @private
     */
    private _pullBoxesPropagateMapStepValue(
        matrix: Matrix,
        playerMatrix: number[][],
        x: number,
        y: number,
        step: number
    ) {
        if (playerMatrix[y][x] === step || !matrix.isWalkable(x, y)) {
            return
        }

        playerMatrix[y][x] = step

        if (x > 0) {
            this._pullBoxesPropagateMapStepValue(
                matrix,
                playerMatrix,
                x - 1,
                y,
                step
            )
        }

        if (x < this._width - 1) {
            this._pullBoxesPropagateMapStepValue(
                matrix,
                playerMatrix,
                x + 1,
                y,
                step
            )
        }

        if (y > 0) {
            this._pullBoxesPropagateMapStepValue(
                matrix,
                playerMatrix,
                x,
                y - 1,
                step
            )
        }

        if (y < this._height - 1) {
            this._pullBoxesPropagateMapStepValue(
                matrix,
                playerMatrix,
                x,
                y + 1,
                step
            )
        }
    }

    toString() {
        return this._data.toString()
    }

    toReadableString() {
        return this._data.toReadableString()
    }
}
