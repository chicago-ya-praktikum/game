/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
import {
    addMovableTile, extractMovableTile, isMovableTile, isWalkableTile, removeMovableTile
} from './tiles'
import {emptyMatrix} from '../helpers/emptyMatrix'
import {Tile} from '../enums/Tile'
import {GeneratorDirection} from '../enums/GeneratorDirection'
import {ObjectKeys} from '../models/ObjectKeys'
import {moveToDirection} from '../helpers/moveToDirection'

export class Matrix {
    private _width: number
    private _height: number
    _data: string[][]

    constructor(width: number, height: number, initValue?: Tile) {
        this._width = width
        this._height = height
        this._data = this._emptyMatrix(width, height, initValue)
    }

    get(x: number, y: number) {
        return this._data[y][x]
    }

    set(x: number, y: number, tile: Tile) {
        this._data[y][x] = tile
    }

    setAsArray(arr: string[][]) {
        this._data = arr.map(a => a.slice())
    }

    /**
     * Moves a tile to a certain direction. The movable tile is either player or
     * box. This function does not cause ripple effect (i.e. moving a player to a
     * box does not push it further, and it's also a invalid move)
     * @param x
     * @param y
     * @param direction
     * @return boolean if the move is legit and successful
     */
    move(x: number, y: number, direction: GeneratorDirection) {
        if (!this.isMovable(x, y)) {
            return false
        }

        const coord = moveToDirection(x, y, direction)
        const x2 = coord.x
        const y2 = coord.y

        if (!this.isInRange(x2, y2) || !this.isWalkable(x2, y2)) {
            return false
        }

        const src = this.get(x, y)
        const dest = this.get(x2, y2) as Tile
        const tile = extractMovableTile(src) as Tile

        this.set(x, y, removeMovableTile(src))
        this.set(x2, y2, addMovableTile(dest, tile) as Tile)

        return true
    }

    clone() {
        const newMatrix = new Matrix(this._width, this._height)
        newMatrix._data = this._data.map(a => a.slice())

        return newMatrix
    }

    /**
     * Returns if current grid can be is all connected
     */
    isAllConnected() {
        // Find first floor
        let x = 0
        let y = 0
        for (; y < this._height; ++y) {
            x = this._data[y].indexOf(Tile.FLOOR)

            if (x !== -1) {
                break
            }
        }

        if (x === -1) {
            return false
        }

        const c = this.clone()
        c._propagateFloorWith(x, y)

        return !c._data.some(row => row.includes(Tile.FLOOR))
    }

    /**
     * Returns whether the grid has empty area larger than 4x3 or 3x4
     */
    hasLargeEmptySpace() {
        const map: ObjectKeys<boolean> = {}
        const qualify3x3: ObjectKeys<boolean> = {}

        // Find all indices with three space
        let index = 0
        for (let x = 0; x < this._height; ++x, index += 2) {
            let last = false
            let last2 = false

            for (let y = 0; y < this._width - 2; ++y, ++index) {
                const curr = this._data[y][x] === Tile.FLOOR

                if (curr && last && last2) {
                    // Check up 3x3
                    if (map[index - this._width] && map[index - this._width - this._width]) {
                        // Check 4x3 or 3x4
                        if (qualify3x3[index - this._width] || qualify3x3[index - 1]) {
                            return true
                        }
                        qualify3x3[index] = true
                    }

                    map[index] = true
                }

                last2 = last
                last = curr
            }
        }

        return false
    }

    count(t: Tile) {
        let i = 0
        for (const row of this._data) {
            for (const tile of row) {
                if (tile === t) {
                    ++i
                }
            }
        }

        return i
    }

    hasDeadEnd() {
        for (let x = 0; x < this._width; ++x) {
            for (let y = 0; y < this._height; ++y) {
                if (this.isWall(x, y)) {
                    continue
                }

                // this._data[i] !== WALL
                let notWall = (!this.isWall(x, y - 1) ? 1 : 0)

                notWall += (!this.isWall(x - 1, y) ? 1 : 0)
                if (notWall > 1) {
                    continue
                }

                notWall += (!this.isWall(x + 1, y) ? 1 : 0)
                if (notWall > 1) {
                    continue
                } else if (notWall === 0) {
                    return true
                }

                notWall += (!this.isWall(x, y + 1) ? 1 : 0)
                if (notWall <= 1) {
                    return true
                }
            }
        }

        return false
    }

