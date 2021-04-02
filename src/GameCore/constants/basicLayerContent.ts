import {LayerContent} from '../enums/LayerContent'
import {SpaceDot} from '../models/dots/basic/SpaceDot'
import {PlayerDot} from '../models/dots/basic/PlayerDot'
import {BoxDot} from '../models/dots/basic/BoxDot'
import {BoxSpaceDot} from '../models/dots/basic/BoxSpaceDot'
import {WallDot} from '../models/dots/basic/WallDot'

export const basicLayerContent = {
    [LayerContent.Wall]: WallDot,
    [LayerContent.BoxSpace]: BoxSpaceDot,
    [LayerContent.Space]: SpaceDot,
    [LayerContent.Player]: PlayerDot,
    [LayerContent.Box]: BoxDot
}
