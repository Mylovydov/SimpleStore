const Tag = require('../models/Tag')
const TagType = require('../models/TagType')
const helpers = require('../helpers/helpers')
const Product = require('../models/Product')

class TagsController {

   async create (request, response) {
      try {
         const { title, tagTypeId, slug } = request.body

         const tagCandidate = await Tag.find({$and: [{title}, {slug}, {tagTypeId}]})

         if (tagCandidate.length) {
            return response.status(400).json({message: `Тег ${title} уже был создан`})
         }

         const tag = await Tag.create({
            title,
            tagTypeId,
            slug
         })

         console.log(tag);
         return response.json({message: `Тег ${title} успешно добавлен`, tag})
      } catch (e) {
         console.log(e)
      }
   }

   async update (request, response) {
      try {
         const { title, tagTypeId, slug } = request.body
         const { id: _id } = request.params

         const checkDuplicate = await Tag.find(
            {$and: [
               {_id: {$ne : _id}},
               {title, slug, tagTypeId}
            ]}
         )
         
         if(checkDuplicate.length) {
            return response.status(400).json({message: `Тег ${title} уже существует`})
         }
         
         const updatedTag = await Tag.findByIdAndUpdate(
            {_id},
            {title, tagTypeId, slug},
            {new: true}
         )
         return response.json({message: `Тег успешно обновлен`, updatedTag})
      } catch (e) {
         console.log(e)
      }
   }

   async remove (request, response) {
      const { id: _id } = request.params

      const removedTag = await Tag.findByIdAndDelete({_id})

      // удаление тега из всех продуктов
      await Product.updateMany(
         {},
         { $pull: {tagsIds: {$in: [_id]} } }
      )

      return response.json({message: `Тег ${removedTag.title} успешно удален`, removedTag})
   }

   async getAll (request, response) {
      try {
         const { limit, skip } = request

         const allTags = await Tag.find()
         const tags = await Tag.find().limit(limit).skip(skip)
         const totalCount = await Tag.find().count()
         return response.json({ allTags, tags, totalCount, limit })
      } catch (e) {
         console.log(e)
      }
   }

   async getOne (request, response) {
      const { id: _id } = request.params
      const tag = await Tag.findById({_id})
      return response.json(tag)
   }
}

module.exports = new TagsController()