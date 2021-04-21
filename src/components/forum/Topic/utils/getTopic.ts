import {postCreateTopic, postUpdateTopic} from '../../../../services/API/db/index'
import {UserInfo} from '../../../../store/reducers/user/state'
import {setField} from '../reducer/actions'
import {Fields} from '../reducer/state'

export const getTopic = (id: number, userInfo: UserInfo, dispatch: any) => {

    // if (id) {
    //     postUpdateTopic(userInfo, {title, content, id}).then(
    //         (res) => {
    //             if (res.status === 200) {
    //                 window.alertShow('success', 'Topic updated')
    //             } else {
    //                 window.alertShow('error', res.statusText)
    //             }
    //         }
    //     )
    // } else {
    //     postCreateTopic(userInfo, {title, content}).then(
    //         (res) => {
    //             if (res.status === 201) {
    //                 dispatch(setField(fields, fields.topicId.id, res.data.id))
    //                 window.alertShow('success', 'Topic created')
    //             } else {
    //                 window.alertShow('error', res.statusText)
    //             }
    //         }
    //     )
    // }
}
