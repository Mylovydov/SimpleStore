const {Schema, model} = require('mongoose');

const Admin = new Schema(
  {
    username: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
  },
  {timestamps: {createdAt: 'createdDate', updatedAt: 'updatedDate'}});

module.exports = model('Admin', Admin);