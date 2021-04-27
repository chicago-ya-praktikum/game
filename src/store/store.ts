import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {reducers} from './reducers'
import {State} from '../types/index'
import {initialState as user} from './reducers/user/state'
import {defaultReducer as auth} from './reducers/authReducer'
import {defaultState as theme} from './reducers/gameThemeReducer'

export const getInitialState = (): State => ({
    user,
    auth,
    theme
})

export function configureStore(initialState: State) {
    const history = null
    const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))

    return {history, store}
}
