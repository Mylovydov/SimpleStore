import React, {FC} from 'react';
import {ListGroup} from 'react-bootstrap';
import CartProductsListItem from './CartProductsListItem';
import {TypeCartItem} from '../../store/shop/ProductsStore';

export type TypeCartProductsList = {
    onRemoveCartItem: (id: string) => void
    products: TypeCartItem[]
}

const CartProductsList: FC<TypeCartProductsList> = ({onRemoveCartItem, products}) => {
    return (
        <ListGroup className={'mt-3'}>
            {products.map(product => {
                return (
                    <CartProductsListItem
                        key={product._id}
                        product={product}
                        onRemoveCartItem={onRemoveCartItem}
                    />
                )
            })}
        </ListGroup>
    );
};

export default CartProductsList;