import {LayerContent} from '../enums/LayerContent'
import {SpaceDot} from '../models/dots/SpaceDot'
import {BoxSpaceDot} from '../models/dots/BoxSpaceDot'
import {WallDot} from '../models/dots/WallDot'

export function getDotConstructor(dot: LayerContent) {
    switch (dot) {
        case LayerContent.Wall:
            return WallDot
        case LayerContent.BoxSpace:
            return BoxSpaceDot
        case LayerContent.Space:
        default:
            return SpaceDot
    }
}
