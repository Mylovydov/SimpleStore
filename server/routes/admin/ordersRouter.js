const Router = require('express')
const router = new Router()
const { check } = require('express-validator')

const { create, update, remove, getOne, getAll } = require('../../controllers/admin/orderController')
const authMiddleware = require('../../middleware/authMiddleware')

router.post('/', [
    check('username', 'Укажите Ваше имя').notEmpty(),
    check('userEmail', 'Введите корректиный email').isEmail(),
    check('userPhone', 'Введите корректиный номер телефона').isMobilePhone(),
], authMiddleware, create)
router.get('/', authMiddleware, getAll)
router.get('/:id', authMiddleware, getOne)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)

module.exports = router