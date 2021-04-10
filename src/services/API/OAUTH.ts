import {AxiosResponse} from 'axios'
import {URL_OAUTH, API_ROOT} from '../../contstants/index'
import {YaCookie} from './types'
import {getAxios} from './utils/getAxios'

export const apiGetYandexServiceId = async (
    cookies: YaCookie | null = null
): Promise<AxiosResponse> => {
    const axios = getAxios(cookies)
    const {GET_OAUTH_YANDEX_SERVICE_ID} = URL_OAUTH
    try {
        const res = await axios.get(API_ROOT + GET_OAUTH_YANDEX_SERVICE_ID)
        return res
    } catch (err) {
        return JSON.parse('{"err": "Wrong request"}')
    }
}

export const apiPostYandexOauth = async (code: string): Promise<AxiosResponse> => {
    const axios = getAxios()
    const {POST_OAUTH_YANDEX} = URL_OAUTH
    try {
        const res = await axios.post(API_ROOT + POST_OAUTH_YANDEX, {
            code
            // redirect_uri: 'https://local.ya-praktikum.tech:5000'
        })
        return res
    } catch (err) {
        return JSON.parse(`{"err": "${err.message}"}`)
    }
}
