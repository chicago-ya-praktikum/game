import {combineReducers} from 'redux'

import {userReducer} from './userReducer'
import {countReducer} from './countReduser'

// В этом файле будем объединять все редьюсеры в один
export const reducers = combineReducers({
    user: userReducer,
    count: countReducer
})

export type RootState = ReturnType<typeof reducers>
