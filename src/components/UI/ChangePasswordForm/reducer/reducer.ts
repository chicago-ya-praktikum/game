import {FormFieldPayload, FormAction} from '../../../../types/actionTypes'
import {Actions} from './actions'
import {initialState, State} from './state'

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
        case Actions.FORM_OPEN:
            return {...state, open: true}
        case Actions.FORM_CLOSE:
            return {...initialState, open: false}
        default:
            return state
    }
}
