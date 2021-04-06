import axios, {AxiosInstance} from 'axios'
import {YaCookie} from '../types'

export const stringifyCookies = (cookies: YaCookie) => Object
    .entries(cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join(';')

export const getAxiosInstance = (cookies: YaCookie | null = null): AxiosInstance | null => {
    let axiosInstance: null | AxiosInstance
    if (IS_CLIENT) {
        axiosInstance = axios.create({withCredentials: true})
    } else {
        if (!cookies) return JSON.parse('{}')
        axiosInstance = axios.create({
            headers: {
                Cookie: stringifyCookies(cookies)
            }
        })
    }
    return axiosInstance
}