import React, {useContext} from 'react';
import {Button, Container, Image} from 'react-bootstrap';
import CartHeader from '../components/basket/CartHeader';
import CartProductsList from '../components/basket/CartProductsList';
import CartProductsHeader from '../components/basket/CartProductsHeader';
import useUpdateCartFunctions from '../hooks/useUpdateCartFunctions';
import {ShopContext} from '../components/PublicRouter';
import {observer} from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';
import {CATALOG_ROUTE} from '../utils/consts';

const CartPageContainer = observer(() => {
    const {removeProductFromCart} = useUpdateCartFunctions();
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
                    <CartHeader/>
                    <CartProductsHeader/>
                    <CartProductsList onRemoveCartItem={removeProductFromCart} products={shopProducts.cart}/>
                </>
            }

        </Container>
    );
});

export default CartPageContainer;