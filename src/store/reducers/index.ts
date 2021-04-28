import {combineReducers} from 'redux'
// eslint-disable-next-line import/no-cycle
import {userReducer} from './user/reducer'
import {authReducer} from './authReducer'
import {gameThemeReducer} from './gameThemeReducer'
import {themeReducer} from './themeReducer'

// В этом файле будем объединять все редьюсеры в один
export const reducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    theme: gameThemeReducer,
    appTheme: themeReducer
})

export type RootState = ReturnType<typeof reducers>
