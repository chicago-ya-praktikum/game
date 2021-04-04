import React from 'react'
import ReactDOM from 'react-dom'
import '../src/styles/style.sass'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {App} from '../src/components/App/App'
import {configureStore, getInitialState} from '../src/store/store'

const {store} = configureStore(getInitialState())

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
