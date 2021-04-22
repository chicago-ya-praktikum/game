import {FormField} from '../../../../types/formTypes'
import {Actions} from './EnumActions'
import {Action, Fields, FieldsKeys} from './types'

export const setInit = (): Action => ({
    type: Actions.SET_INIT
})

export const noActions = (): Action => ({
    type: Actions.NO_ACTIONS
})

export const reset = (): Action => ({
    type: Actions.RESET
})

export const setField = (name: string, field: FormField): Action => ({
    type: Actions.SET_FIELD,
    payload: {
        name,
        field
    }
})

export const setFieldErr = (fields: Fields, name: string): Action => ({
    type: Actions.SET_FIELD,
    payload: {
        name,
        field: {...fields[<FieldsKeys>name], err: true}
    }
})

export const fillFields = (fields: Fields): Action => ({
    type: Actions.SET_FIELD,
    payload: {
        field: {...fields}
    }
})
