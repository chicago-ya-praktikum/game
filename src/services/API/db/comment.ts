import {AxiosResponse} from 'axios'
import {UserInfo} from '@state/reducers/user/state'
import {API_ROOT, URL_COMMENT} from '../../../contstants/db/index'
import {getAxiosInstance} from './utils/index'
import {getUnknownError} from '../utils/index'

export const postCreateComment = async (
    userInfo: UserInfo,
    comment: {
        recordId: number
        parentId: number
        content: string
    }
): Promise<AxiosResponse> => {
    try {
        const axios = getAxiosInstance(userInfo)
        axios.defaults.headers.authorization = userInfo.id
        const res = await axios.post(API_ROOT + URL_COMMENT.POST_CREATE,
            {
                recordId: comment.recordId,
                parentId: comment.parentId,
                content: comment.content
            })
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}

export const getComments = async (userInfo: UserInfo, recordId: number): Promise<AxiosResponse> => {
    try {
        const axios = getAxiosInstance(userInfo)
        const res = await axios.get(API_ROOT + URL_COMMENT.GET_COMMENTS.replace(':recordId', String(recordId)))
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}
