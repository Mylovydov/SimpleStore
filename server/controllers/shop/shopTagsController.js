const Tag = require('../../models/Tag')

class ShopTagsController {

    async getAll (request, response) {
        try {
            const allTags = await Tag.find()
            return response.json(allTags)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ShopTagsController()