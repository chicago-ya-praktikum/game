const express = require('express')

const app = express()

const port = 4000

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Application is started on localhost:', port)
})
