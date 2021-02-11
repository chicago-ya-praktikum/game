import {DynamicContent} from '../enums/DynamicContent'
import {dynamicContent} from '../constants/dynamicContent'

export function getDynamicConstructor(type: DynamicContent) {
    return dynamicContent[type]
}
