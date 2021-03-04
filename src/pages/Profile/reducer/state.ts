import {getDefaultFormField} from '../../../utils/getDefaultFormField'

export const fields = {
    firstName: getDefaultFormField(),
    secondName: getDefaultFormField(),
    displayName: getDefaultFormField(),
    login: getDefaultFormField(),
    email: getDefaultFormField(),
    phone: getDefaultFormField()
}

export const initialState = {
    fields
}

export type State = typeof initialState
export type Fields = typeof fields
export type FieldsKeys = keyof Fields
