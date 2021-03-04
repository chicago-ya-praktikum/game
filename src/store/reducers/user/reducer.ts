import {Actions, DispatchAction} from './actions'
import {initialState, State} from './state'

export function userReducer(state: State = initialState, action: DispatchAction): State {
    switch (action.type) {
        case Actions.IS_NOT_AUTH:
            return {
                ...state,
                status: 'failed',
                authStatus: false,
                info: null
            }
        // case Actions.SIGNUP:
        // case Actions.SIGNIN:
        //     return {
        //         ...state,
        //         authStatus: action.payload.status === 200
        //     }
        // case Actions.APPLOAD:
        //     return {
        //         ...state,
        //         user: action.payload.reason ? false : action.payload,
        //         authStatus: !action.payload.reason
        //     }
        // case Actions.LOGOUT:
        //     return {
        //         ...state,
        //         authStatus: false
        //     }
        default:
            return state
    }
}
