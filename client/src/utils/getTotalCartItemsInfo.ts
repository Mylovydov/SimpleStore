import { TypeCartItem } from '../store/shop/ProductsStore';

export type TypeTotalCartItemsInfo = {
	paymentAmount: number,
	totalItems: number
}

export const getTotalCartItemsInfo = (cartItems: TypeCartItem[]) => {
	return cartItems.reduce((acc: TypeTotalCartItemsInfo, cartItem: TypeCartItem) => {
		acc.paymentAmount += cartItem.price * cartItem.quantity;
		acc.totalItems += cartItem.quantity;
		return acc;
	}, { paymentAmount: 0, totalItems: 0 });
};