import {Grid} from './src/Grid'
import {GeneratorParameters} from './models/GeneratorParameters'
import {GeneratorType} from './enums/GeneratorType'

export function generateSokobanLevel(parameters: GeneratorParameters) {
    const {
        width = 9,
        height = 9,
        boxes = 3,
        minWalls = 13,
        seed = Date.now(),
        initialPosition,
        type = GeneratorType.String
    } = parameters

    let {attempts = 5000} = parameters

    const grid = new Grid(width, height, boxes, seed, minWalls, initialPosition)

    while (--attempts > 0) {
        if (!grid.applyTemplates()
            || !grid.isGoodCandidate()
            || !grid.redeployGoals()
            || !grid.generateFarthestBoxes()) {
            // eslint-disable-next-line no-continue
            continue
        }

        if (type === GeneratorType.String) {
            return grid.toReadableString()
        }

        if (type === GeneratorType.Class) {
            return grid
        }

        return grid.toReadableString()
    }

    return null
}
