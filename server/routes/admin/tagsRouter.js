const Router = require('express')
const router = new Router()
const { create, update, remove, getAll, getOne } = require('../../controllers/admin/tagsController')
const paginationMiddleware = require('../../middleware/paginationMiddleware')
const authMiddleware = require('../../middleware/authMiddleware')

router.post('/create', authMiddleware, create)
router.get('/one-tag/:id', authMiddleware, getOne)
router.put('/up-tag/:id', authMiddleware, update)
router.delete('/del-tag/:id', authMiddleware, remove)
router.get('/*', paginationMiddleware(40), authMiddleware, getAll)

module.exports = router