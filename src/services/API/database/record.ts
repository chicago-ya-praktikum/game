import {AxiosResponse} from 'axios'
import {URL_RECORD, API_ROOT} from '../../../contstants/apiDatabase/index'
import {getAxiosInstance} from '../utils/getAxiosInstance'
import {handleError} from '../utils/handleError'

export const postCreateUser = async (info: any): Promise<AxiosResponse> => {
    const axios = getAxiosInstance()
    const {POST_CREATE_RECORD} = URL_RECORD
    try {
        axios.defaults.headers.post.authorization = info.id
        const res = await axios.post(API_ROOT + POST_CREATE_RECORD, {
            displayName: info.display_name,
            avatar: info.avatar
        })
        return res
    } catch (err) {
        return handleError(err)
    }
}