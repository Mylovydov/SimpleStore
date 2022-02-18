import React, {FC} from 'react';
import {Button, ButtonGroup, CloseButton, Col, Form, Image, ListGroup, Row} from 'react-bootstrap';
import {TypeCartItem} from '../../store/shop/ProductsStore';
import {observer} from 'mobx-react-lite';

export type TypeCartProductsListItem = {
    product: TypeCartItem
    onRemoveCartItem: (id: string) => void
}

const CartProductsListItem: FC<TypeCartProductsListItem> = observer (({product, onRemoveCartItem}) => {

    return (
        <ListGroup.Item className={'basket-item'}>
            <Row className={'align-items-center'}>
                <Col lg={5}>
                    <div className={'d-flex align-items-center'}>
                        <Image style={{width: 130}} src={`${process.env.REACT_APP_API_URL}${product.image}`}/>
                        <div style={{
                            marginLeft: 15,
                            fontSize: 14,
                            color: '#221f1f',
                            maxWidth: 240
                        }}>{product.title}</div>
                    </div>
                </Col>
                <Col lg={3}>
                    <ButtonGroup size="sm">
                        <Button
                            // onClick={}
                            variant="light"
                        >
                            -
                        </Button>
                        <Form.Control
                            value={product.quantity}
                            className={'w-25'}
                            type="number"
                            inputMode={'numeric'}
                            disabled
                        />
                        <Button variant="light">+</Button>
                    </ButtonGroup>
                </Col>
                <Col lg={2}>
                    <div style={{fontSize: 20, color: '#221f1f'}}>{product.price}</div>
                </Col>
                <Col lg={2}>
                    <div className={'d-flex align-items-center justify-content-between'}>
                        <div style={{fontSize: 20, color: '#221f1f'}}>{product.price}</div>
                        <CloseButton onClick={() => onRemoveCartItem(product._id)}/>
                    </div>
                </Col>

            </Row>
        </ListGroup.Item>
    );
});

export default CartProductsListItem;