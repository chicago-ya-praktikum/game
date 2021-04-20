import {AxiosResponse} from 'axios'
import {UserInfo} from '../../../store/reducers/user/state'
import {API_ROOT, URL_TOPIC} from '../../../contstants/db/index'
import {YaCookieNull} from '../types'
import {getAxiosInstance, getUnknownError} from '../utils/index'

export const postCreateTipic = async (
    userInfo: UserInfo, topicInfo: {
        title: string, content: string, id: number
    }, cookies: YaCookieNull = null
): Promise<AxiosResponse> => {
    const axios = getAxiosInstance(cookies)
    const {POST_TOPIC_CREATE} = URL_TOPIC
    try {
        axios.defaults.headers.authorization = userInfo.id
        const res = await axios.post(API_ROOT + POST_TOPIC_CREATE,
            {
                title: topicInfo.title,
                content: topicInfo.content,
                id: topicInfo.id
            })
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}
