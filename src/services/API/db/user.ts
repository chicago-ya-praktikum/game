import {AxiosResponse} from 'axios'
import {UserInfo} from '../../../store/reducers/user/state'
import {API_ROOT, URL_USER} from '../../../contstants/db/index'
import {getAxiosInstance} from './utils/index'
import {getUnknownError} from '../utils/index'

export const postLogIn = async (userInfo: UserInfo): Promise<AxiosResponse> => {
    try {
        const axios = getAxiosInstance(userInfo)
        const res = await axios.post(API_ROOT + URL_USER.POST_CREATE,
            {
                displayName: userInfo.display_name,
                avatar: userInfo.avatar
            })
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}
