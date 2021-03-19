import {Action} from 'redux'
import {UserInfo} from './state'

export enum Actions {
    SET_EMPTY_USER_DATA = 'SET_EMPTY_USER_DATA',
    SET_USER_DATA = 'SET_USER_DATA'
}

export type TypedAction = {
    payload?: JSON | UserInfo
} & Action

export const setUserData = (data: JSON | undefined = undefined): TypedAction => (
    {type: Actions.SET_USER_DATA, payload: data})
export const setEmptyUserData = (): TypedAction => ({type: Actions.SET_EMPTY_USER_DATA})
