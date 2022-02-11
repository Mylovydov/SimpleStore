const Router = require('express')
const router = new Router()
const { getAll } = require('../../controllers/shop/shopTagTypesController')
const filterMiddleware = require('../../middleware/filterMiddleware')

router.get('/*', filterMiddleware, getAll)

module.exports = router