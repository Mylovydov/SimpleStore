const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class CheckoutController {
    async checkout(request, response) {
        const {product, token} = request.body;
        console.log('product', product);
        console.log('token', token);

        const idempontencyKey = uuid().v4();

        return stripe.customers.create({
            email: token.email,
            source: token.id
        }).then(customer => {
            stripe.charge.create({
                amount: product.price * 100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                description: 'Product description',
                shipping: {
                    name: token.card.name,
                    address: {
                        country: token.card.address_country
                    }
                }
            }, {idempontencyKey});
        })
            .then(result => response.status(200).json(result))
            .catch(e => console.log(e));
    }
}

module.exports = new CheckoutController();