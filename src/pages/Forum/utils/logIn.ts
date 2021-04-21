import {UserInfo} from '../../../store/reducers/user/state'
import {postLogIn} from '../../../services/API/db/index'

export const logIn = async (userInfo: UserInfo | undefined) => {
    if (!userInfo) return false
    const res = await postLogIn(userInfo)
    const available = res.status === 201 || res.status === 409
    if (!available && res.data.message) window.alertShow('error', res.data.message)
    return available
}