    /**
     * Puts boxes back to their goals and returns the final positions of the
     * boxes (or goals)
     */
    resetBoxesToGoals() {
        const goals = []

        for (let y = 0; y < this._height; ++y) {
            for (let x = 0; x < this._width; ++x) {
                const tile = this.get(x, y)
                if (tile === Tile.BOX) {
                    this.set(x, y, Tile.FLOOR)
                } else if (tile === Tile.GOAL) {
                    goals.push({x, y})
                    this.set(x, y, Tile.BOX_GOAL)
                } else if (tile === Tile.BOX_GOAL) {
                    goals.push({x, y})
                }
            }
        }

        return goals
    }

    /**
     * Finds all available player starting positions
     * @return {[{x: number, y: number}]} A list of player positions. Each
     *   position is mutually non-accessible by other positions in the list.
     */
    findAvailablePlayerPositions() {
        const c = this.clone()
        const pos = []

        for (let x = 0; x < this._width; ++x) {
            for (let y = 0; y < this._height; ++y) {
                if (c.get(x, y) === Tile.FLOOR) {
                    pos.push({x, y})
                    c._propagateFloorWith(x, y, Tile.WALL)
                }
            }
        }

        return pos
    }

    is(x: number, y: number, tile: Tile, isEdgeConsideredTile = false) {
        if (!this.isInRange(x, y)) {
            return isEdgeConsideredTile
        }

        return this.get(x, y) === tile
    }

    /**
     * Returns if a given tile is a wall
     * @param x
     * @param y
     * @return {boolean}
     */
    isWall(x: number, y: number) {
        return this.is(x, y, Tile.WALL, true)
    }

    isInRange(x: number, y: number) {
        return x >= 0 && x < this._width && y >= 0 && y < this._height
    }

    /**
     * Returns if (x1, y1) is accessible from (x2, y2)
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param {array} [array] - if provided, this function will process this map
     *   instead of this._data. Should be of the same dimension as that of
     *   this._data
     * @return boolean
     */
    isAccessible(x1: number, y1: number, x2: number, y2: number) {
        if (!this.isInRange(x1, y1) || !this.isInRange(x2, y2)
            || !this.isWalkable(x1, y1) || !this.isWalkable(x2, y2)) {
            return false
        }

        const w = this._width
        const h = this._height
        const is = this.isWalkable.bind(this)

        // For this helper, we make sure (x,y) and (destX,destY) is always in
        // range, and we only change the value of x and y
        return (function helper(x, y, visited) {
            if (visited[y][x]) {
                return false
            }

            visited[y][x] = true

            if (x === x2 && y === y2) {
                return true
            }

            if (x > 0 && is(x - 1, y) && helper(x - 1, y, visited)) {
                return true
            }
            if (x < w - 1 && is(x + 1, y) && helper(x + 1, y, visited)) {
                return true
            }
            if (y > 0 && is(x, y - 1) && helper(x, y - 1, visited)) {
                return true
            }
            if (y < h - 1 && is(x, y + 1) && helper(x, y + 1, visited)) {
                return true
            }

            return false
        }(x1, y1, this._emptyMatrix()))
    }

    /**
     * ASSUMING (x,y) IS VALID. Returns if (x,y) is walkable.
     * @param x
     * @param y
     */
    isWalkable(x: number, y: number) {
        return isWalkableTile(this.get(x, y) as Tile)
    }

    /**
     * Returns if the tile at (x,y) is movable
     * @param x
     * @param y
     */
    isMovable(x: number, y: number) {
        if (!this.isInRange(x, y)) {
            return false
        }

        const tile = this.get(x, y)
        return isMovableTile(tile as Tile)
    }

    /**
     * Removes any goals tiles. This method assumes that only goal tile is GOAL
     * (thus excluding player or boxes already on goal)
     */
    clearGoals() {
        for (const row of this._data) {
            for (let i = 0; i < this._width; ++i) {
                if (row[i] === Tile.GOAL) {
                    row[i] = Tile.FLOOR
                }
            }
        }
    }

    /**
     * Uses DFS to spread wall at a given location
     * @param x
     * @param y
     * @param tile
     * @private
     */
    _propagateFloorWith(x: number, y: number, tile = Tile.WALL) {
        if (!this.is(x, y, Tile.FLOOR)) {
            return
        }

        this.set(x, y, tile)

        this._propagateFloorWith(x - 1, y, tile)
        this._propagateFloorWith(x + 1, y, tile)
        this._propagateFloorWith(x, y - 1, tile)
        this._propagateFloorWith(x, y + 1, tile)
    }

    _emptyMatrix(width = this._width, height = this._height, initValue?: Tile) {
        return emptyMatrix(width, height, initValue)
    }

    toString() {
        return this._data.map(a => a.join('')).join('')
    }

    toReadableString() {
        return this._data.map(a => a.join('')).join('\n')
    }
}
