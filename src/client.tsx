import React from 'react'
import ReactDOM from 'react-dom'
import './styles/style.sass'
import {ConnectedRouter} from 'connected-react-router';
import {Provider as ReduxProvider} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core';
import {configureStore} from './store/store';
import theme from './themes/default';
import {App} from './components/App/App'

declare global {
    interface Window {
        __INITIAL_STATE__: any;
    }
}

const initialState = window.__INITIAL_STATE__;
const {store, history} = configureStore(initialState);

ReactDOM.hydrate(
    <ReduxProvider store={store}>
        <ConnectedRouter history={history}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </ConnectedRouter>
    </ReduxProvider>,
    document.getElementById('root')
)
