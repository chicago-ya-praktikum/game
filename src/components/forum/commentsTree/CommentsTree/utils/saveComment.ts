import {UserInfoEmpty} from '@state/reducers/user/state'
import {postCreateComment} from '@apiDb'

export const saveComment = async (userInfo: UserInfoEmpty,
    comment: {
        recordId: number
        parentId: number
        content: string
    }): Promise<boolean> => {
    if (!userInfo) return false
    console.log('comment', comment)
    const res = await postCreateComment(userInfo, comment)
    if (res.status === 201) {
        return true
    }
    return false
}
