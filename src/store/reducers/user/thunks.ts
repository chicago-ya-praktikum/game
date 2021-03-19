import {ThunkAction} from 'redux-thunk'
import {Action} from 'redux'
import {Auth, Users} from '../../../API'
import {Fields as ProfileFields} from '../../../pages/Profile/reducer/state'
import {actionCreator} from '../../../utils/actionCreator'
import {Actions as AuthActions} from '../../actions'
import {RootState} from '../index'
import {UserInfo} from './state'
import {setEmptyUserData, setUserData} from './actions'

export const getUserData = (
): ThunkAction<Promise<null>, RootState, unknown, Action<string>> => async dispatch => {
    const response = await Auth.user()
    dispatch(actionCreator(AuthActions.SIGNIN, response))
    if (response.ok) {
        const res = await response.json()
        dispatch(setUserData(res))
    } else {
        dispatch(setEmptyUserData())
    }
    return null
}

export const putAvatar = (
    file: File
): ThunkAction<Promise<null>, RootState, unknown, Action<string>> => async () => {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await Users.putAvatar(formData)
    if (!response.ok) {
        const message = await response.json()
        window.alertShow('error', message.reason)
    }
    return null
}

export const putProfile = (
    fields: ProfileFields, info: UserInfo
): ThunkAction<Promise<null>, RootState, unknown, Action<string>> => async dispatch => {
    const newInfo = {...info}
    Object.keys(fields).forEach((key) => {
        // @ts-ignore
        newInfo[key] = fields[key].val
    })
    const response = await Users.putProfile(newInfo)
    if (response.ok) {
        const res = await response.json()
        if (response.status >= 400) {
            window.alertShow('error', res.message)
            dispatch(setEmptyUserData())
        } else {
            window.alertShow('success', 'Profile saved.')
            dispatch(setUserData(res))
        }
    } else {
        const res = await response.text()
        window.alertShow('error', res)
        dispatch(setEmptyUserData())
    }
    return null
}

export const putPassword = (
    oldPassword: string, newPassword: string
): ThunkAction<Promise<null>, RootState, unknown, Action<string>> => async () => {
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
    return null
}

export const postLogout = (
): ThunkAction<Promise<null>, RootState, unknown, Action<string>> => async dispatch => {
    const response = await Auth.logout()

    if (!response.ok) {
        const res = await response.json()
        window.alertShow('error', res.reason)
    }
    dispatch(actionCreator(AuthActions.LOGOUT, response))
    dispatch(setEmptyUserData())

    return null
}
