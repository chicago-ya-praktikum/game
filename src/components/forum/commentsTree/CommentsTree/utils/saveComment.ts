import {UserInfoEmpty} from '@state/reducers/user/state'
import {postCreateComment} from '@apiDb'

export const saveComment = async (userInfo: UserInfoEmpty,
    comment: {
        recordId: number
        parentId: number
        content: string
    }): Promise<boolean> => {
    if (!userInfo) throw Error('User is undefined')
    const res = await postCreateComment(userInfo, comment)
    if (res.status === 201) {
        return true
    }
    throw Error('Something went wrong')
}
