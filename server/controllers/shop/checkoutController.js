const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../../models/Product');
const Order = require('../../models/Order');

const calculateOrderAmount = (items) => {
  const usdOrderAmount = items.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0) / 28.51;
  return Math.ceil(usdOrderAmount) * 100;
};

const setLineItems = (cartProducts, cartItems) => {
  return cartProducts.map(cartProductItem => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: cartProductItem.title
        },
        unit_amount: cartProductItem.price
      },
      quantity: cartItems.find(item => item._id === String(cartProductItem._id)).quantity
    };
  });
};

const orderItems = (cartProducts, cartItems) => {
  return cartProducts.map(cartProductItem => {
    return {
      itemId: cartProductItem._id,
      quantity: cartItems.find(item => item._id === String(cartProductItem._id)).quantity,
      price: cartProductItem.price
    };
  });
};

class CheckoutController {

  async checkout(request, response) {
    let {cartItems, name, email, phone, deliveryAddrs} = request.body;

    if (!name || !email || !phone) {
      return response.status(400).json({message: 'Заполните все поля'});
    }

    console.log('work');
    const cartItemsIds = cartItems.map(item => item._id);
    const cartProducts = await Product.find({_id: {$in: cartItemsIds}});

    const cartProd = orderItems(cartProducts, cartItems);
    const totalPrice = cartProd.reduce((acc, cartProdItem) => acc += cartProdItem.price * cartProdItem.quantity, 0);

    let order;
    try {
      order = await Order.create({
        prodItems: cartProd,
        deliveryAddrs: deliveryAddrs ? deliveryAddrs : 'self-delivery',
        userEmail: email,
        username: name,
        userPhone: phone,
        checkPay: 'awaiting payment',
        totalPrice
      });
    } catch (e) {
      console.log(e.message);
    }

    console.log('order', order);

    let session;
    try {
      session = await stripe.checkout.sessions.create({
        metadata: {
          orderId: String(order._id)
        },
        customer_email: email,
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: setLineItems(cartProducts, cartItems),
        success_url: `${process.env.CLIENT_URL}/checkout/success/`,
        cancel_url: `${process.env.CLIENT_URL}/checkout/cancel/`,
      });
    } catch (e) {
      console.log(e.message);
    }

    return response.status(200).json({url: session.url});
  }

  createOrder = async (session) => {
    // TODO: fill me in
    console.log('Creating order', session);
  };

  fulfillOrder = async (session) => {
    try {
      const order = await Order.updateOne(
        {_id: session.metadata.orderId},
        {
          $set: {
            checkPay: 'paid'
          }
        });
      console.log('fulfillOrder', order);
    } catch (err) {
      console.log(err.message);
    }
  };

  emailCustomerAboutFailedPayment = (session) => {
    // TODO: fill me in
    // console.log('Emailing customer', session);
  };
}

module.exports = new CheckoutController();