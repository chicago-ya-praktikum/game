import {getOneTopic} from '../../../../services/API/db/index'
import {UserInfoEmpty} from '../../../../store/reducers/user/state'
import {fillFields, setReadOnly} from '../reducer/actions'
import {Fields} from '../reducer/types'

export const fillTopic = async (
    data: {
        fields: Fields,
        id: number,
        userInfo: UserInfoEmpty,
        dispatch: any
    }
) => {
    const {
        fields, id, userInfo, dispatch
    } = data

    if (!id || !userInfo) return

    const res = await getOneTopic(userInfo, id)

    if (res.status === 200) {
        const {record, readOnly} = res.data
        fields.topicId.val = record.id
        fields.topicTitle.val = record.title
        fields.topicContent.val = record.content
        dispatch(fillFields(fields))
        dispatch(setReadOnly(readOnly))
    } else window.alertShow('error', res.statusText)
}
