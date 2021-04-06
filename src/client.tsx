import React from 'react'
import ReactDOM from 'react-dom'
import './styles/style.sass'
import {Provider as ReduxProvider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {App} from './components/App/App'
import {configureStore} from './store/store'
import {State} from './types/index'
import '@babel/polyfill'
import {CookiesProvider} from './services/cookie'

const {store} = configureStore(window.__INITIAL_STATE__)

declare global {
    interface Window {
        __INITIAL_STATE__: State
    }
}

ReactDOM.hydrate(
    <ReduxProvider store={store}>
        <CookiesProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </CookiesProvider>
    </ReduxProvider>,
    document.getElementById('mount')
)
