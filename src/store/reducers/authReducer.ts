import {Actions} from '../actions'

type Nullable<T> = T | null

export type AuthReducer = {
    user: Nullable<any>
    authStatus: boolean
}

const defaultReducer: AuthReducer = {
    user: null,
    authStatus: false
}

export function authReducer(state: AuthReducer = defaultReducer,
    action: {type: Actions, payload: any}): AuthReducer {
    switch (action.type) {
        case Actions.SIGNUP:
        case Actions.SIGNIN:
            return {
                ...state,
                authStatus: action.payload.status === 200
            }
        case Actions.APPLOAD:
            return {
                ...state,
                user: action.payload.reason ? false : action.payload,
                authStatus: !action.payload.reason
            }
        case Actions.LOGOUT:
            return {
                ...state,
                authStatus: false
            }
        default:
            return state
    }
}
