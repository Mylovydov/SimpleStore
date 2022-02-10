const Tag = require('../models/Tag')

class UserTagsController {

    async getAll (request, response) {
        try {
            const allTags = await Tag.find()
            return response.json(allTags)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserTagsController()