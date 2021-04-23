import _ from 'lodash'
import {FormFieldPayload} from '../../../../types/actionTypes'
import {Actions} from './EnumActions'
import {State, Fields, Action} from './types'
import {initialState} from './state'

export const reducer = (state: State, action: Action): State => {
    const {payload} = action
    switch (action.type) {
        case Actions.SET_FIELD: {
            const {name, field} = action.payload as FormFieldPayload
            return {
                ...state,
                fields:
                {
                    ...state.fields,
                    [String(name)]: field
                }
            }
        }
        case Actions.SET_READONLY: {
            return {
                ...state,
                readOnly: Boolean(payload?.readOnly)
            }
        }
        case Actions.FILL_FIELDS: {
            if (!payload) return state
            return {
                ...state,
                fields: <Fields>payload.fields
            }
        }
        case Actions.RESET: {
            return _.cloneDeep(initialState)
        }
        case Actions.SET_INIT: {
            return {
                ...state,
                init: true
            }
        }
        default:
            return state
    }
}
