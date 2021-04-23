import {postCreateTopic, postUpdateTopic} from '../../../../services/API/db/index'
import {UserInfoEmpty} from '../../../../store/reducers/user/state'
import {preSetField} from '../reducer/preActions'
import {Fields} from '../reducer/types'

export const saveTopic = async (fields: Fields, userInfo: UserInfoEmpty, dispatch: any) => {
    if (!userInfo) return
    const id = Number(fields.topicId.val)
    const title = fields.topicTitle.val
    const content = fields.topicContent.val

    if (id) {
        const res = await postUpdateTopic(userInfo, {title, content, id})
        if (res.status === 200) window.alertShow('success', 'Topic updated')
        else window.alertShow('error', res.statusText)
    } else {
        const res = await postCreateTopic(userInfo, {title, content})
        if (res.status === 201) {
            dispatch(preSetField(fields, fields.topicId.id, res.data.id))
            window.alertShow('success', 'Topic created')
        } else window.alertShow('error', res.statusText)
    }
}
