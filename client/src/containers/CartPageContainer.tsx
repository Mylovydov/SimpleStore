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

    return (
        <Container>
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
                    <Row className={'mt-5'}>
                        <Col lg={9}>
                            <CartHeader
                                onClearCart={clearCart}
                            />
                            <CartProductsHeader/>
                            <CartProductsList
                                onRemoveCartItem={removeProductFromCart}
                                products={shopProducts.cart}
                                onChangeQuantity={changeQuantity}
                            />
                        </Col>
                        <Col lg={3}>
                            <CartTotalInfoBlock
                                products={shopProducts.cart}
                            />
                        </Col>
                    </Row>

                </>
            }

        </Container>
    );
});

export default CartPageContainer;