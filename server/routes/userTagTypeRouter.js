const Router = require('express')
const router = new Router()
const { getAll } = require('../controllers/userTagTypesController')

router.get('/', getAll)

module.exports = router