import {deleteTopic as apiDeleteTopic} from '../../../../services/API/db/index'
import {UserInfoEmpty} from '../../../../store/reducers/user/state'
import {Fields} from '../reducer/types'

export const deleteTopic = async (fields: Fields, userInfo: UserInfoEmpty) => {
    if (!userInfo) return false
    const id = Number(fields.topicId.val)
    if (!id) return false
    const res = await apiDeleteTopic(userInfo, id)
    if (res.status === 200) {
        window.alertShow('success', 'Topic deleted')
        return true
    }
    window.alertShow('error', res.statusText)
    return false
}
