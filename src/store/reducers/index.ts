import {combineReducers} from 'redux'
import {userReducer} from './user/reducer'
import {themeReducer} from '../../reducers/gameThemeReduser'

// В этом файле будем объединять все редьюсеры в один
export const reducers = combineReducers({
    user: userReducer,
    theme: themeReducer
})

export type RootState = ReturnType<typeof reducers>
