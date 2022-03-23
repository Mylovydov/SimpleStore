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
    try {
      const {cartItems, name, email, phone, deliveryAddrs} = request.body;

      if (!name || !email || !phone || !deliveryAddrs) {
        return response.status(400).json({message: 'Заполните все поля'});
      }

      const cartItemsIds = cartItems.map(item => item._id);
      const cartProducts = await Product.find({_id: {$in: cartItemsIds}});

      const cartProd = orderItems(cartProducts, cartItems);
      const totalPrice = cartProd.reduce((acc, cartProdItem) => {
        return acc += cartProdItem.price;
      }, 0);

      const order = await Order.create({
        prodItems: cartProd,
        deliveryAddrs,
        userEmail: email,
        username: name,
        userPhone: phone,
        checkPay: 'not paid',
        totalPrice
      });
      console.log('order', order);

      const session = await stripe.checkout.sessions.create({
        metadata: {
          orderId: String(order._id)
        },
        customer_email: email,
        // phone_number_collection: {
        //   enabled: true
        // },
        // billing_address_collection: 'auto',
        // shipping_address_collection: {
        //   allowed_countries: ['UA'],
        // },
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: setLineItems(cartProducts, cartItems),
        success_url: `${process.env.CLIENT_URL}/checkout/success/`,
        cancel_url: `${process.env.CLIENT_URL}/checkout/cancel/`,
      });

      return response.status(200).json({url: session.url});
    } catch (err) {
      return response.status(400);
    }
  }

  createOrder = async (session) => {
    // TODO: fill me in
    console.log('Creating order', session);

    const deliveryData = session.shipping.address;
    const customerDetails = session.customer_details;
    const deliveryAddrs = `Город: ${deliveryData.city}, ул.${deliveryData.line1}, ${deliveryData.line2}, индекс: ${deliveryData.postal_code}`;
    const userEmail = customerDetails.email;
    const username = session.shipping.name;
    const userPhone = customerDetails.phone;

    // try {
    //   const order = await Order.updateOne(
    //     {_id: session.metadata.orderId},
    //     {
    //       $set: {
    //         deliveryAddrs,
    //         userEmail,
    //         username,
    //         userPhone
    //       }
    //     });
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  fulfillOrder = async (session) => {
    try {
      const order = await Order.updateOne(
        {_id: session.metadata.orderId},
        {
          $set: {
            checkPay: 'paid' }
        });
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