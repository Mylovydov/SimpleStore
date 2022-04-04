const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../../models/Product');
const Order = require('../../models/Order');
const {setLineItems, setOrderItems} = require('../../helpers/checkout');

class CheckoutController {

  async checkout(request, response) {
    let {cartItems, name, email, phone, deliveryAddrs} = request.body;

    if (!name || !email || !phone) {
      return response.status(400).json({message: 'Заполните все поля'});
    }

    const cartItemsIds = cartItems.map(item => item._id);
    const cartProducts = await Product.find({_id: {$in: cartItemsIds}});

    const prodItems = setOrderItems(cartProducts, cartItems);

    const totalOrderPrice = prodItems.reduce((acc, cartProdItem) => acc += cartProdItem.price * cartProdItem.quantity, 0);

    let order;
    try {
      order = await Order.create({
        prodItems,
        deliveryAddrs: deliveryAddrs ? deliveryAddrs : 'self-delivery',
        userEmail: email,
        username: name,
        userPhone: phone,
        checkPay: 'awaiting payment',
        totalPrice: totalOrderPrice
      });
    } catch (e) {
      console.log(e.message);
    }

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
      const order = await Order.findOneAndUpdate(
        {_id: session.metadata.orderId},
        {
          $set: {
            checkPay: 'paid'
          }
        });

      for (let i = 0; i < order.prodItems.length; i++) {
        const prodItem = order.prodItems[i];

        const product = await Product.findById({_id: prodItem.itemId})

        await Product.findByIdAndUpdate(
          {_id: prodItem.itemId},
          {
            $set: {
              orderCounter: product.orderCounter + prodItem.quantity
            }
          },
        );
      }
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