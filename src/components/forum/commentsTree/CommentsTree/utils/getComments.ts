import {UserInfoEmpty} from '@state/reducers/user/state'
import {getComments as getCommentsApi} from '@apiDb'

export const getComments = async (userInfo: UserInfoEmpty, recordId: number) => {
    if (!userInfo) return false

    const res = await getCommentsApi(userInfo, recordId)
    if (res.status === 200) {
        return res.data
    }
    return false
}
