import {AxiosResponse} from 'axios'
import {URL_USER, API_ROOT} from '../../../contstants/apiDatabase/index'
import {getAxiosInstance} from '../utils/getAxiosInstance'
import {handleError} from '../utils/handleError'

export const postCreateUser = async (info: any): Promise<AxiosResponse> => {
    const axios = getAxiosInstance()
    const {POST_CREATE_USER} = URL_USER
    try {
        axios.defaults.headers.post.authorization = info.id
        const res = await axios.post(API_ROOT + POST_CREATE_USER, {
            displayName: info.display_name,
            avatar: info.avatar
        })
        return res
    } catch (err) {
        return handleError(err)
    }
}
