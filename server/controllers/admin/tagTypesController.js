const Product = require('../../models/Product');
const Tag = require('../../models/Tag');
const TagType = require('../../models/TagType');

class TagTypesController {

  async create(request, response) {
    try {
      const {title, slug} = request.body;
      const typeCandidate = await TagType.findOne({$or: [{title}, {slug}]});
      if (typeCandidate) {
        return response.status(400).json({message: `Такой тип: ${title} или slug: ${slug} уже был создан`});
      }

      const tagType = await TagType.create({title, slug});

      return response.json({message: `Тип: ${title}, slug: ${slug} успешно добавлен`, tagType});
    } catch (e) {
      console.log(e);
    }
  }

  async update(request, response) {
    try {
      const {title, slug} = request.body;
      const {id: _id} = request.params;
      const checkDuplicate = await TagType.find(
        {
          $and: [
            {_id: {$ne: _id}},
            {title, slug}
          ]
        }
      );

      if (checkDuplicate.length) {
        return response.status(400).json({message: `Тег ${title} уже существует`});
      }

      const updateTagType = await TagType.findByIdAndUpdate(
        {_id},
        {title, slug},
        {new: true}
      );
      return response.json({message: `Тип успешно обновлен на ${title}`, updateTagType});
    } catch (e) {
      console.log(e);
    }
  }

  async remove(request, response) {
    try {
      const {id: _id} = request.params;
      const removedType = await TagType.findByIdAndDelete({_id});

      // Теги, которые нужно удалить
      const deletedTags = await Tag.find({tagTypeId: _id});
      const deletedTagsIds = deletedTags.map(tag => {
        return tag._id;
      });

      // удаление типа из всех тегов
      await Tag.deleteMany(
        {tagTypeId: _id}
      );

      // Обновляем массив тегов в продуктах
      await Product.updateMany(
        {},
        {$pullAll: {tagsIds: [...deletedTagsIds]}}
      );

      return response.json({message: `Тип ${removedType.title} успешно удален`, removedType});

    } catch (e) {
      console.log(e);
    }
  }

  async getAll(request, response) {
    try {
      const {limit, skip} = request;

      const totalCount = await TagType.find().count();
      const tagTypes = await TagType.find().limit(limit).skip(skip);

      return response.json({tagTypes, totalCount, limit});
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(request, response) {
    try {
      const {id: _id} = request.params;
      const tagType = await TagType.findOne({_id});
      return response.json(tagType);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new TagTypesController();