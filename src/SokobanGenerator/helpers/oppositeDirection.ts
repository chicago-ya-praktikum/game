import {GeneratorDirection} from '../enums/GeneratorDirection'

export function oppositeDirection(direction: GeneratorDirection) {
    switch (direction) {
        case GeneratorDirection.UP:
            return GeneratorDirection.DOWN
        case GeneratorDirection.DOWN:
            return GeneratorDirection.UP
        case GeneratorDirection.LEFT:
            return GeneratorDirection.RIGHT
        case GeneratorDirection.RIGHT:
            return GeneratorDirection.LEFT
        default:
            break
    }

    return null
}

