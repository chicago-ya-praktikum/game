import {createSelector} from 'reselect'
import {RootState} from './reducers'
import {State as UserState} from './reducers/user/state'

const userSelector = (state: RootState) => state.user

export const userInfoSelector = createSelector(
    userSelector,
    (user: UserState) => user.info
)

export const userAvatarSelector = createSelector(
    userSelector,
    (user: UserState) => user.info?.avatar
)

export const userIdSelector = createSelector(
    userSelector,
    (user: UserState) => user.id
)

export const userLoginSelector = createSelector(
    userSelector,
    (user: UserState) => user.info?.login
)
