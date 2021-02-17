import {LayerContent} from '../enums/LayerContent'
import {layerContent} from '../constants/layerContent'

export function getDotConstructor(dot: LayerContent) {
    return layerContent[dot]
}
