import {getDefaultFormField} from '../../../utils/getDefaultFormField'

export const fields = {
    first_name: getDefaultFormField('first_name', 'First name (required)'),
    second_name: getDefaultFormField('second_name', 'Second name (required)'),
    display_name: getDefaultFormField('display_name', 'Display name (required)'),
    login: getDefaultFormField('login', 'Login (required)'),
    email: getDefaultFormField('email', 'email (required)'),
    phone: getDefaultFormField('phone', 'phone', {required: false})
}

export const initialState = {
    fields,
    init: false
}

export type State = typeof initialState
export type Fields = typeof fields
export type FieldsKeys = keyof Fields
