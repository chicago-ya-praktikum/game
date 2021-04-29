import {getOneTopic} from '@apiDb'
import {UserInfoEmpty} from '@state/reducers/user/state'

export const fillTopic = async (userInfo: UserInfoEmpty, id: number) => {
    if (!userInfo) throw Error('User is undefined')
    if (!id) throw Error('Id topic is undefined')

    const res = await getOneTopic(userInfo, id)

    if (res.status !== 200) {
        window.alertShow('error', res.statusText)
        throw Error(res.statusText)
    }

    return res.data
}
