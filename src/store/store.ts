import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {reducers} from '../reducers'

export function configureStore(preloadedState: {}) {
    return createStore(reducers, preloadedState, applyMiddleware(thunk))
}

export const store = configureStore({})
