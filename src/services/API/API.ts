import {AxiosResponse} from 'axios'
import {URL_USER, API_ROOT} from '../../contstants/index'
import {YaCookie} from './types'
import {getAxiosInstance} from './utils/getAxiosInstance'

export const apiGetUserData = async (cookies: YaCookie | null = null): Promise<AxiosResponse> => {
    const axiosInstance = getAxiosInstance(cookies)
    if (!axiosInstance) return JSON.parse('{}')
    const {GET_USER_INFO} = URL_USER
    try {
        const res = await axiosInstance.get(API_ROOT + GET_USER_INFO)
        return res
    } catch (err) {
        return JSON.parse('{}')
    }
}
