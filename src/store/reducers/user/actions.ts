import {Action} from 'redux'
import {UserInfo} from './state'

export enum Actions {
    SET_EMPTY_USER_DATA = 'SET_EMPTY_USER_DATA',
    SET_USER_DATA = 'SET_USER_DATA'
    // NO_ACTIONS = 'NO_ACTIONS'
}

export type TypedAction = {
    payload?: JSON | UserInfo
} & Action

// export const noActions = (): TypedAction => ({type: Actions.NO_ACTIONS})
export const setUserData = (data: JSON | undefined = undefined): TypedAction => (
    {type: Actions.SET_USER_DATA, payload: data})
export const setEmptyUserData = (): TypedAction => ({type: Actions.SET_EMPTY_USER_DATA})
