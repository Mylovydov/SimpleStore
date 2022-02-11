const Router = require('express')
const router = new Router()
const { getAll, getOne } = require('../../controllers/shop/shopProductController')
const filterMiddleware = require('../../middleware/filterMiddleware')
const paginationMiddleware = require('../../middleware/paginationMiddleware')

router.get('/one-product/:slug', getOne)
router.get('/*', paginationMiddleware(), filterMiddleware, getAll)

module.exports = router