const express = require('express')

const app = express()

app.use(express.static(`${__dirname}/dist`))

app.use('/', express.static(`${__dirname}/dist/index.html`))
app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Application is started on localhost:', port)
})
