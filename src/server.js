const express = require('express')
const dotenv = require('dotenv')
const routes = require('./routes')

dotenv.config()

const app = express()

app.use(routes)

const port = process.env.PORT || 3001

app.listen(port, () => {
	console.log(`Server start @ http://localhost:${port}`)
})

module.exports = app