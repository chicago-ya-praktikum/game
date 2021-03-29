import React from 'react'
import {renderToString} from 'react-dom/server'
import {Request, Response} from 'express'
import {StaticRouter} from 'react-router-dom'
import {StaticRouterContext} from 'react-router'
import {Provider as ReduxProvider} from 'react-redux'
import {ServerStyleSheets, ThemeProvider} from '@material-ui/core'
import {Store} from 'redux'
import Helmet, {HelmetData} from 'react-helmet'
import theme from './themes/default'
import {getInitialState} from './store/getInitialState'
import {App} from './components/App/App'
import {configureStore} from './store/store'

const helmetData = Helmet.renderStatic()

const HTMLTemplate = (reactDOM: string, reduxState: any = {}, helmetData: HelmetData, css: string) => (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <style id="jss-server-side">${css}</style>
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

    const sheets = new ServerStyleSheets();

    if (context.url) {
        res.redirect(context.url);
        return;
    }

    const jsx = (
        <ReduxProvider store={store}>
            <StaticRouter context={context} location={location}>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </StaticRouter>
        </ReduxProvider>
    );
    const reactDom = renderToString(jsx)
    const reduxState = store.getState()

    const css = sheets.toString();

    res
        .status(context.statusCode || 200)
        .send(HTMLTemplate(reactDom, reduxState, helmetData, css))
}
