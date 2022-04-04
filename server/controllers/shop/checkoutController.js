const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  const usdOrderAmount = items.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0) / 28.51;
  return Math.ceil(usdOrderAmount) * 100;
};


class CheckoutController {
  async checkout(request, response) {
    try {
      const {name, email, phone, delivery, cartItems} = request.body;

      const session = await stripe.checkout.sessions.create({
        customer_email: 'gfdgfsd@.gmail.com',
        // billing_address_collection: 'auto',
        // shipping_address_collection: {
        //   allowed_countries: ['UA'],
        // },
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: cartItems.map(item => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title
              },
              unit_amount: item.price
            },
            quantity: item.quantity
          };
        }),
        success_url: `${process.env.CLIENT_URL}/checkout/success/`,
        cancel_url: `${process.env.CLIENT_URL}/checkout/canceled/`,
      });

      console.log(session.url);
      console.log(response, 'response');

      return response.status(200).json({url: session.url});
    } catch (e) {
      return response.status(400);
    }
  }


  // async checkout(request, response) {
  //   try {
  //     const {name, email, phone, delivery, cartItems} = request.body;
  //
  //     const paymentIntent = await stripe.paymentIntents.create({
  //       amount: calculateOrderAmount(cartItems),
  //       currency: 'usd',
  //       automatic_payment_methods: {
  //         enabled: true,
  //       },
  //     });
  //
  //     response.send({
  //       clientSecret: paymentIntent.client_secret,
  //     });
  //   } catch (e) {
  //     return response.status(400);
  //   }
  // }
}

module.exports = new CheckoutController();