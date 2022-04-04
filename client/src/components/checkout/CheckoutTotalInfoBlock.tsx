import React, {FC} from 'react';
import {Button, Card} from 'react-bootstrap';
import {TypeTotalCartItemsInfo} from '../../utils/getTotalCartItemsInfo';

export type TypeCheckoutTotalInfoBlockProps = {
	totalOrderInfo: TypeTotalCartItemsInfo
}

const CheckoutTotalInfoBlock: FC<TypeCheckoutTotalInfoBlockProps> = ({totalOrderInfo}) => {

	return (
		<Card className={'cart-total ms-auto position-fixed w-100'}>
			<h4>Итого</h4>
			<div style={{fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
					 className={'mt-3'}
			>
				Всего товаров
				<span className={'ms-2'}>
          {totalOrderInfo.totalItems}
        </span>
			</div>

			<div
				style={{fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
				className={'mt-3'}
			>
				На сумму
				<span className={'ms-2'}>
          {totalOrderInfo.paymentAmount.toLocaleString('ru-RU') + ' ₴'}
        </span>
			</div>
			<div style={{fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}
					 className={'mt-3'}
			>
				Стоимость доставки
				<span className={'ms-2'} style={{textAlign: 'end'}}>
          по тарифам перевозчика
        </span>
			</div>
			<div
				style={{fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
				className={'mt-3  pt-3 pb-3 border-top border-bottom'}
			>
				К оплате
				<span
					className={'ms-2'}
					style={{textAlign: 'end', fontSize: 24}}
				>
          {totalOrderInfo.paymentAmount.toLocaleString('ru-RU') + ' ₴'}
        </span>
			</div>

			<div className={'mt-4 d-flex align-items-end'} style={{flex: '1 1 auto'}}>
				<Button
					type="submit"
					variant={'success'}
					className={'w-100'}
				>
					Подтвердить заказ
				</Button>
			</div>
			<div className={'mt-3'} style={{fontSize: 11, color: '#787878'}}>
				<p className={'mb-1'}>Подтверждая заказ, я принимаю условия</p>
				<ul className={'m-0 ps-3'}>
					<li>положения о сборе и защите персональных данных</li>
					<li>пользовательского соглашения</li>
				</ul>
			</div>
		</Card>
	);
};

export default CheckoutTotalInfoBlock;