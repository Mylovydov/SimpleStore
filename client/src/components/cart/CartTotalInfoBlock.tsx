import React, {FC} from 'react';
import {Button, Card} from 'react-bootstrap';
import {TypeCartItem} from '../../store/shop/ProductsStore';

export type TypeCartTotalInfoBlockProps = {
    products: TypeCartItem[]
}


const CartTotalInfoBlock: FC<TypeCartTotalInfoBlockProps> = ({products}) => {

    const paymentAmount = products.reduce((acc, cartItem) => {
        return acc + cartItem.price * cartItem.quantity;
    }, 0).toLocaleString('ru-RU');

    return (
        <Card className={'cart-total'} style={{minHeight: 249}}>
            <div style={{fontSize: 22}}>Итого</div>
            <div className={'header-info__prod mt-3'} style={{fontSize: 14}}>
                Товаров в корзине:
                <span
                    style={{color: '#198754', fontSize: 20}}
                    className={'ms-2'}
                >
                        {products.length}
                    </span>
            </div>
            <div className={'header-info__prod mt-3'} style={{fontSize: 14}}>
                Сумма к оплате:
                <span
                    style={{color: '#198754', fontSize: 20}}
                    className={'ms-2'}
                >
                        {paymentAmount + ' ₴'}
                    </span>
            </div>
            <div className={'mt-2 d-flex align-items-end'} style={{flex: '1 1 auto'}}>
                <Button
                    variant={'outline-success'}
                    className={'w-100'}
                >
                    Перейти к оформлению
                </Button>
            </div>
        </Card>
    );
};

export default CartTotalInfoBlock;