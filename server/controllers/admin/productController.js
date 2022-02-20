const Product = require('../../models/Product');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const TagType = require('../../models/TagType');
const Tag = require('../../models/Tag');

class productController {

  async create(request, response) {
    try {
      let {title, price, description, tagsIds, slug} = request.body;

      const {image} = request.files;

      const createCandidate = await Product.findOne({slug});
      if (createCandidate) {
        return response.status(400).json({message: `Продукт со slag: ${slug} уже существует`});
      }
      const fileName = uuid.v4() + '.jpg';
      image.mv(path.resolve(__dirname, '..', 'static', fileName));

      tagsIds = JSON.parse(tagsIds);

      const createdProduct = await Product.create(
        {title, price, image: fileName, description, tagsIds, slug}
      );

      return response.json({message: `${title} успешно создан`, createdProduct});

    } catch (e) {
      console.log(e);
    }
  }

  async update(request, response) {
    try {
      let {title, price, description, tagsIds, slug} = request.body;
      const {id: _id} = request.params;
      const {image} = request.files;

      const checkDuplicate = await Product.find(
        {
          $and: [
            {_id: {$ne: _id}},
            {slug}
          ]
        }
      );

      if (checkDuplicate.length) {
        return response.status(400).json({message: `Продукт со slag: ${slug} уже существует`});
      }

      const fileName = uuid.v4() + '.jpg';
      image.mv(path.resolve(__dirname, '..', 'static', fileName));

      const product = await Product.findOne({_id});
      const imgPath = path.resolve(__dirname, '..', 'static', product.image);
      fs.unlinkSync(imgPath);

      tagsIds = JSON.parse(tagsIds);
      // const updatedProductTags = await Tag.find({_id: {$in : [...tagsIds]}})

      const updatedProduct = await Product.findByIdAndUpdate(
        {_id},
        {title, price, description, tagsIds, slug, image: fileName},
        {new: true}
      );

      return response.json({message: `${title} успешно обновлен`, updatedProduct});
    } catch (e) {
      console.log(e);
    }
  }

  async remove(request, response) {
    try {
      const {id: _id} = request.params;
      const product = await Product.findOne({_id});
      const imgPath = path.resolve(__dirname, '..', 'static', product.image);
      fs.unlinkSync(imgPath);

      const removedProduct = await Product.findByIdAndDelete({_id});
      return response.json({message: `${removedProduct.title} успешно удален`, removedProduct});
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(request, response) {
    try {
      const {limit, skip} = request;

      const products = await Product.find().limit(limit).skip(skip);
      const totalCount = await Product.find().count();
      return response.json({products, totalCount, limit});
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(request, response) {
    const {id: _id} = request.params;
    const product = await Product.findById({_id});
    return response.json(product);
  }
}

module.exports = new productController();