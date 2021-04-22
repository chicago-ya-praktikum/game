import {AxiosInstance} from 'axios'
import {UserInfo} from '../../../../store/reducers/user/state'
import {getAxiosInstance as getAxiosInstanceMain} from '../../utils'

export const getAxiosInstance = (userInfo: UserInfo): AxiosInstance => {
    const axios = getAxiosInstanceMain()
    axios.defaults.headers.authorization = userInfo.id
    return axios
}
