const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.ENDPOINT_STRIPE_SECRET;
const {createOrder, fulfillOrder, emailCustomerAboutFailedPayment} = require('./checkoutController')

async function webhook(request, response) {
  const payload = request.body;
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log('work!');

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      // Save an order in your database, marked as 'awaiting payment'
      createOrder(session);
      console.log('checkout.session.completed!!!!!!');

      // Check if the order is paid (for example, from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // you're still waiting for funds to be transferred from the customer's
      // account.

      if (session.payment_status === 'paid') {
        console.log('paid!!!!!!');
        //fulfill Order = выполнить заказ
        fulfillOrder(session);
      }
      break;
    }

    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object;
      // Fulfill the purchase...
      fulfillOrder(session);
      break;
    }

    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;
      // Send an email to the customer asking them to retry their order
      emailCustomerAboutFailedPayment(session);
      break;
    }
  }
  console.log('work!!!');

  return response.status(200);
}

module.exports = {
  webhook
};