import {AxiosResponse} from 'axios'
import {UserInfo} from '../../../store/reducers/user/state'
import {API_ROOT, URL_TOPIC} from '../../../contstants/db/index'
import {YaCookieNull} from '../types'
import {getAxiosInstance, getUnknownError} from '../utils/index'

export const postCreateTopic = async (
    userInfo: UserInfo, topicInfo: {
        title: string, content: string
    }, cookies: YaCookieNull = null
): Promise<AxiosResponse> => {
    const axios = getAxiosInstance(cookies)
    const {POST_CREATE} = URL_TOPIC
    try {
        axios.defaults.headers.authorization = userInfo.id
        const res = await axios.post(API_ROOT + POST_CREATE,
            {
                title: topicInfo.title,
                content: topicInfo.content
            })
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}

export const postUpdateTopic = async (
    userInfo: UserInfo, topicInfo: {
        title: string, content: string, id: number
    }, cookies: YaCookieNull = null
): Promise<AxiosResponse> => {
    const axios = getAxiosInstance(cookies)
    const {POST_UPDATE} = URL_TOPIC
    try {
        axios.defaults.headers.authorization = userInfo.id
        const res = await axios.post(API_ROOT + POST_UPDATE,
            {
                id: topicInfo.id,
                title: topicInfo.title,
                content: topicInfo.content
            })
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}

export const getTopics = async (
    userInfo: UserInfo, cookies: YaCookieNull = null
): Promise<AxiosResponse> => {
    const axios = getAxiosInstance(cookies)
    const {GET_TOPICS} = URL_TOPIC
    try {
        axios.defaults.headers.authorization = userInfo.id
        const res = await axios.get(API_ROOT + GET_TOPICS)
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}
