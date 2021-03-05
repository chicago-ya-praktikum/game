import {Action} from 'redux'
import {Dispatch} from 'react'
import {Auth} from '../../../API'
import {Fields} from '../../../pages/Profile/reducer/state'

export enum Actions {
    APPLOAD = 'APPLOAD',
    SIGNUP = 'SIGNUP',
    LOGOUT = 'LOGOUT',
    SIGNIN = 'SIGNIN',
    NOT_AUTH = 'NOT_AUTH',
    AUTH = 'AUTH',
    SAVE = 'SAVE'
}

export type DispatchAction = {payload?: any} & Action

const notAuth = (): DispatchAction => ({type: Actions.NOT_AUTH})
const auth = (data: JSON): DispatchAction => ({type: Actions.AUTH, payload: data})

export const getUserData = () => async (dispatch: Dispatch<DispatchAction>) => {
    const response = await Auth.user()
    if (response.ok) {
        const res = await response.json()
        dispatch(auth(res))
    } else {
        dispatch(notAuth())
    }
}

export const putUserData = (data: Fields) => async (dispatch: Dispatch<DispatchAction>) => {
    console.log(data, dispatch)
    // const response = await Users.putProfile(data)
    // if (response.ok) {
    //     const res = await response.json()
    //     dispatch(auth(res))
    // } else {
    //     dispatch(notAuth())
    // }
}
