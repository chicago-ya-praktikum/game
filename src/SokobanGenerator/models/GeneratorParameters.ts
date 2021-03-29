import {XYCoordinate} from '../../GameCore/models/XYCoordinate'
import {GeneratorType} from '../enums/GeneratorType'

export interface GeneratorParameters {
    width?: number
    height?: number
    boxes?: number
    minWalls?: number
    attempts?: number
    initialPosition?: XYCoordinate
    type?: GeneratorType
}
