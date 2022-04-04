const {Schema, model, Types} = require('mongoose');

const prodItems = new Schema({
  itemId: {type: Types.ObjectId, required: true, ref: 'Product'},
  quantity: {type: Number, required: true, default: 1},
  price: {type: Number, required: true}
});

const Order = new Schema({
    prodItems: [prodItems],
    deliveryAddrs: {type: String, default: 'self-delivery'},
    userEmail: {type: String},
    username: {type: String},
    userPhone: {type: String},
    checkPay: {type: String, enum: ['awaiting payment', 'paid'], default: 'not paid'},
    totalPrice: {type: Number}
  },
  {timestamps: {createdAt: 'orderDate', updatedAt: 'updatedDate'}}
);

// const Order = new Schema({
//     prodItems: [prodItems],
//     deliveryAddrs: {type: String, default: 'self-delivery'},
//     userEmail: {type: String, required: true},
//     username: {type: String, required: true},
//     userPhone: {type: String, required: true},
//     checkPay: {type: String, enum: ['not paid', 'paid'], default: 'not paid'},
//     totalPrice: {type: Number, required: true}
//   },
//   {timestamps: {createdAt: 'orderDate', updatedAt: 'updatedDate'}}
// );

module.exports = model('Order', Order);