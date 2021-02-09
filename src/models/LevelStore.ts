import {LayerContent} from '../enums/LayerContent'
import {GamePosition} from './GamePosition'

export interface LevelStore {
    layerDots: LayerContent[][]
    initialPosition: GamePosition
    currentPosition?: GamePosition
}
