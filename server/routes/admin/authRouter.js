const Router = require('express')
const router = new Router()
const { login, checkAuth } = require('../../controllers/admin/authController')
const authMiddleware = require('../../middleware/authMiddleware')
const { check } = require('express-validator')


router.post('/login', [
   check('email', 'Некорректный email').isEmail(),
   check('password', 'Пароль должен содержать от 6 до 10 символов').isLength({min: 6, max: 10})
], login)
router.get('/auth', authMiddleware, checkAuth)

module.exports = router