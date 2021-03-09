import {combineReducers} from 'redux'
import {userReducer as userReducerAsync} from './user/reducer'
import {userReducer} from '../../reducers/userReducer'
import {themeReducer} from '../../reducers/gameThemeReduser'

// В этом файле будем объединять все редьюсеры в один
export const reducers = combineReducers({
    user: userReducer,
    userAsync: userReducerAsync,
    theme: themeReducer
})

export type RootState = ReturnType<typeof reducers>
