import {UserInfo} from '../../../../store/reducers/user/state'
import {getTopics} from '../../../../services/API/db/index'

export const getListTopics = async (userInfo: UserInfo | undefined) => {
    if (!userInfo) return []
    const res = await getTopics(userInfo)
    if (res.status === 200) {
        return res.data
    }
    window.alertShow('error', res.data.message)
    return []
}
