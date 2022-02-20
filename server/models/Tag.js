const {Schema, model, Types} = require('mongoose');

const Tag = new Schema(
  {
    title: {type: String, required: true},
    tagTypeId: {type: Types.ObjectId, ref: 'TagType', required: true},
    slug: {type: String, required: true}
  },
  {timestamps: {createdAt: 'createdDate', updatedAt: 'updatedDate'}}
);

module.exports = model('Tag', Tag);