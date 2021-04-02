import {GameTheme} from '../enums/GameTheme'
import {stoneLayerContent} from './stoneLayerContent'
import {sandLayerContent} from './sandLayerContent'
import {basicLayerContent} from './basicLayerContent'

export const layerContent = {
    [GameTheme.Basic]: basicLayerContent,
    [GameTheme.Sand]: sandLayerContent,
    [GameTheme.Stone]: stoneLayerContent
}
