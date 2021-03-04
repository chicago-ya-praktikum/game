import {Action} from 'redux'
import {Dispatch} from 'react'
import {Auth} from '../../../API'

export enum Actions {
    APPLOAD = 'APPLOAD',
    SIGNUP = 'SIGNUP',
    LOGOUT = 'LOGOUT',
    SIGNIN = 'SIGNIN',
    IS_NOT_AUTH = 'IS_NOT_AUTH'
}

export type DispatchAction = {payload?: any} & Action

const isNotAuth = (): DispatchAction => ({type: Actions.IS_NOT_AUTH})

export const userLogIn = () => async (dispatch: Dispatch<DispatchAction>) => {
    const response: Response = await Auth.user()
    if (response.ok) {
        console.log('response', response, dispatch)
    } else {
        dispatch(isNotAuth())
    }
}

// export const userLogIn = () => {
// const getResponse = () => {
//     Auth.userInfo().then(data => {
//         console.log('data', data)
//         dispatch(actionCreator(Actions.APPLOAD, data))
//     })
// }
// return getResponse()
// }
