import {DynamicContent} from '../enums/DynamicContent'
import {PlayerDot} from '../models/dots/PlayerDot'
import {BoxDot} from '../models/dots/BoxDot'

export const dynamicContent = {
    [DynamicContent.Player]: PlayerDot,
    [DynamicContent.Box]: BoxDot
}
