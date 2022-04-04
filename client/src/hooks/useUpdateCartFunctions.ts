import {useCallback, useContext} from 'react';
import {ShopContext} from '../components/PublicRouter';
import {TypeProduct} from '../store/admin/ProductStore';


const useUpdateCartFunctions = () => {
	const {shopProducts} = useContext(ShopContext);

	const setProductToCart = useCallback((product: TypeProduct) => {
		const candidateForAddingToCart = shopProducts.cart.find(cartItem => cartItem._id === product._id);

		if (!candidateForAddingToCart) {
			const {_id, title, price, image} = product;
			shopProducts.setCart([...shopProducts.cart, {_id, title, price, image, quantity: 1}]);

			localStorage.setItem('cart', JSON.stringify(shopProducts.cart));
		}
	}, [shopProducts.products, shopProducts.cart]);

	const changeQuantity = useCallback((id: string, isIncrease: boolean) => {
		shopProducts.setCart(shopProducts.cart.map(cartItem => {
			if (cartItem._id === id) {
				return cartItem.quantity === 1 && !isIncrease
					?
					cartItem
					:
					{...cartItem, quantity: cartItem.quantity + (isIncrease ? 1 : -1)};
			}
			return cartItem;
		}));
		localStorage.setItem('cart', JSON.stringify(shopProducts.cart));
	}, [shopProducts.cart]);

	const removeProductFromCart = useCallback((id: string) => {
		const updatedCartData = shopProducts.cart.filter(item => item._id !== id);
		shopProducts.setCart(updatedCartData);
		localStorage.setItem('cart', JSON.stringify(updatedCartData));
	}, [shopProducts.cart]);

	const clearCart = useCallback(() => {
		shopProducts.setCart([]);
		localStorage.removeItem('cart');
	}, [shopProducts.cart]);

	return {
		setProductToCart,
		changeQuantity,
		removeProductFromCart,
		clearCart
	};
};

export default useUpdateCartFunctions;