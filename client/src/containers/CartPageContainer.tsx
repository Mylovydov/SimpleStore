import React, {useContext} from 'react';
import {Container} from 'react-bootstrap';
import CartHeader from '../components/basket/CartHeader';
import CartProductsList from '../components/basket/CartProductsList';
import CartProductsHeader from '../components/basket/CartProductsHeader';
import useUpdateCartFunctions from '../hooks/useUpdateCartFunctions';
import {ShopContext} from '../components/PublicRouter';
import {observer} from 'mobx-react-lite';

const CartPageContainer = observer (() => {
    const {removeProductFromCart} = useUpdateCartFunctions()
    const {shopProducts} = useContext(ShopContext);

    console.log('CartPageContainer', shopProducts.cart);
    return (
        <Container>
            <CartHeader/>
            <CartProductsHeader/>
            <CartProductsList onRemoveCartItem={removeProductFromCart} products={shopProducts.cart}/>
        </Container>
    );
});

export default CartPageContainer;