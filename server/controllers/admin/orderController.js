const Order = require('../../models/Order');
const {validationResult} = require('express-validator');


class OrderController {
  async create(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({message: 'Ошибка при оформлении заказа', errors});
      }
      const {
        prodItems,
        deliveryAddrs,
        userEmail,
        username,
        userPhone,
        totalPrice
      } = request.body;


      const order = await Order.create({
        prodItems,
        deliveryAddrs,
        userEmail,
        username,
        userPhone,
        totalPrice: Number(totalPrice)
      });

      console.log('order', order);

      return response.json({message: `Заказ ${order._id} создан`, order});
    } catch (error) {
      console.log(error);
    }
  }

  async update(request, response) {
    try {
      const {id: _id} = request.params;
      let {
        prodItems,
        deliveryAddrs,
        userEmail,
        username,
        userPhone,
        checkPay,
        totalPrice,
      } = request.body;

      const updatedOrder = await Order.findByIdAndUpdate(
        {_id},
        {prodItems, deliveryAddrs, userEmail, username, userPhone, totalPrice, checkPay},
        {new: true}
      );

      return response.json({message: `Заказ ${_id} успешно обновлен`, updatedOrder});
    } catch (error) {
      console.log(error);
    }
  }

  async remove(request, response) {
    const {id: _id} = request.params;
    const removedOrder = await Order.findByIdAndDelete({_id});
    return response.json({message: `Заказ ${_id} успешно удалён`, removedOrder});

  }

  async getAll(request, response) {
    const orders = await Order.find();
    return response.json(orders);
  }

  async getOne(request, response) {
    const {id: _id} = request.params;
    const order = await Order.findById({_id});
    return response.json(order);
  }

}

module.exports = new OrderController();