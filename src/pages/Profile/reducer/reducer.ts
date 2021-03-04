import {FormFieldPayload, FormAction} from '../../../types/actionTypes'
import {Actions} from './actions'
import {State} from './state'

export const reducer = (state: State, action: FormAction): State => {
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
        default:
            return state
    }
}
