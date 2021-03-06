import {combineReducers} from 'redux'
import {userReducer} from './user/reducer'

// В этом файле будем объединять все редьюсеры в один
export const reducers = combineReducers({
    user: userReducer
})

export type RootState = ReturnType<typeof reducers>
