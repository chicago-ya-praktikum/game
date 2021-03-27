import {combineReducers} from 'redux'
// eslint-disable-next-line import/no-cycle
import {connectRouter} from 'connected-react-router';
import {userReducer} from './user/reducer'
import {authReducer} from './auth/authReducer'
import {themeReducer} from './gameThemeReduser'

// В этом файле будем объединять все редьюсеры в один
export const reducers = (history: any) => combineReducers({
    auth: authReducer,
    user: userReducer,
    theme: themeReducer,
    router: connectRouter(history)
})

export type RootState = ReturnType<typeof reducers>
