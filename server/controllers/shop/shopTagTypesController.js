
const TagType = require('../../models/TagType')

class ShopTagTypesController {

   async getAll (request, response) {
      try {
         const tagTypes = await TagType.find()

         return response.json(tagTypes)
      } catch (e) {
         console.log(e)
      }
   }
}

module.exports = new ShopTagTypesController()