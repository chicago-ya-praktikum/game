import {FormField} from '../types/formTypes'
import {validateInput} from './validateInput'

export const checkFields = (fields: {[key: string]: FormField}):
{err: boolean, updateErr: string[]
} => {
    const keys = Object.keys(fields)
    const updateErr: string[] = []
    let err = false
    for (let i = 0; i < keys.length; i++) {
        const field = fields[keys[i]]
        const fieldErr = !validateInput(keys[i], field.val, field.required)
        err = fieldErr || err
        if (fieldErr !== field.err) updateErr.push(keys[i])
    }
    return {err, updateErr}
}
