import {ClonedValue} from '../types/ClonedValue'
import {ClonedObject} from '../types/ClonedObject'
import {cloneValue} from './cloneValue'

export function deepClone(object: ClonedObject): ClonedValue {
    const clone: ClonedObject = {}

    for (const [key, v] of Object.entries(object)) {
        clone[key] = cloneValue(v)
    }

    return clone
}
