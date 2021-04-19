import {Request, Response} from 'express'
import {apiPostYandexOauth} from '../services/API/index'

export const oauth = async (req: Request, res: Response, next: any) => {
    if (req.query.code) {
        const resApi = await apiPostYandexOauth(String(req.query.code))
        if (resApi.data !== 'OK') {
            if (IS_CLIENT) {
                window.alertShow('error', 'Something went wrong')
            } else {
                // eslint-disable-next-line no-console
                console.log('Oauth: something went wrong')
            }
        }
    }
    next()
}
