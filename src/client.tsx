import React from 'react'
import ReactDOM from 'react-dom'
import './styles/style.sass'
import { ConnectedRouter } from 'connected-react-router';
import { Provider as ReduxProvider } from 'react-redux';
import 'babel-polyfill';
import {App} from './components/App/App'
import { configureStore } from './store/store';

declare global {
    interface Window {
        __INITIAL_STATE__: any;
    }
}

const initialState = window.__INITIAL_STATE__;
const { store, history } = configureStore(initialState);

ReactDOM.hydrate(
    <ReduxProvider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </ReduxProvider>,
    document.getElementById('root')
)
