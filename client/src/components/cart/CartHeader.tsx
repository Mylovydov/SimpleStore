import React, {FC} from 'react';
import {Button} from 'react-bootstrap';
import {TypeCartItem} from '../../store/shop/ProductsStore';


export type TypeCartHeaderProps = {
    info: {[key: string]: number}
    onClearCart: () => void
}

const CartHeader: FC<TypeCartHeaderProps> = ({info, onClearCart}) => {

    return (
        <div className={'basket-header'}>
            <div className={'basket-header__title'}>
                <h5>Корзина</h5>
            </div>
            <div className={'basket-header__info header-info'}>
                <div className={'header-info__prod'}>
                    Товаров в корзине:
                    <span
                        style={{color: '#198754', fontSize: 20}}
                        className={'ms-2'}
                    >
                        {info.totalItems}
                    </span>
                </div>
                <div className={'header-info__prod'}>
                    Сумма к оплате:
                    <span
                        style={{color: '#198754', fontSize: 20}}
                        className={'ms-2'}
                    >
                        {info.paymentAmount + ' ₴'}
                    </span>
                </div>
            </div>
            <div className={'basket-header__actions header-actions'}>
                <div
                    className={'header-actions__clear'}
                    onClick={() => onClearCart()}
                >
                    Очистить корзину
                </div>
                <Button variant={'outline-success'} className={'header-actions__checkout'}>Перейти к оформлению</Button>
            </div>
        </div>
    );
};

export default CartHeader;