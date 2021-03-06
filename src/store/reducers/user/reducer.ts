import {Actions, DispatchAction} from './actions'
import {initialState, State} from './state'

export function userReducer(state: State = initialState, action: DispatchAction): State {
    switch (action.type) {
        case Actions.NOT_AUTH:
            return {
                ...state,
                status: 'failed',
                authStatus: false,
                info: null
            }
        case Actions.AUTH:
            return {
                ...state,
                status: 'success',
                authStatus: true,
                info: action.payload,
                id: action.payload.id
            }
        default:
            return state
    }
}
