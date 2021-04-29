import {postUserReactions as apiPostUserReactions} from '@apiDb'
import {UserInfoEmpty} from '@state/reducers/user/state'

export const postUserReactions = async (
    userInfo: UserInfoEmpty,
    data: {
        reactionId: number,
        recordId: number
    }
) => {
    if (!userInfo) throw Error('User is undefined')

    const res = await apiPostUserReactions(userInfo, {
        userId: userInfo.id,
        reactionId: data.reactionId,
        recordId: data.recordId
    })

    if (res.status !== 200 && res.status !== 201) {
        window.alertShow('error', res.statusText)
        throw Error(res.statusText)
    }

    return res.data
}
