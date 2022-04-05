import { useContext, useEffect } from 'react';
import { ShopContext } from '../components/PublicRouter';


export const useGetCartItems = () => {
	const { shopProducts } = useContext(ShopContext);

	useEffect(() => {
		const storeCartData = shopProducts.cart;

		if (!(storeCartData.length)) {
			const storageCartData = localStorage.getItem('cart');
			storageCartData && shopProducts.setCart(JSON.parse(storageCartData));
		}
	}, []);
};