import {AxiosResponse} from 'axios'
import {UserInfo} from '@state/reducers/user/state'
import {API_ROOT, URL_REACTIONS} from '../../../contstants/db/index'
import {getAxiosInstance} from './utils/index'
import {getUnknownError} from '../utils/index'


export const getAllReactions = async (userInfo: UserInfo): Promise<AxiosResponse> => {
    try {
        const axios = getAxiosInstance(userInfo)
        const res = await axios.get(API_ROOT + URL_REACTIONS.GET_REACTIONS)
        return res
    } catch (err) {
        return getUnknownError(err)
    }
}
