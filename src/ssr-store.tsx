// import url from 'url'
// import path from 'path'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {Request, Response} from 'express'
// eslint-disable-next-line import/no-extraneous-dependencies
import {StaticRouter} from 'react-router-dom'
import {StaticRouterContext} from 'react-router'
import {Provider as ReduxProvider} from 'react-redux'
import {App} from './components/App/App'
// import Helmet, {HelmetData} from 'react-helmet'
// import {ChunkExtractor} from '@loadable/server'
// import { App } from './components/App/App';
// import {configureStore} from '../store/store'
// import rootSaga from './store/rootSaga';
import {getInitialState, configureStore} from './store/store'
// import {getUserData} from './store/reducers/user/thunks'
// import routes from './routes';

const getHtml = (reactHtml: string, reduxState = {}) => `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Sokoban</title>
        </head>
        <body>
            <div id="mount">${reactHtml}</div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
            </script>
            <script src="client.js"></script>
        </body>
        </html>
    `

export const serverRenderMiddleware = (req: Request, res: Response) => {
    const location = req.url
    const context: StaticRouterContext = {}

    const {store} = configureStore(getInitialState())

    console.log('Cookies: ', req.cookies)

    const jsx = (
        <ReduxProvider store={store}>
            <StaticRouter context={context} location={location}>
                <App/>
            </StaticRouter>
        </ReduxProvider>
    )

    const reactHtml = renderToString(jsx)

    if (context.url) {
        res.redirect(context.url)
        return
    }

    res.status(context.statusCode || 200).send(
        getHtml(reactHtml, store.getState())
    )
}
