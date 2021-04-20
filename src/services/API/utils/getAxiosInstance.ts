import axios, {AxiosInstance} from 'axios'
import {YaCookie} from '../types'
import {stringifyCookies} from './stringifyCookies'

export const getAxiosInstance = (cookies: YaCookie | null = null): AxiosInstance => {
    let axiosInstance: AxiosInstance = axios.create()
    axios.defaults.validateStatus = () => true
    if (IS_CLIENT) {
        axiosInstance = axios.create({withCredentials: true})
    } else {
        if (!cookies) return axiosInstance
        axiosInstance = axios.create({
            headers: {
                Cookie: stringifyCookies(cookies)
            }
        })
    }
    return axiosInstance
}
