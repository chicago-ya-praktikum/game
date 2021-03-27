import path from 'path'
import express from 'express'
import compression from 'compression'
import {serverRenderMiddleware} from './server-render-middleware'

// const express = require('express')

const app = express()

app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')))
    .use(express.static(path.resolve(__dirname, '../www')))

app.get('./*', serverRenderMiddleware)

export {app}