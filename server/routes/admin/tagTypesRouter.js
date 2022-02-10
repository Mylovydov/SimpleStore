const Router = require('express')
const router = new Router()
const { create, update, remove, getAll, getOne } = require('../../controllers/admin/tagTypesController')
const authMiddleware = require('../../middleware/authMiddleware')
const paginationMiddleware = require('../../middleware/paginationMiddleware')

router.post('/create', authMiddleware, create)
router.get('/one-tag-type/:id', authMiddleware, getOne)
router.put('/up-tag-type/:id', authMiddleware, update)
router.delete('/del-tag-type/:id', authMiddleware, remove)
router.get('/*', paginationMiddleware(40), authMiddleware, getAll)

module.exports = router