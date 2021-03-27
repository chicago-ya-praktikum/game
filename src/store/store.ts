import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {createBrowserHistory, createMemoryHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'
import {isServer} from 'src/utils/isServer';
import {reducers as createRootReducer} from './reducers'

// export function configureStore(preloadedState: {}) {
//     return createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware(thunk)))
// }

export function configureStore(preloadedState: {} | undefined, url = '/') {
    const history = isServer
        ? createMemoryHistory({initialEntries: [url]})
        : createBrowserHistory();

    const middlewares = [routerMiddleware(history), thunk];

    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeWithDevTools(applyMiddleware(...middlewares))
    ) as AppStore;

    return {store, history};
}

export const store = configureStore({})
