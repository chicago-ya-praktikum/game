const fs = require('fs')
const path = require('path')
const https = require('https')
// eslint-disable-next-line import/no-unresolved
const {app} = require('../dist/server.js')

const cert = fs.readFileSync(path.join(__dirname, '..', 'SSR', 'cert', 'cert.pem'))
const key = fs.readFileSync(path.join(__dirname, '..', 'SSR', 'cert', 'key.pem'))

const server = https.createServer({key, cert}, app)

const port = process.env.PORT || 4000

server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Application is started on localhost:', port)
})

// const fs = require('fs')
// const path = require('path')
// // eslint-disable-next-line import/no-unresolved
// const {app} = require('../dist/server.js')

// const port = process.env.PORT || 4000

// app.listen(port, () => {
//     // eslint-disable-next-line no-console
//     console.log('Application is started on localhost:', port)
// })
