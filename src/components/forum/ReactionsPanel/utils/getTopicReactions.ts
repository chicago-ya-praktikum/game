import {getTopicReactions as apiGetTopicReactions} from '@apiDb'
import {UserInfoEmpty} from '@state/reducers/user/state'

export const getTopicReactions = async (userInfo: UserInfoEmpty, topicId: number) => {
    if (!userInfo) throw Error('User is undefined')

    const res = await apiGetTopicReactions(userInfo, topicId)

    if (res.status !== 200 && res.status !== 201) {
        window.alertShow('error', res.statusText)
        throw Error(res.statusText)
    }

    return res.data
}
