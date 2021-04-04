import path from 'path'
import express from 'express'
// eslint-disable-next-line import/no-extraneous-dependencies
import compression from 'compression'
import '@babel/polyfill'
import cookieParser from 'cookie-parser'
import {serverRenderMiddleware} from './server-render-middleware'

const app = express()

// I recommend use it only for development
// In production env you can use Nginx or CDN
app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')))
    // .use(express.static(path.resolve(__dirname, '../static')))
    .use(cookieParser())

app.get('/*', serverRenderMiddleware)

export {app}
