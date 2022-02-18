import React from 'react';
import {Button} from 'react-bootstrap';

const CartHeader = () => {
    return (
        <div className={'basket-header'}>
            <div className={'basket-header__title'}>
                <h5>Корзина</h5>
            </div>
            <div className={'basket-header__info header-info'}>
                <div className={'header-info__prod'}>Товаров в корзине:</div>
                <div>Сумма к оплате:</div>
            </div>
            <div className={'basket-header__actions header-actions'}>
                <div className={'header-actions__clear'}>Очистить корзину</div>
                <Button variant={'outline-success'} className={'header-actions__checkout'}>Перейти к оформлению</Button>
            </div>
        </div>
    );
};

export default CartHeader;