// eslint-disable-next-line import/no-cycle
import {Actions, TypedAction} from './actions'
import {initialState, State, UserInfo} from './state'

export function userReducer(state: State = initialState, action: TypedAction): State {
    switch (action.type) {
        case Actions.SET_EMPTY_USER_DATA:
            return {
                ...state,
                info: undefined
            }
        case Actions.SET_USER_DATA:
            return {
                ...state,
                info: <UserInfo>action.payload
            }
        default:
            return state
    }
}
