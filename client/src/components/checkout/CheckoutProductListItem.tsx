import React, {FC} from 'react';
import {Button, ButtonGroup, CloseButton, Col, ListGroup, Row} from 'react-bootstrap';
import {TypeCartItem} from '../../store/shop/ProductsStore';


export type TypeCheckoutProductListItemProps = {
  product: TypeCartItem
}

const CheckoutProductListItem: FC<TypeCheckoutProductListItemProps> = ({product}) => {

  return (
    <ListGroup.Item className={'basket-item'}>
      <Row className={'align-items-center'}>
        <Col lg={6}>
          <div className={'d-flex align-items-center'}>
            <div className={'checkout-cart-image'}>
              <img alt={'product image'}
                   src={`${process.env.REACT_APP_API_URL}${product.image}`}
              />
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
        <Col lg={2}>
          <div style={{textAlign: 'center'}}>
                        <span style={{fontSize: 12, color: '#787878', display: 'block'}}>
                            Цена
                        </span>
            {product.price.toLocaleString('ru-RU') + ' ₴'}
          </div>
        </Col>
        <Col lg={2}>
          <div style={{textAlign: 'center'}}>
                        <span style={{fontSize: 12, color: '#787878', display: 'block'}}>
                            Количество
                        </span>
            {product.quantity}
          </div>
        </Col>
        <Col lg={2}>
          <div className={'d-flex align-items-center justify-content-between'}>
            <div>
                            <span style={{fontSize: 12, color: '#787878', display: 'block'}}>
                                Сумма
                            </span>
              {(product.quantity * product.price).toLocaleString('ru-RU') + ' ₴'}
            </div>
            {/*<CloseButton onClick={() => onRemoveCartItem(product._id)}/>*/}
          </div>
        </Col>

      </Row>
    </ListGroup.Item>
  );
};

export default CheckoutProductListItem;