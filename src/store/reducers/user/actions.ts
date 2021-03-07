import {Action} from 'redux'
import {Dispatch} from 'react'
import {Auth, Users} from '../../../API'
import {Fields as ProfileFields} from '../../../pages/Profile/reducer/state'
import {Info} from './state'

export enum Actions {
    APPLOAD = 'APPLOAD',
    SIGNUP = 'SIGNUP',
    LOGOUT = 'LOGOUT',
    SIGNIN = 'SIGNIN',
    NOT_AUTH = 'NOT_AUTH',
    AUTH = 'AUTH',
    PUT_PROFILE = 'PUT_PROFILE',
    PUT_PASSWORD = 'PUT_PASSWORD',
    NO_ACTIONS = 'NO_ACTIONS'
}

export type DispatchAction = {payload?: any} & Action

const notAuth = (): DispatchAction => ({type: Actions.NOT_AUTH})
const noActions = (): DispatchAction => ({type: Actions.NO_ACTIONS})
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

export const putProfile = (
    fields: ProfileFields, info: Info
) => async (dispatch: Dispatch<DispatchAction>) => {
    const newInfo = {...info}
    type Info = typeof newInfo
    type InfoKeys = keyof Info
    type ProfileFieldsKeys = keyof ProfileFields

    const keysInfo = <InfoKeys[]>Object.keys(newInfo)
    for (let i = 0; i < keysInfo.length; i++) {
        const field = fields[<ProfileFieldsKeys>keysInfo[i]]
        if (field) {
            newInfo[keysInfo[i]] = fields[<ProfileFieldsKeys>keysInfo[i]].val
        }
    }
    const response = await Users.putProfile(newInfo)
    if (response.ok) {
        const res = await response.json()
        if (response.status >= 400) {
            window.alertShow('error', res.message)
        } else {
            window.alertShow('success', 'Profile saved.')
        }
        dispatch(auth(res))
    } else {
        const res = await response.text()
        window.alertShow('error', res)
        dispatch(notAuth())
    }
}

export const putPassword = (
    oldPassword: string, newPassword: string
) => async (dispatch: Dispatch<DispatchAction>) => {
    const response = await Users.putPassword({oldPassword, newPassword})
    if (response.ok) {
        if (response.status >= 400) {
            const res = await response.json()
            window.alertShow('error', res.message)
        } else {
            window.alertShow('success', 'Password saved.')
        }
    } else {
        const res = await response.text()
        window.alertShow('error', res)
    }
    dispatch(noActions())
}

export const postLogout = () => async (dispatch: Dispatch<DispatchAction>) => {
    const response = await Auth.logout()
    if (!response.ok) {
        const res = await response.text()
        window.alertShow('error', res)
    }
    dispatch(noActions())
}
