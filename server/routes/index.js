const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')
const checkAdminExistsMiddleware = require('../middleware/checkAdminExistsMiddleware')
const administratorsRouter = require('./administratorsRouter')
const tagTypesRouter = require('./tagTypesRouter')
const userTagTypeRouter = require('./userTagTypeRouter')
const tagsRouter = require('./tagsRouter')
const productsRouter = require('./productsRouter')
const userCatalogRouter = require('./userCatalogRouter')
const ordersRouter = require('./ordersRouter')

router.use('/admin', authRouter)
router.use('/administrators', administratorsRouter)
router.use('/tag-types', tagTypesRouter)
router.use('/tags', tagsRouter)
router.use('/products', productsRouter)
router.use('/orders', ordersRouter)

router.use('/catalog', userCatalogRouter)
// router.use('/types', userTagTypeRouter)
// router.use('/checkout')

module.exports = router