import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import CheckoutProductListItem from './CheckoutProductListItem';
import { TypeCartItem } from '../../store/shop/ProductsStore';

export type TypeCheckoutProductListProps = {
	cartProducts: TypeCartItem[]
}

const CheckoutProductList: FC<TypeCheckoutProductListProps> = ({ cartProducts }) => {

	const items = cartProducts.map(cartItem => {
		return <CheckoutProductListItem key={cartItem._id} product={cartItem}/>;
	});

	return (
		<ListGroup className={'mt-3'}>
			{items}
		</ListGroup>
	);
};

export default CheckoutProductList;