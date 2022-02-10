const Router = require('express')
const router = new Router()
const { getAll } = require('../controllers/userTagsController')

router.get('/', getAll)

module.exports = router