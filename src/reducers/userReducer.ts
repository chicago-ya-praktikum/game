import {Actions} from '../actions'

type LoadStatus = 'success' | 'pending' | 'failed'
type Nullable<T> = T | null

type UserReducer = {
    user: Nullable<any>
    status: LoadStatus
}

const defaultReducer: UserReducer = {
    status: 'failed',
    user: null
}

export function userReducer(state: UserReducer = defaultReducer,
    action: {type: Actions, payload: any}): UserReducer {
    switch (action.type) {
        case Actions.SIGNIN:
            return {
                ...state,
                user: action.payload
            }
        case Actions.APPLOAD:
            return {
                ...state,
                user: action.payload
            }
        case Actions.LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}
