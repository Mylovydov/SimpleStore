const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = 'lively-poetic-bonny-favour';

async function webhook(request, response) {
  const payload = request.body;

  console.log("Got payload: " + payload);
  response.status(200);
}

module.exports = {
  webhook
};