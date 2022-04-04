import React, {FC} from 'react';
import {Button} from 'react-bootstrap';

export type TypeCartHeaderProps = {
	info: { [key: string]: number }
	onClearCart: () => void
	navigate: () => void
}

const CartHeader: FC<TypeCartHeaderProps> = ({info, onClearCart, navigate}) => {

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
            {info.paymentAmount.toLocaleString('ru-RU') + ' ₴'}
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
				<Button
					onClick={() => navigate()}
					variant={'outline-success'}
					className={'header-actions__checkout'}
				>
					Перейти к оформлению
				</Button>
			</div>
		</div>
	);
};

export default CartHeader;