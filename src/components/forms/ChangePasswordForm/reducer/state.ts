import {getDefaultFormField} from '../../../../utils/getDefaultFormField'

export const fields = {
    oldPassword: getDefaultFormField('oldPassword', 'Old password (required)', 'password'),
    newPassword: getDefaultFormField('newPassword', 'New password (required)', 'password'),
    confirmPassword: getDefaultFormField('confirmPassword', 'Confirm password (required)', 'password')
}

export const initialState = {
    open: false,
    fields
}

export type State = typeof initialState
export type Fields = typeof fields
export type FieldsKeys = keyof Fields
