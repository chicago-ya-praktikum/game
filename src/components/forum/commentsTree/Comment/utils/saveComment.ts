import {UserInfoEmpty} from '../../../../../store/reducers/user/state'

export const saveComment = async (userInfo: UserInfoEmpty) => {
    if (!userInfo) return
    // eslint-disable-next-line no-console
    console.log('saveComment')
}
