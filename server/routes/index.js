const Router = require('express')
const router = new Router()
const authRouter = require('./admin/authRouter')
const administratorsRouter = require('./admin/administratorsRouter')
const tagTypesRouter = require('./admin/tagTypesRouter')
const userTagTypeRouter = require('./shop/shopTagTypeRouter')
const userTagRouter = require('./shop/shopTagRouter')
const tagsRouter = require('./admin/tagsRouter')
const productsRouter = require('./admin/productsRouter')
const userCatalogRouter = require('./shop/shopCatalogRouter')
const ordersRouter = require('./admin/ordersRouter')

router.use('/admin', authRouter)
router.use('/administrators', administratorsRouter)
router.use('/tag-types', tagTypesRouter)
router.use('/tags', tagsRouter)
router.use('/products', productsRouter)
router.use('/orders', ordersRouter)

router.use('/catalog', userCatalogRouter)
router.use('/shop-types', userTagTypeRouter)
router.use('/shop-tags', userTagRouter)

// router.use('/checkout')

module.exports = router