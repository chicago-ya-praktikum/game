import {getOneTopic} from '../../../../services/API/db/index'
import {UserInfo} from '../../../../store/reducers/user/state'
import {fillFields} from '../reducer/actions'
import {Fields} from '../reducer/types'

export const fillTopic = async (
    data: {
        fields: Fields,
        id: number,
        userInfo: UserInfo,
        dispatch: any
    }
) => {
    const {
        fields, id, userInfo, dispatch
    } = data

    if (!id) return

    const res = await getOneTopic(userInfo, id)

    if (res.status === 200) {
        fields.topicId.val = res.data.id
        fields.topicTitle.val = res.data.title
        fields.topicContent.val = res.data.content
        dispatch(fillFields(fields))
    } else window.alertShow('error', res.statusText)
}
