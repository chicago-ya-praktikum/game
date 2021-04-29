import {FormFieldPayload} from '@types'
import {Actions, Action} from './actions'
import {State, Fields} from './state'

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
        case Actions.FILL_FIELDS: {
            if (!payload) return state
            return {
                ...state,
                fields: <Fields>payload.fields
            }
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
