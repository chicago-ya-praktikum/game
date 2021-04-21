import {postCreateTopic, postUpdateTopic} from '../../../../services/API/db/index'
import {UserInfo} from '../../../../store/reducers/user/state'
import {setField} from '../reducer/actions'
import {Fields} from '../reducer/state'

export const saveTopic = (fields: Fields, userInfo: UserInfo, dispatch: any) => {
    const id = Number(fields.topicId.val)
    const title = fields.topicTitle.val
    const content = fields.topicContent.val

    if (id) {
        postUpdateTopic(userInfo, {title, content, id}).then(
            (res) => {
                if (res.status === 200) {
                    window.alertShow('success', 'Topic updated')
                } else {
                    window.alertShow('error', res.statusText)
                }
            }
        )
    } else {
        postCreateTopic(userInfo, {title, content}).then(
            (res) => {
                if (res.status === 201) {
                    dispatch(setField(fields, fields.topicId.id, res.data.id))
                    window.alertShow('success', 'Topic created')
                } else {
                    window.alertShow('error', res.statusText)
                }
            }
        )
    }
}
