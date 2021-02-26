import {Actions} from '../actions'

type LoadStatus = 'success' | 'pending' | 'failed'
type Nullable<T> = T | null

type UserReducer = {
    user: Nullable<any>
    status: LoadStatus
    authStatus: boolean
}

const defaultReducer: UserReducer = {
    status: 'failed',
    user: null,
    authStatus: false
}

export function userReducer(state: UserReducer = defaultReducer,
    action: {type: Actions, payload: any}): UserReducer {
    switch (action.type) {
        case Actions.SIGNUP:
        case Actions.SIGNIN:
            console.log(action.payload, state)
            return {
                ...state,
                authStatus: action.payload.status === 200
            }
        case Actions.APPLOAD:
            console.log(action.payload, state)
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
