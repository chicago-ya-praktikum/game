import {FormField} from '../types/formTypes'

export const getDefaultFormField = (
    required = true, err = false, val = '', tip = ''
): FormField => ({
    err, required, val, tip
})
