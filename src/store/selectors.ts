import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {RootState} from './reducers/index'
import {UserInfo} from './reducers/user/state'

export const typedState: TypedUseSelectorHook<RootState> = useSelector

export const userSelector = () => typedState(s => s).user
export const authSelector = () => typedState(s => s).auth
export const themeSelector = () => typedState(s => s).theme

export const authStatusSelector = () => authSelector().authStatus

export const userInfoPropSelector = (prop: keyof UserInfo) => {
    const {info} = userSelector()
    if (!info) return ''
    return info[prop] ? info[prop] : ''
}
export const userInfoSelector = () => userSelector().info
export const userInitSelector = () => !!userSelector().info
