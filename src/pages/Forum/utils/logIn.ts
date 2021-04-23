import {UserInfoEmpty} from '../../../store/reducers/user/state'
import {postLogIn} from '../../../services/API/db/index'

export const logIn = async (userInfo: UserInfoEmpty) => {
    if (!userInfo) return false
    if (!userInfo.display_name) return window.alertShow('error', 'Display name must be filled in')
    const res = await postLogIn(userInfo)
    const available = res.status === 201 || res.status === 409
    if (!available && res.data.message) window.alertShow('error', res.data.message)
    return available
}
