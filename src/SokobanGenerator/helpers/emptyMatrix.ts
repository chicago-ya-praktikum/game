import {Tile} from '../enums/Tile'

export function emptyMatrix(width: number, height: number, initValue?: Tile) {
    return new Array(height).fill([])
        .map(() => new Array(width).fill(initValue))
}
