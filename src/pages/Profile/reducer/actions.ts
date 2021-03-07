import {Action as ReduxAction} from 'redux'
import {validateInput} from '../../../utils/validateInput'
import {FieldsKeys, Fields} from './state'
import {Info} from '../../../store/reducers/user/state'
import {FormField} from '../../../types/formTypes'

export enum Actions {
    FIELD_SET = 'FIELD_SET',
    FIELDS_FILL = 'FIELDS_FILL',
    NO_ACTIONS = 'NO_ACTIONS',
    INIT = 'INIT'
}

export type Action = {
    payload?: Payload
} & ReduxAction

export type Payload = {
    [key: string]: string | number | boolean | FormField | Fields
}

export const initSet = () => ({type: Actions.INIT})

export const fieldSet = (fields: Fields, name: string, val: string): Action => {
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

export const fieldsFill = (userInfo: Info, fields: Fields): Action => {
    const fieldsFilled = <Fields>{...fields}
    const keys = Object.keys(fieldsFilled)
    for (let i = 0; i < keys.length; i++) {
        const field = fieldsFilled[<FieldsKeys>keys[i]]
        const val = userInfo[<keyof Info>field.id]
        fieldsFilled[<FieldsKeys>field.id].val = val ? String(val) : ''
    }
    return {
        type: Actions.FIELDS_FILL,
        payload: {
            fieldsFilled
        }
    }
}

export const fieldUpdateErr = (fields: Fields, name: string): Action => {
    const stateField = fields[<FieldsKeys>name]
    return {
        type: Actions.FIELD_SET,
        payload: {
            name,
            field: {...stateField, err: true}
        }
    }
}
