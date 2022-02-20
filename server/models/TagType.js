const {Schema, model} = require('mongoose');

const TagType = new Schema(
  {
    title: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true}
  },
  {timestamps: {createdAt: 'createdDate', updatedAt: 'updatedDate'}}
);

module.exports = model('TagType', TagType);