import {Action as ReduxAction} from 'redux'
import {validateInput} from '../../../utils/validateInput'
import {FieldsKeys, Fields} from './state'
import {UserInfo} from '../../../store/reducers/user/state'
import {FormField} from '../../../types/formTypes'

export enum Actions {
    SET_FIELD = 'SET_FIELD',
    FILL_FIELDS = 'FILL_FIELDS',
    NO_ACTIONS = 'NO_ACTIONS',
    SET_INIT = 'SET_INIT'
}

export type Action = {
    payload?: Payload
} & ReduxAction

export type Payload = {
    [key: string]: string | number | boolean | FormField | Fields
}

export const setInit = (): Action => ({type: Actions.SET_INIT})
export const noActions = (): Action => ({type: Actions.NO_ACTIONS})
export const setFieldAction = (name: string, field: FormField): Action => (
    {type: Actions.SET_FIELD, payload: {name, field}})
export const fillFieldsAction = (fields: Fields): Action => (
    {type: Actions.FILL_FIELDS, payload: {fields}})
export const updateFieldErr = (fields: Fields, name: string): Action => ({
    type: Actions.SET_FIELD,
    payload: {
        name,
        field: {...fields[<FieldsKeys>name], err: true}
    }
})

export const setField = (fields: Fields, name: string, val: string): Action => {
    const stateField = fields[<FieldsKeys>name]
    if (val === stateField.val) return noActions()
    const err = !validateInput(String(name), val, stateField.required)
    return setFieldAction(name, {...stateField, val, err})
}

export const fillFields = (userInfo: UserInfo, fields: Fields): Action => {
    const fieldsFilled = {...fields}
    const keys = Object.keys(fieldsFilled)
    for (let i = 0; i < keys.length; i++) {
        const field = fieldsFilled[<FieldsKeys>keys[i]]
        const val = userInfo[<keyof UserInfo>field.id]
        fieldsFilled[<FieldsKeys>field.id].val = val ? String(val) : ''
    }
    return fillFieldsAction(fieldsFilled)
}
