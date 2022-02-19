const Router = require('express')
const router = new Router()
const authRouter = require('./admin/authRouter')
const administratorsRouter = require('./admin/administratorsRouter')
const tagTypesRouter = require('./admin/tagTypesRouter')
const tagsRouter = require('./admin/tagsRouter')
const productsRouter = require('./admin/productsRouter')
const shopCatalogRouter = require('./shop/shopCatalogRouter')
const ordersRouter = require('./admin/ordersRouter')
const checkoutRouter = require('./shop/checkoutRouter')

router.use('/auth', authRouter)
router.use('/administrators', administratorsRouter)
router.use('/tag-types', tagTypesRouter)
router.use('/tags', tagsRouter)
router.use('/products', productsRouter)
router.use('/orders', ordersRouter)

router.use('/catalog', shopCatalogRouter)
router.use('/checkout', checkoutRouter)

module.exports = router