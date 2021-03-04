import {getDefaultFormField} from '../../../../utils/getDefaultFormField'

export const fields = {
    oldPassword: getDefaultFormField(),
    newPassword: getDefaultFormField(),
    confirmPassword: getDefaultFormField()
}

export const initialState = {
    open: false,
    fields
}

export type State = typeof initialState
export type Fields = typeof fields
export type FieldsKeys = keyof Fields
