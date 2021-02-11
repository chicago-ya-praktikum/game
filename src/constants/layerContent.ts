import {LayerContent} from '../enums/LayerContent'
import {WallDot} from '../models/dots/WallDot'
import {BoxSpaceDot} from '../models/dots/BoxSpaceDot'
import {SpaceDot} from '../models/dots/SpaceDot'

export const layerContent = {
    [LayerContent.Wall]: WallDot,
    [LayerContent.BoxSpace]: BoxSpaceDot,
    [LayerContent.Space]: SpaceDot
}
