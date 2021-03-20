import {validateInput} from '../../../../utils/validateInput'
import {FormAction} from '../../../../types/actionTypes'
import {Fields, FieldsKeys} from './state'
import {FormField} from '../../../../types/formTypes'

export enum Actions {
    SET_FIELD = 'SET_FIELD',
    NO_ACTIONS = 'NO_ACTIONS',
    OPEN_FORM = 'OPEN_FORM',
    CLOSE_FORM = 'CLOSE_FORM'
}

export const openForm = (): FormAction => ({type: Actions.OPEN_FORM})
export const closeForm = (): FormAction => ({type: Actions.CLOSE_FORM})
export const setFieldAction = (name: string, field: FormField): FormAction => (
    {type: Actions.SET_FIELD, payload: {name, field}})

export const setField = (fields: Fields, name: string, val: string): FormAction => {
    const stateField = fields[<FieldsKeys>name]
    if (val === stateField.val) return {type: Actions.NO_ACTIONS}
    const err = !validateInput(String(name), val, stateField.required)
    return setFieldAction(name, {...stateField, val, err})
}

export const setFieldErr = (fields: Fields, name: string): FormAction => (
    {type: Actions.SET_FIELD, payload: {name, field: {...fields[<FieldsKeys>name], err: true}}})
