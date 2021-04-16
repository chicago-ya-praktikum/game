import axios, {AxiosInstance} from 'axios'
import {YaCookie} from '../yandex/types'

export const stringifyCookies = (cookies: YaCookie) => Object
    .entries(cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join(';')

type AxiosParams = {
    cookies?: YaCookie
    withCredentials?: boolean
}

export const getAxiosInstance = (AxiosParams : AxiosParams = {}): AxiosInstance => {
    const {cookies, withCredentials} = AxiosParams
    const axiosInstance = axios.create()
    if (IS_CLIENT) {
        axiosInstance.defaults.withCredentials = withCredentials || true
    } else {
        // eslint-disable-next-line no-lonely-if
        if (cookies) axiosInstance.defaults.headers.cookie = stringifyCookies(cookies)
    }
    return axiosInstance
}
