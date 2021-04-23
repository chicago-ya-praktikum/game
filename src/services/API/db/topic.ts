import {AxiosResponse} from 'axios'
import {UserInfo} from '../../../store/reducers/user/state'
import {API_ROOT, URL_TOPIC} from '../../../contstants/db/index'
import {getAxiosInstance} from './utils/index'
import {getUnknownError} from '../utils/index'

export const postCreateTopic = async (userInfo: UserInfo,
    topicInfo: {
        title: string,
        content: string
    }): Promise<AxiosResponse> => {
    try {
        const axios = getAxiosInstance(userInfo)
        axios.defaults.headers.authorization = userInfo.id
        const res = await axios.post(API_ROOT + URL_TOPIC.POST_CREATE,
            {
                title: topicInfo.title,
                content: topicInfo.content
            })
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}

export const postUpdateTopic = async (userInfo: UserInfo,
    topicInfo: {
        id: number,
        title: string,
        content: string
    }): Promise<AxiosResponse> => {
    try {
        const axios = getAxiosInstance(userInfo)
        const res = await axios.post(API_ROOT + URL_TOPIC.POST_UPDATE,
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

export const getTopics = async (userInfo: UserInfo): Promise<AxiosResponse> => {
    try {
        const axios = getAxiosInstance(userInfo)
        const res = await axios.get(API_ROOT + URL_TOPIC.GET_ALL)
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}

export const getOneTopic = async (userInfo: UserInfo, id: number): Promise<AxiosResponse> => {
    try {
        const axios = getAxiosInstance(userInfo)
        const res = await axios.get(API_ROOT + URL_TOPIC.GET_ONE.replace(':id', String(id)))
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}

export const deleteTopic = async (userInfo: UserInfo, id: number): Promise<AxiosResponse> => {
    try {
        const axios = getAxiosInstance(userInfo)
        const res = await axios.delete(API_ROOT + URL_TOPIC.DELETE.replace(':id', String(id)))
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}
