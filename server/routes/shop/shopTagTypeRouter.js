const Router = require('express')
const router = new Router()
const { getAll } = require('../../controllers/shop/shopTagTypesController')

router.get('/', getAll)

module.exports = router