import React from 'react'
import { renderToString } from 'react-dom/server'
import { Request, Response } from 'express'
import { App } from './components/App/App'
import { StaticRouter } from 'react-router-dom'
import { StaticRouterContext } from 'react-router'
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from './store/store'
import { getInitialState } from './store/getInitialState'
import { Store } from 'redux'
import Helmet, { HelmetData } from 'react-helmet'

const helmetData = Helmet.renderStatic()

const HTMLTemplate = (reactDOM: string, reduxState: any = {}, helmetData: HelmetData) => (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        ${helmetData.title.toString()}
        ${helmetData.meta.toString()}
    </head>
    <body>
        <div id="root">${reactDOM}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
        </script>
        <script src="bundle.js"></script>
    </body>
    </html>
`)

export const serverRenderMiddleware = (req: Request, res: Response) => {

    const location = req.url
    const store = configureStore(getInitialState(location), location) as unknown as Store;
    const context: StaticRouterContext = {};


    if (context.url) {
        res.redirect(context.url);
        return;
    }

    const jsx = (
        <ReduxProvider store={store}>
            <StaticRouter context={context} location={location}>
                <App />
            </StaticRouter>
        </ReduxProvider>
    );
    const reactDom = renderToString(jsx)
    const reduxState = store.getState()

    res
        .status(context.statusCode || 200)
        .send(HTMLTemplate(reactDom, reduxState, helmetData))
}