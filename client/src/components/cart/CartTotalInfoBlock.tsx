import React, {FC} from 'react';
import {Button, Card} from 'react-bootstrap';
import {TypeCartItem} from '../../store/shop/ProductsStore';

export type TypeCartTotalInfoBlockProps = {
  info: { [key: string]: number }
  navigate: () => void
}


const CartTotalInfoBlock: FC<TypeCartTotalInfoBlockProps> = ({info, navigate}) => {
  return (
    <Card className={'cart-total ms-auto mt-3'}>
      <div style={{fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        Сумма к оплате:
        <span
          style={{color: '#198754', fontSize: 20}}
          className={'ms-2'}
        >
          {info.paymentAmount.toLocaleString('ru-RU') + ' ₴'}
        </span>
      </div>
      <div className={'mt-2 d-flex align-items-end'} style={{flex: '1 1 auto'}}>
        <Button
          onClick={() => navigate()}
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