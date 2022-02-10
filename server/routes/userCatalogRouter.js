const Router = require('express')
const router = new Router()
const { getAll, getOne } = require('../controllers/userProductController')
const filterMiddleware = require('../middleware/filterMiddleware')
const paginationMiddleware = require('../middleware/paginationMiddleware')

router.get('/one-product/:slug', getOne)
router.get('/*', paginationMiddleware(10), filterMiddleware, getAll)

module.exports = router