import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {reducers} from '../reducers'

export function configureStore(preloadedState: {}) {
    return createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware(thunk)))
}

export const store = configureStore({})
