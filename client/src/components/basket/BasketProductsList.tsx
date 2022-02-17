import React, {FC} from 'react';
import {ListGroup} from 'react-bootstrap';
import BasketProductsListItem from './BasketProductsListItem';
import {TypeBasketItem} from '../../store/shop/ProductsStore';

export type TypeBasketProductsList = {
    onRemoveCartItem: (id: string) => void
    products: TypeBasketItem[]
}

const BasketProductsList: FC<TypeBasketProductsList> = ({onRemoveCartItem, products}) => {

    return (
        <ListGroup className={'mt-3'}>
            {products.map(product => {
                return (
                    <BasketProductsListItem
                        key={product._id}
                        product={product}
                        onRemoveCartItem={onRemoveCartItem}
                    />
                )
            })}
        </ListGroup>
    );
};

export default BasketProductsList;