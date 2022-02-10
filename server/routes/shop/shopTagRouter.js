const Router = require('express')
const router = new Router()
const { getAll } = require('../../controllers/shop/shopTagsController')

router.get('/', getAll)

module.exports = router