const express = require('express')

const app = express()

// app.use(express.static(`${__dirname}/dist`))

// app.use('/', express.static(`${__dirname}/dist/index.html`))
app.get('/*', (req, res) => {
    const jsx = (<App />)
    const reactDom = renderToString(jsx)
    res.send(htmlTemplate(reactDom))
})

app.listen(process.env.PORT || 3000)
