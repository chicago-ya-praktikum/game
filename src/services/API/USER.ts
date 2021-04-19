import {AxiosResponse} from 'axios'
import {URL_USER, API_ROOT} from '../../contstants/index'
import {YaCookie} from './types'
import {getAxios} from './utils/getAxios'

export const apiGetUserData = async (cookies: YaCookie | null = null): Promise<AxiosResponse> => {
    const axios = getAxios(cookies)
    const {GET_USER_INFO} = URL_USER
    try {
        const res = await axios.get(API_ROOT + GET_USER_INFO)
        return res
    } catch (err) {
        return JSON.parse('{"err": "Wrong request"}')
    }
}
