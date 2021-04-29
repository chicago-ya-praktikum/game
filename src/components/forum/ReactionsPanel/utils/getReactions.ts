import {getAllReactions} from '@apiDb'
import {UserInfoEmpty} from '@state/reducers/user/state'

export const getReactions = async (userInfo: UserInfoEmpty) => {
    if (!userInfo) throw Error('User is undefined')

    const res = await getAllReactions(userInfo)

    if (res.status !== 200) {
        window.alertShow('error', res.statusText)
        throw Error(res.statusText)
    }

    return res.data
}
