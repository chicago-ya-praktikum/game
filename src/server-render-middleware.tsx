import React from 'react'
import { renderToString } from 'react-dom/server'
import { Request, Response } from 'express'
import { App } from './components/App/App'
import { StaticRouter } from 'react-router-dom'
import { StaticRouterContext } from 'react-router'

const HTMLTemplate = (reactDOM: string) => (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <div id="root">${reactDOM}</div>
        <script src="bundle.js"></script>
    </body>
    </html>
`)

export const serverRenderMiddleware = (req: Request, res: Response) => {

    const location = req.url
    const context: StaticRouterContext = {};

    if (context.url) {
        res.redirect(context.url);
        return;
    }

    const jsx = (
        <StaticRouter context={context} location={location}>
            <App />
        </StaticRouter>
    );
    const reactDom = renderToString(jsx)
    res
        .status(context.statusCode || 200)
        .send(HTMLTemplate(reactDom))
}