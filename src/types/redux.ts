import {State as UserState} from '../store/reducers/user/state'
import {AuthReducer as AuthState} from '../store/reducers/authReducer'
import {GameTheme} from '../GameCore/enums/GameTheme'

export type State = {
    readonly user: UserState
    readonly auth: AuthState
    readonly theme: GameTheme
}
