import React, {FC} from 'react';
import {ListGroup} from 'react-bootstrap';
import CartProductsListItem from './CartProductsListItem';
import {TypeCartItem} from '../../store/shop/ProductsStore';

export type TypeCartProductsListProps = {
    onRemoveCartItem: (id: string) => void
    products: TypeCartItem[]
    onChangeQuantity: (id: string, isIncrease: boolean) => void
}

const CartProductsList: FC<TypeCartProductsListProps> = (
    {
        onRemoveCartItem,
        products,
        onChangeQuantity
    }
) => {
    return (
        <ListGroup className={'mt-3'}>
            {products.map(product => {
                return (
                    <CartProductsListItem
                        key={product._id}
                        product={product}
                        onRemoveCartItem={onRemoveCartItem}
                        onChangeQuantity={onChangeQuantity}
                    />
                )
            })}
        </ListGroup>
    );
};

export default CartProductsList;