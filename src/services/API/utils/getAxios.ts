import axios, {AxiosInstance} from 'axios'
import {YaCookie} from '../types'

export const stringifyCookies = (cookies: YaCookie) => Object
    .entries(cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join(';')

export const getAxios = (cookies: YaCookie | null = null): AxiosInstance => {
    let axiosInstance: AxiosInstance
    if (IS_CLIENT) {
        axiosInstance = axios.create(
            {
                withCredentials: true
            }
        )
    } else if (cookies) {
        axiosInstance = axios.create({
            headers: {
                Cookie: stringifyCookies(cookies)
            }
        })
    } else {
        axiosInstance = axios.create()
    }
    return axiosInstance
}
