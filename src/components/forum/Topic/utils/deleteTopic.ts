import {deleteTopic as apiDeleteTopic} from '@apiDb'
import {UserInfoEmpty} from '@state/reducers/user/state'
import {Fields} from '../reducer/types'

export const deleteTopic = async (fields: Fields, userInfo: UserInfoEmpty) => {
    if (!userInfo) throw Error('User is undefined')
    const id = Number(fields.topicId.val)
    if (!userInfo) throw Error('ID topic is undefined')
    const res = await apiDeleteTopic(userInfo, id)
    if (res.status === 200) {
        window.alertShow('success', 'Topic deleted')
        return true
    }
    window.alertShow('error', res.statusText)
    throw Error('Something went wrong')
}
