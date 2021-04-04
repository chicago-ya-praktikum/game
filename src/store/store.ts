import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {reducers} from './reducers'
import {State} from '../types/index'
import {initialState as user} from './reducers/user/state'
import {defaultReducer as auth} from './reducers/authReducer'
import {defaultState as theme} from './reducers/themeReducer'

// export function configureStore(preloadedState: {}) {
//     return createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware(thunk)))
// }

// export const store = configureStore({})

export const getInitialState = (): State => ({
    user,
    auth,
    theme
})

export function configureStore(initialState: State) {
    const history = null
    // if (IS_CLIENT) {
    //     console.log('initialState', initialState)
    // }
    // isServer
    // ? createMemoryHistory({ initialEntries: [url] })
    // : createBrowserHistory();

    const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))

    return {history, store}
}

// export const configureStore = (initialState: State, url = '/') => {
//     const history = isServer
//         ? createMemoryHistory({ initialEntries: [url] })
//         : createBrowserHistory();

//     const sagaMiddleware = createSagaMiddleware();
//     const composeEnhancers = getComposeEnhancers();
//     const middlewares = [routerMiddleware(history), sagaMiddleware];

//     const store = createStore(
//         createRootReducer(history),
//         initialState,
//         composeEnhancers(applyMiddleware(...middlewares))
//     ) as AppStore;

//     // Add methods to use in the server
//     store.runSaga = sagaMiddleware.run;
//     store.close = () => store.dispatch(END);

//     if (!isServer) {
//         sagaMiddleware.run(rootSaga);
//     }

//     return { store, history };
// }
