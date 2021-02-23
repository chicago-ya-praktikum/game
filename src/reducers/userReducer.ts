import {Actions} from '../actions'

type LoadStatus = 'success' | 'pending' | 'failed'
type Nullable<T> = T | null

interface User {
    name: string
}
type UserReducer = {
    user: Nullable<User>
    status: LoadStatus
}

const defaultReducer: UserReducer = {
    status: 'failed',
    user: null
}

// interface BaseActionType {
//     type: Actions
// }

// Может совпадать иногда с Reducer-типом
// interface ItemActionType extends BaseActionType {
//     payload: User
// }

export function userReducer(state: UserReducer = defaultReducer,
    action: {type: Actions, payload: User}): UserReducer {
    switch (action.type) {
        case Actions.PENDING:
            return {
                ...state,
                status: 'pending'
            }
        case Actions.SUCCESS:
            return {
                ...state,
                status: 'success'
            }
        case Actions.FAILED:
            return {
                ...state,
                status: 'failed'
            }
        case Actions.SIGNIN:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}
