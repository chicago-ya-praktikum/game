// @ts-ignore
import {generateSokobanLevel} from 'sokoban-generator'
import {LevelStore} from '../GameCore/models/LevelStore'
import {LayerContent} from '../GameCore/enums/LayerContent'

export function SokobanGenerator() {
    const options = {
        attempts: 500000
    }

    const stringLevel = generateSokobanLevel(options) as string

    const level: LevelStore = {
        layerDots: [],
        initialPosition: {
            playerCoordinate: {x: 0, y: 0},
            boxesCoordinates: []
        }
    }

    let currentRow: LayerContent[] = []
    let row = 0
    const {initialPosition, layerDots} = level

    const push = (content: LayerContent) => {
        currentRow.push(content)
    }
    const addBox = () => {
        initialPosition.boxesCoordinates.push({x: currentRow.length, y: row})
    }
    const addPlayer = () => {
        initialPosition.playerCoordinate = {x: currentRow.length, y: row}
    }
    const pushRow = () => {
        layerDots.push(currentRow)
        currentRow = []
        row++
    }

    for (let i = 0; i < stringLevel.length; i++) {
        const char = stringLevel.charAt(i)

        switch (char) {
            case '#':
                push(LayerContent.Wall)
                break
            case ' ':
                push(LayerContent.Space)
                break
            case '.':
                push(LayerContent.BoxSpace)
                break
            case '@':
                addPlayer()
                push(LayerContent.Space)
                break
            case '+':
                addPlayer()
                push(LayerContent.BoxSpace)
                break
            case '$':
                addBox()
                push(LayerContent.Space)
                break
            case '*':
                addBox()
                push(LayerContent.BoxSpace)
                break
            case '\n':
                pushRow()
                break
            default:
                throw new Error(`unexpected char: ${char}`)
        }
    }
    pushRow()

    return level
}
