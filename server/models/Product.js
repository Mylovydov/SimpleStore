const {Schema, model, Types} = require('mongoose')

const Product = new Schema(
   {
      title: {type: String, required: true},
      description: {type: String, default: ''},
      price: {type: Number, default: 0, required: true},
      image: {type: String, required: true},
      orderCounter: {type: Number, default: 0},
      tagsIds: [{type: Types.ObjectId, required: true, ref: 'Tag'}],
      slug: {type: String, unique: true, required: true}
   },
   { timestamps: {createdAt: 'createdDate', updatedAt: 'updatedDate'} })

module.exports = model('Product', Product)