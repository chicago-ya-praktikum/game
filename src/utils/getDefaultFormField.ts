import {AuxProps, FormField} from '../types/formTypes'

export const getDefaultFormField = (
    id: string, label: string, auxProps?: AuxProps
): FormField => {
    let type = ''
    let required = true
    let err = false
    let val = ''
    let tip = ''
    if (auxProps) {
        type = auxProps.type || type
        required = auxProps.required || required
        err = auxProps.err || err
        val = auxProps.val || val
        tip = auxProps.tip || tip
    }
    return {
        id, label, type, required, err, val, tip
    }
}
