const setLineItems = (cartProducts, cartItems) => {
  return cartProducts.map(cartProductItem => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: cartProductItem.title
        },
        unit_amount: ((cartProductItem.price / 29.42) * 100).toFixed(0)
      },
      quantity: cartItems.find(item => item._id === String(cartProductItem._id)).quantity
    };
  });
};

const setOrderItems = (cartProducts, cartItems) => {
  return cartProducts.map(cartProductItem => {
    return {
      itemId: cartProductItem._id,
      quantity: cartItems.find(item => item._id === String(cartProductItem._id)).quantity,
      price: cartProductItem.price
    };
  });
};

// const calculateOrderAmount = (items) => {
//   const usdOrderAmount = items.reduce((acc, item) => {
//     return acc + (item.price * item.quantity);
//   }, 0) / 28.51;
//   return Math.ceil(usdOrderAmount) * 100;
// };

module.exports = {
  setLineItems,
  setOrderItems
}