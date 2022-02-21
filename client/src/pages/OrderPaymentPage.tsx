import React, {useState, useEffect, useContext} from 'react';
import CheckoutForm from '../components/ChackoutForm';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {checkout} from '../http/shopAPI/checkoutAPI';
import {ShopContext} from '../components/PublicRouter';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY!);

const OrderPaymentPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const {shopProducts} = useContext(ShopContext);


  useEffect(() => {
    const cartItems = shopProducts.cart.map(cartItem => ({
      _id: cartItem._id,
      quantity: cartItem.quantity,
      price: cartItem.price,
      title: cartItem.title
    }));
    checkout(cartItems).then((res: any) => setClientSecret(res.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#158a28',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };


  return (
    <>
      {clientSecret && (
        // @ts-ignore
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm/>
        </Elements>
      )}
    </>
  );
};

export default OrderPaymentPage;