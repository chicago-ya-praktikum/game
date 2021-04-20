import {LevelStore} from '../GameCore/models/LevelStore'
import {LayerContent} from '../GameCore/enums/LayerContent'
import {Tile} from './enums/Tile'
import {generateSokobanLevel} from './generateSokobanLevel'

export function sokobanGenerator(count: number) {
    const options = {
        attempts: 500000,
        count
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
            case Tile.WALL:
                push(LayerContent.Wall)
                break
            case Tile.FLOOR:
                push(LayerContent.Space)
                break
            case Tile.GOAL:
                push(LayerContent.BoxSpace)
                break
            case Tile.PLAYER:
                addPlayer()
                push(LayerContent.Space)
                break
            case Tile.PLAYER_GOAL:
                addPlayer()
                push(LayerContent.BoxSpace)
                break
            case Tile.BOX:
                addBox()
                push(LayerContent.Space)
                break
            case Tile.BOX_GOAL:
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
