type LoadStatus = 'success' | 'pending' | 'failed'
type Nullable<T> = T | null

interface User {
    name: string
}
type UserReducer = {
    item: Nullable<User>
    status: LoadStatus
}

enum Actions {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    SET_USER_ITEM = 'SET_USER_ITEM'
}

const defaultReducer: UserReducer = {
    status: 'failed',
    item: null
}

interface BaseActionType {
    type: Actions
}

// Может совпадать иногда с Reducer-типом
interface ItemActionType extends BaseActionType {
    item: User
}

export function userReducer(state: UserReducer = defaultReducer,
    {type, item}: ItemActionType): UserReducer {
    switch (type) {
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
        case Actions.SET_USER_ITEM:
            return {
                ...state,
                item
            }
        default:
            return state
    }
}
