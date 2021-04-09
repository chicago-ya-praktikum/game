import path from 'path'
import express from 'express'
// eslint-disable-next-line import/no-extraneous-dependencies
import compression from 'compression'
import '@babel/polyfill'
import cookieParser from 'cookie-parser'
import {renderMiddleware} from './ssrMiddleware/renderMiddleware'
import {oauthMiddleware} from './ssrMiddleware/oauthMiddleware'
import {faviconMiddleware} from './ssrMiddleware/faviconMiddleware'

const app = express()

// I recommend use it only for development
// In production env you can use Nginx or CDN
app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')))
    .use(cookieParser())

app.get('/favicon.ico', faviconMiddleware)
app.get('/:code', oauthMiddleware)
app.get('/*', renderMiddleware)

export {app}
