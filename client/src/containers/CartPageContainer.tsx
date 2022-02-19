import React, {useContext} from 'react';
import {Button, Col, Container, Image, Row} from 'react-bootstrap';
import CartHeader from '../components/cart/CartHeader';
import CartProductsList from '../components/cart/CartProductsList';
import CartProductsHeader from '../components/cart/CartProductsHeader';
import useUpdateCartFunctions from '../hooks/useUpdateCartFunctions';
import {ShopContext} from '../components/PublicRouter';
import {observer} from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';
import {CATALOG_ROUTE} from '../utils/consts';
import CartTotalInfoBlock from '../components/cart/CartTotalInfoBlock';


const CartPageContainer = observer(() => {
    const {removeProductFromCart, changeQuantity, clearCart} = useUpdateCartFunctions();
    const {shopProducts} = useContext(ShopContext);
    const navigate = useNavigate();

    const totalCartItemsInfo = shopProducts.cart.reduce((acc, cartItem) => {
        acc.paymentAmount += cartItem.price * cartItem.quantity;
        acc.totalItems += cartItem.quantity;
        return acc;
    }, {paymentAmount: 0, totalItems: 0});

    return (
        <Container className={'pt-5 pb-5'}>
            {!(shopProducts.cart.length)
                ?
                <div className={'text-center mt-5'}>
                    <Image
                        className={'m-auto d-block'}
                        style={{width: 300, height: 300}}
                        src={'/assets/empty_cart.svg'}
                    />
                    <h5 style={{color: '#198754'}} className={'mt-3'}>Упс! Ваша корзина пуста!</h5>
                    <p className={'mt-3'} style={{fontSize: 14}}>
                        Может быть, вы хотите добавить что-то в корзину?
                    </p>
                    <Button
                        onClick={() => navigate(CATALOG_ROUTE)}
                        variant={'outline-success'}
                    >
                        Начать покупки
                    </Button>
                </div>
                :
                <>
                    <CartHeader
                        info={totalCartItemsInfo}
                        onClearCart={clearCart}
                    />
                    <CartProductsHeader/>
                    <CartProductsList
                        onRemoveCartItem={removeProductFromCart}
                        products={shopProducts.cart}
                        onChangeQuantity={changeQuantity}
                    />
                    <CartTotalInfoBlock
                        info={totalCartItemsInfo}
                    />

                </>
            }

        </Container>
    );
});

export default CartPageContainer;