const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class Helpers {

   hashingPassword = async (password) => {
      return await bcrypt.hash(password, 5)
   }

   validatePassword = (reqPassword, dBPassword) => {
      return bcrypt.compareSync(reqPassword, dBPassword)
   }

   generateAccessToken = (id) => {
      const payload = {
         id
      }
      return jwt.sign(payload, process.env.SECRET_KEY, {
         expiresIn: '24h'
      })
   }

   verifyTokenData = (userToken, secret) => {
      return jwt.verify(userToken, secret)
   }

   createTagSlug = (tagTypeTitle, tagTitle) => {
      const tagSlag = `${tagTypeTitle.toLocaleLowerCase()}=${tagTitle.toLocaleLowerCase()}`
      return tagSlag
   }
}

module.exports = new Helpers()