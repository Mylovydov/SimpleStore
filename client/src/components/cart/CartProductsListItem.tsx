import React, {FC} from 'react';
import {Button, ButtonGroup, CloseButton, Col, ListGroup, Row} from 'react-bootstrap';
import {TypeCartItem} from '../../store/shop/ProductsStore';
import {observer} from 'mobx-react-lite';

export type TypeCartProductsListItem = {
    product: TypeCartItem
    onRemoveCartItem: (id: string) => void
    onChangeQuantity: (id: string, isIncrease: boolean) => void
}

const CartProductsListItem: FC<TypeCartProductsListItem> = observer((
    {
        product,
        onRemoveCartItem,
        onChangeQuantity
    }
) => {

    const totalCartItemPrice = (product.price * product.quantity).toLocaleString('ru-RU');
    const cartItemPrice = product.price.toLocaleString('ru-RU');
    
    return (
        <ListGroup.Item className={'basket-item'}>
            <Row className={'align-items-center'}>
                <Col lg={5}>
                    <div className={'d-flex align-items-center'}>
                        <div className={'cart-image'}>
                            <img alt={'product image'} src={`${process.env.REACT_APP_API_URL}${product.image}`}/>
                        </div>

                        <div style={{
                            marginLeft: 15,
                            fontSize: 14,
                            color: '#221f1f',
                            maxWidth: 240,
                            flex: '1 1 auto'
                        }}>
                            {product.title}
                        </div>
                    </div>
                </Col>
                <Col lg={3}>
                    <ButtonGroup size="sm">
                        <Button
                            onClick={() => onChangeQuantity(product._id, false)}
                            variant="light"
                        >
                            -
                        </Button>
                        <div
                            className={'quantity-input'}
                        >
                            {product.quantity}
                        </div>
                        <Button
                            onClick={() => onChangeQuantity(product._id, true)}
                            variant="light"
                        >
                            +
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col lg={2}>
                    <div style={{fontSize: 20, color: '#787878'}}>
                        {cartItemPrice + ' ₴'}
                    </div>
                </Col>
                <Col lg={2}>
                    <div className={'d-flex align-items-center justify-content-between'}>
                        <div
                            style={{fontSize: 20, color: '#157347'}}
                        >
                            {totalCartItemPrice + ' ₴'}
                        </div>
                        <CloseButton onClick={() => onRemoveCartItem(product._id)}/>
                    </div>
                </Col>

            </Row>
        </ListGroup.Item>
    );
});

export default CartProductsListItem;