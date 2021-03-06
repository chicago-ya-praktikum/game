import {FormField} from '../types/formTypes'

export const getDefaultFormField = (
    id: string,
    label: string,
    type: string = '',
    required = true,
    err = false,
    val = '',
    tip = ''
): FormField => ({
    id, label, type, required, err, val, tip
})
