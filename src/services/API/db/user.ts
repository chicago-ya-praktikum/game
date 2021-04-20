import {AxiosResponse} from 'axios'
import {UserInfo} from '../../../store/reducers/user/state'
import {API_ROOT, URL_USER} from '../../../contstants/db/index'
import {YaCookieNull} from '../types'
import {getAxiosInstance, getUnknownError} from '../utils/index'

export const postLogIn = async (
    userInfo: UserInfo, cookies: YaCookieNull = null
): Promise<AxiosResponse> => {
    const axios = getAxiosInstance(cookies)
    const {POST_USER_CREATE} = URL_USER
    try {
        axios.defaults.headers.authorization = userInfo.id
        const res = await axios.post(API_ROOT + POST_USER_CREATE,
            {
                displayName: userInfo.display_name,
                avatar: userInfo.avatar
            })
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}
