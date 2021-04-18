import {AxiosResponse} from 'axios'
import {URL_USER, API_ROOT} from '../../../contstants/ya/index'
import {YaCookie} from '../types'
import {getAxiosInstance} from '../utils/getAxiosInstance'

export const getUserData = async (cookies: YaCookie | null = null): Promise<AxiosResponse> => {
    const axios = getAxiosInstance(cookies)
    const {GET_USER_INFO} = URL_USER
    try {
        const res = await axios.get(API_ROOT + GET_USER_INFO)
        return res
    } catch (err) {
        return JSON.parse('{}')
    }
}
