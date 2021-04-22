import {Action as ReduxAction} from 'redux'
import {initialState, fields} from './state'
import {FormField} from '../../../../types/formTypes'

export type Action = {
    payload?: Payload
} & ReduxAction

export type Payload = {
    [key: string]: string | number | boolean | FormField | Fields
}

export type State = typeof initialState
export type Fields = typeof fields
export type FieldsKeys = keyof Fields
