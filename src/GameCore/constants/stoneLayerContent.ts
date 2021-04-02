import {LayerContent} from '../enums/LayerContent'
import {WallStoneDot} from '../models/dots/stone/WallStoneDot'
import {BoxSpaceStoneDot} from '../models/dots/stone/BoxSpaceStoneDot'
import {SpaceStoneDot} from '../models/dots/stone/SpaceStoneDot'
import {PlayerStoneDot} from '../models/dots/stone/PlayerStoneDot'
import {BoxStoneDot} from '../models/dots/stone/BoxStoneDot'

export const stoneLayerContent = {
    [LayerContent.Wall]: WallStoneDot,
    [LayerContent.BoxSpace]: BoxSpaceStoneDot,
    [LayerContent.Space]: SpaceStoneDot,
    [LayerContent.Player]: PlayerStoneDot,
    [LayerContent.Box]: BoxStoneDot
}
