/* eslint-disable no-param-reassign */
import {GeneratorDirection} from '../enums/GeneratorDirection'

export function moveToDirection(x: number, y: number, direction: GeneratorDirection) {
    switch (direction) {
        case GeneratorDirection.UP:
            --y
            break
        case GeneratorDirection.DOWN:
            ++y
            break
        case GeneratorDirection.LEFT:
            --x
            break
        case GeneratorDirection.RIGHT:
            ++x
            break
        default:
            break
    }

    return {x, y}
}
