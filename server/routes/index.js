const Router = require('express')
const router = new Router()
const authRouter = require('./admin/authRouter')
const administratorsRouter = require('./admin/administratorsRouter')
const tagTypesRouter = require('./admin/tagTypesRouter')
const shopTagTypeRouter = require('./shop/shopTagTypeRouter')
const shopTagRouter = require('./shop/shopTagRouter')
const tagsRouter = require('./admin/tagsRouter')
const productsRouter = require('./admin/productsRouter')
const shopCatalogRouter = require('./shop/shopCatalogRouter')
const ordersRouter = require('./admin/ordersRouter')

router.use('/admin', authRouter)
router.use('/administrators', administratorsRouter)
router.use('/tag-types', tagTypesRouter)
router.use('/tags', tagsRouter)
router.use('/products', productsRouter)
router.use('/orders', ordersRouter)

router.use('/catalog', shopCatalogRouter)
// router.use('/tags-tagtypes', shopTagTypeRouter)
// router.use('/shop-tags', shopTagRouter)

// router.use('/checkout')

module.exports = router