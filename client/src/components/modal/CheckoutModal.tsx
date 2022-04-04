import React, {FC} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {TypeCartItem} from '../../store/shop/ProductsStore';
import CartProductsList from '../cart/CartProductsList';

export type TypeCheckoutModalProps = {
	show: boolean
	handleClose: () => void
	cartProducts: TypeCartItem[]
	onRemoveCartItem: (id: string) => void
	onChangeQuantity: (id: string, isIncrease: boolean) => void

}

const CheckoutModal: FC<TypeCheckoutModalProps> = (
	{
		show,
		handleClose,
		cartProducts,
		onRemoveCartItem,
		onChangeQuantity
	}
) => {
	return (
		<Modal size="lg" show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Корзина</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<CartProductsList
					onRemoveCartItem={onRemoveCartItem}
					onChangeQuantity={onChangeQuantity}
					cartProducts={cartProducts}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={handleClose}
					variant={'outline-success'}
				>
					Вернуться к оформлению
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CheckoutModal;