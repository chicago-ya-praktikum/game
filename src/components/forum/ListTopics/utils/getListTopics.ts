import {UserInfoEmpty} from '@state/reducers/user/state'
import {getTopics} from '@apiDb'

export const getListTopics = async (userInfo: UserInfoEmpty) => {
    if (!userInfo) throw Error('User is undefined')
    const res = await getTopics(userInfo)
    if (res.status === 200) {
        return res.data
    }
    throw Error('Something went wrong')
}
