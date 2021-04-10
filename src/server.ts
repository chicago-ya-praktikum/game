import path from 'path'
import express from 'express'
// eslint-disable-next-line import/no-extraneous-dependencies
import compression from 'compression'
import '@babel/polyfill'
import cookieParser from 'cookie-parser'
import {render} from './ssrMiddleware/render'
import {oauth} from './ssrMiddleware/oauth'
import {favicon} from './ssrMiddleware/favicon'

const app = express()
// const router = express.Router()

// I recommend use it only for development
// In production env you can use Nginx or CDN
app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')))
    .use(cookieParser())

app.get('/favicon.ico', favicon)
app.get('/*', oauth)
app.get('/*', render)
// app.use('/', router)

export {app}
