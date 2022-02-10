const Admin = require('../../models/Admin')
const helpers = require('../../helpers/helpers')
const { validationResult } = require('express-validator')

class AuthController {
   async login (request, response) {
      try {
         const errors = validationResult(request)
         if (!errors.isEmpty()) {
            return response.status(400).json({message: 'Ошибка при авторизации', errors})
         }
         const { email, password } = request.body

         const admin = await Admin.findOne({email})

         if (!admin) {
            return response.status(400).json({message: `Администратор с email: ${email} не найден`})
         }

         const validPassword = helpers.validatePassword(password, admin.password)
         if (!validPassword) {
            return response.status(400).json({ message: 'Введен неверный пароль' })
         }

         const token = helpers.generateAccessToken(admin._id)
         return response.json({token})
      } catch (e) {
         console.log(e)
      }
   }

   async checkAuth(request, response, next) {
      const token = helpers.generateAccessToken(request.user.id)
      return response.json({token})
   }
}

module.exports = new AuthController()