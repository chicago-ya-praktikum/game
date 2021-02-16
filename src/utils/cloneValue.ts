import {ClonedValue} from '../types/ClonedValue'
// eslint-disable-next-line import/no-cycle
import {deepClone} from './deepClone'

export function cloneValue(value: ClonedValue): ClonedValue {
    let clone: ClonedValue

    if (Array.isArray(value)) {
        clone = value.map((item) => cloneValue(item))
    } else if (typeof value === 'object' && value !== null) {
        clone = deepClone(value)
    } else {
        clone = value
    }

    return clone
}
