import {LayerContent} from '../enums/LayerContent'
import {WallStoneDot} from '../models/dots/stone/WallStoneDot'
import {BoxSpaceStoneDot} from '../models/dots/stone/BoxSpaceStoneDot'
import {PlayerStoneDot} from '../models/dots/stone/PlayerStoneDot'
import {BoxStoneDot} from '../models/dots/stone/BoxStoneDot'
import {SpaceSandDot} from '../models/dots/sand/SpaceSandDot'

export const sandLayerContent = {
    [LayerContent.Wall]: WallStoneDot,
    [LayerContent.BoxSpace]: BoxSpaceStoneDot,
    [LayerContent.Space]: SpaceSandDot,
    [LayerContent.Player]: PlayerStoneDot,
    [LayerContent.Box]: BoxStoneDot
}
