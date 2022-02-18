import React, {FC} from 'react';
import {Col, ListGroup, Row} from 'react-bootstrap';

const CartProductsHeader: FC = () => {
    return (
        <ListGroup.Item className="mt-5 pt-3 pb-3 ps-4 pe-4 basket-item">
            <Row>
                <Col lg={5}>
                    <span className={'products-header__item'}>Продукт</span>
                </Col>
                <Col lg={3}>
                    <span className={'products-header__item'}>Количество</span>
                </Col>
                <Col lg={2}>
                    <span className={'products-header__item'}>{'Цена' + ' ₴'}</span>
                </Col>
                <Col lg={2}>
                    <span className={'products-header__item'}>Общая стоимость</span>
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default CartProductsHeader;