import React from 'react'
import {renderToString} from 'react-dom/server'
import {Request, Response} from 'express'
import {App} from './components/App/App'


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
    console.log(req)
    const jsx = (<App/>);
    const reactDom = renderToString(jsx)
    res.send(HTMLTemplate(reactDom))
}