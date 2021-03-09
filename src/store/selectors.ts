import {createSelector} from 'reselect'
import {RootState} from './reducers'
import {State as UserState} from './reducers/user/state'

const userSelector = (state: RootState) => state.userAsync

export const userInfoSelector = createSelector(
    userSelector,
    (userAsync: UserState) => userAsync.info
)

export const userAvatarSelector = createSelector(
    userSelector,
    (userAsync: UserState) => userAsync.info?.avatar
)

export const userIdSelector = createSelector(
    userSelector,
    (userAsync: UserState) => userAsync.id
)

export const userLoginSelector = createSelector(
    userSelector,
    (userAsync: UserState) => userAsync.info?.login
)
