const Router = require('express')
const router = new Router()
const {checkout} = require('../../controllers/shop/checkoutController')

router.post('/', checkout)

module.exports = router