const Router = require('express')
const router = new Router()
const { create, update, remove, getOne, getAll } = require('../../controllers/admin/productController')
const authMiddleware = require('../../middleware/authMiddleware')
const paginationMiddleware = require('../../middleware/paginationMiddleware')

router.post('/', authMiddleware, create)
router.get('/:id', authMiddleware, getOne)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)
router.get('/*', authMiddleware, paginationMiddleware, authMiddleware, getAll)

module.exports = router