import React, {useContext, useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import BasketHeader from '../components/basket/BasketHeader';
import BasketProductsList from '../components/basket/BasketProductsList';
import BasketProductsHeader from '../components/basket/BasketProductsHeader';
import useUpdateBasketFunctions from '../hooks/useUpdateBasketFunctions';
import {ShopContext} from '../components/PublicRouter';

const BasketPageContainer = () => {
    const {removeProductFromBasket} = useUpdateBasketFunctions()
    const {shopProducts} = useContext(ShopContext);

    useEffect(() => {
        let storageCartData = localStorage.getItem('cart')
        if (storageCartData) {
            shopProducts.setBasket(JSON.parse(storageCartData))
        }
    }, [])



    return (
        <Container>
            <BasketHeader/>
            <BasketProductsHeader/>
            <BasketProductsList onRemoveCartItem={removeProductFromBasket} products={shopProducts.basket}/>
        </Container>
    );
};

export default BasketPageContainer;