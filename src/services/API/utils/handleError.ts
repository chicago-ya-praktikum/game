import {AxiosResponse} from 'axios'

export const handleError = (err: any): AxiosResponse => {
    // eslint-disable-next-line no-console
    if (IS_SERVER) console.log('err', err)

    let status = 400
    let statusText = 'Something went wrong'
    if (err.response) {
        status = err.response.status
        statusText = err.response.data
    }

    return JSON.parse(`{"status": ${status}, "statusText": "${statusText}"}`)
}
