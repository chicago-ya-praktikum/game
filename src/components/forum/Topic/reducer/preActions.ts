import {validateInput} from '../../../../utils/validateInput'
import {noActions, setField} from './actions'
import {Action, Fields, FieldsKeys} from './types'

export const preSetField = (fields: Fields, name: string, val: string): Action => {
    const stateField = fields[<FieldsKeys>name]
    if (val === stateField.val) return noActions()
    const err = !validateInput(String(name), val, stateField.required)
    return setField(
        name,
        {
            ...stateField,
            val,
            err
        }
    )
}
