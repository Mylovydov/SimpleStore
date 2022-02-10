const Router = require('express')
const router = new Router()
const { create, getAll, getOne, update, remove } = require('../../controllers/admin/administratorsController')
const { check } = require('express-validator')
const authMiddleware = require('../../middleware/authMiddleware')

router.post('/', [
   check('username', 'Имя пользователя не может быть пустым').notEmpty(),
   check('email', 'Некорректный email').isEmail(),
   check('password', 'Пароль должен содержать от 6 до 10 символов').isLength({min: 6, max: 10})
], authMiddleware, create)
router.get('/', authMiddleware, getAll)
router.get('/:id', authMiddleware, getOne)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)

module.exports = router