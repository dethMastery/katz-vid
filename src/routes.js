const express = require('express')
const router = express.Router()

const layout = require('./statics/_layout')
const index = require('./statics/index')

router.get('/', (req, res) => {
	layout(res, index)
})

// ============================================================

module.exports = router
