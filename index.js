const express = require('express')
const {app} = require('./dist/server')

app.listen(process.env.PORT || 3002)
