import {FormFieldPayload} from '../../../types/actionTypes'
import {Actions, Action} from './actions'
import {State, Fields} from './state'

export const reducer = (state: State, action: Action): State => {
    const {payload} = action
    switch (action.type) {
        case Actions.FIELD_SET: {
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
        case Actions.FIELDS_FILL: {
            if (!payload) return state
            return {
                ...state,
                fields: <Fields>payload.fieldsFilled
            }
        }
        case Actions.INIT: {
            return {
                ...state,
                init: true
            }
        }
        default:
            return state
    }
}
