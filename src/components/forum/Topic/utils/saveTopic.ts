import {postCreateTopic, putUpdateTopic} from '@apiDb'
import {UserInfoEmpty} from '@state/reducers/user/state'
import {preSetField} from '../reducer/preActions'
import {Fields} from '../reducer/types'

export const saveTopic = async (fields: Fields, userInfo: UserInfoEmpty, dispatch: any) => {
    if (!userInfo) throw Error('User is undefined')
    const id = Number(fields.topicId.val)
    const title = fields.topicTitle.val
    const content = fields.topicContent.val

    if (id) {
        const res = await putUpdateTopic(userInfo, {title, content, id})
        if (res.status === 200) window.alertShow('success', 'Topic updated')
        else {
            window.alertShow('error', res.statusText)
            throw Error('Something went wrong')
        }
    } else {
        const res = await postCreateTopic(userInfo, {title, content})
        if (res.status === 201) {
            dispatch(preSetField(fields, fields.topicId.id, res.data.id))
            dispatch(preSetField(fields, fields.topicAuthor.id, userInfo.display_name))
            window.alertShow('success', 'Topic created')
        } else {
            window.alertShow('error', res.statusText)
            throw Error('Something went wrong')
        }
    }
}
