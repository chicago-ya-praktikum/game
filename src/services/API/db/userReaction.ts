import {AxiosResponse} from 'axios'
import {UserInfo} from '@state/reducers/user/state'
import {API_ROOT, URL_USER_REACTIONS} from '../../../contstants/db/index'
import {getAxiosInstance} from './utils/index'
import {getUnknownError} from '../utils/index'

export const postUserReactions = async (
    userInfo: UserInfo,
    data: {
        reactionId: number,
        userId: number,
        recordId: number
    }
): Promise<AxiosResponse> => {
    try {
        const axios = getAxiosInstance(userInfo)
        const res = await axios.post(API_ROOT + URL_USER_REACTIONS.POST_CREATE_REMOVE, data)
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}

export const getTopicReactions = async (
    userInfo: UserInfo, topicId: number
): Promise<AxiosResponse> => {
    try {
        const axios = getAxiosInstance(userInfo)
        const res = await axios.get(API_ROOT + URL_USER_REACTIONS.GET_ONE.replace(':recordId', String(topicId)))
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}
