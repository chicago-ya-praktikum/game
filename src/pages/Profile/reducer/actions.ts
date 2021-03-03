import {FormAction} from '../../../types/actionTypes'
import {validateInput} from '../../../utils/validateInput'
import {FieldsKeys, Fields} from './state'

export enum Actions {
    FIELD_SET = 'FIELD_SET',
    NO_ACTIONS= 'NO_ACTIONS'
}

export const fieldSet = (fields: Fields, name: string, val: string): FormAction => {
    const stateField = fields[<FieldsKeys>name]

    if (val === stateField.val) return {type: Actions.NO_ACTIONS}
    const err = !validateInput(String(name), val, stateField.required)
    return {
        type: Actions.FIELD_SET,
        payload: {
            name,
            field: {...stateField, val, err}
        }
    }
}
export const fieldUpdateErr = (fields: Fields, name: string): FormAction => {
    const stateField = fields[<FieldsKeys>name]
    return {
        type: Actions.FIELD_SET,
        payload: {
            name,
            field: {...stateField, err: true}
        }
    }
}
