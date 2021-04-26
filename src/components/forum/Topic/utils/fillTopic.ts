import {getOneTopic} from '../../../../services/API/db/index'
import {UserInfoEmpty} from '../../../../store/reducers/user/state'

export const fillTopic = async (userInfo: UserInfoEmpty, id: number) => {
    if (!id || !userInfo) return null

    const res = await getOneTopic(userInfo, id)

    if (res.status !== 200) {
        window.alertShow('error', res.statusText)
        return null
    }

    return res.data
}
