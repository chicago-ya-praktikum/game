import {DynamicContent} from '../enums/DynamicContent'
import {PlayerDot} from '../models/dots/PlayerDot'
import {BoxDot} from '../models/dots/BoxDot'

export function getDynamicConstructor(type: DynamicContent) {
    if (type === DynamicContent.Player) {
        return PlayerDot
    }
    return BoxDot
}
