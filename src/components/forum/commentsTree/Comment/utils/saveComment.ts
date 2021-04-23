import {UserInfoEmpty} from '../../../../../store/reducers/user/state'

export const saveComment = async (userInfo: UserInfoEmpty) => {
    if (!userInfo) return

    // if (id) {
    //     const res = await postUpdateTopic(userInfo, {title, content, id})
    //     if (res.status === 200) window.alertShow('success', 'Topic updated')
    //     else window.alertShow('error', res.statusText)
    // } else {
    //     const res = await postCreateTopic(userInfo, {title, content})
    //     if (res.status === 201) {
    //         dispatch(preSetField(fields, fields.topicId.id, res.data.id))
    //         window.alertShow('success', 'Topic created')
    //     } else window.alertShow('error', res.statusText)
    // }
}
