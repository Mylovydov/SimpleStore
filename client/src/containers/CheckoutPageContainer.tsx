import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import CheckoutProductList from '../components/checkout/CheckoutProductList';
import {getTotalCartItemsInfo} from '../utils/getTotalCartItemsInfo';
import {ShopContext} from '../components/PublicRouter';
import CheckoutModal from '../components/modal/CheckoutModal';
import {observer} from 'mobx-react-lite';
import {useGetCartItems} from '../hooks/useGetCartItems';
import useUpdateCartFunctions from '../hooks/useUpdateCartFunctions';
import CheckoutTotalInfoBlock from '../components/checkout/CheckoutTotalInfoBlock';
import {checkout} from '../http/shopAPI/checkoutAPI';
import {TypeCartItem} from '../store/shop/ProductsStore';

export type TypeCustomerDataState = {
  name: string
  email: string
  phone: string
  deliveryAddrs: string
  cartItems: Omit<TypeCartItem, 'image' | 'price' | 'title'>[]
}

const phoneEdit = (value: string) => {
  const regionRegExp = /^\+/;
  const regExp = /^\d/;

  let res = '';

  if (regionRegExp.test(value)) {
    res = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 9)} ${value.substring(9, 11)} ${value.substring(11, value.length)}`.trim();
  }
  if (regExp.test(value)) {
    res = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 8)} ${value.substring(8, value.length)}`.trim();
  }
  return res;
};

const editPhone = (value: string) => {
  const reg = /\W|_|\D/gi;
  return value.replace(reg, '')
}

const phoneIsValid = (value: string) => {
  const regex = /^\+?([0-9]{2})?[-. ]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/;
  return regex.test(value);
};

const CheckoutPageContainer = observer(() => {
  const [validated, setValidated] = useState<boolean>(false);
  const {shopProducts} = useContext(ShopContext);
  const [show, setShow] = useState<boolean>(false);
  const [deliveryType, setDeliveryType] = useState<string>('self-delivery');

  const [customerData, setCustomerData] = useState<TypeCustomerDataState>({
    name: '',
    email: '',
    phone: '',
    deliveryAddrs: '',
    cartItems: []
  });

  useGetCartItems();

  const totalOrderInfo = getTotalCartItemsInfo(shopProducts.cart);

  const {removeProductFromCart, changeQuantity} = useUpdateCartFunctions();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeCustomerData = (key: string, value: string) => {
    switch (key) {
      case 'phone':
        setCustomerData((customerData) => ({
          ...customerData,
          [key]: editPhone(value)
        }));
        break;
      default:
        setCustomerData((customerData) => ({
          ...customerData,
          [key]: value
        }));
    }
  };

  const clearDeliveryAddrs = () => {
    setCustomerData((state => ({
      ...state,
      deliveryAddrs: ''
    })));
  };

  const confirmOrder = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    if (!form.checkValidity() || !phoneIsValid(customerData.phone)) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (phoneIsValid(customerData.phone) && form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      customerData.cartItems = shopProducts.cart.map(cartItem => ({
        _id: cartItem._id,
        quantity: cartItem.quantity
      }));
      checkout(customerData).then(url => {
        window.location = url;
      });
    }
  };

  return (
    <>
      <Container>
        <h1 className={'mt-5'}>
          Оформление заказа
        </h1>
        <Form noValidate validated={validated} onSubmit={confirmOrder}>
          <Row className={'mt-5'}>
            <Col lg={8}>
              <div style={{fontSize: 18}}>
                Ваши контактные данные
              </div>
              <Row className="mt-3">
                <Form.Group as={Col} lg={6} controlId="validationCustomName">
                  <Form.Control
                    value={customerData.name}
                    onChange={(e) => onChangeCustomerData('name', e.target.value)}
                    required
                    type="text"
                    style={{height: 50}}
                    placeholder={'Введите имя...'}
                  />
                  <Form.Control.Feedback type="invalid">
                    Введите Ваше имя
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} lg={6} controlId="validationCustomEmail">
                  <Form.Control
                    value={customerData.email}
                    onChange={(e) => onChangeCustomerData('email', e.target.value)}
                    required
                    type="email"
                    style={{height: 50}}
                    placeholder={'Введите email...'}
                  />
                  <Form.Control.Feedback type="invalid">
                    Введите Ваш email
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group as={Col} className="mt-3" controlId="validationCustomPhone">
                <Form.Control
                  value={customerData.phone}
                  onChange={(e) => onChangeCustomerData('phone', e.target.value)}
                  required
                  placeholder='Введите телефон'
                  type="tel"
                  style={{height: 50}}
                />
                <Form.Control.Feedback type="invalid">
                  Введите Ваш телефон
                </Form.Control.Feedback>
              </Form.Group>
              <div className={'mt-5'}>
                <div style={{fontSize: 18}}>
                  Данные доставки
                </div>
                <Form.Group as={Col} className="mt-3">
                  <Form.Check
                    onClick={() => clearDeliveryAddrs()}
                    onChange={(e) => setDeliveryType(e.target.value)}
                    type="radio"
                    checked={deliveryType === 'self-delivery'}
                    // defaultChecked
                    label="Самовывоз"
                    value="self-delivery"
                    name="delivery"
                    id={`;
      radio - 1`
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} className="mt-2">
                  <Form.Check
                    onChange={(e) => setDeliveryType(e.target.value)}
                    className={'mt-2'}
                    type="radio"
                    checked={deliveryType === 'addressDelivery'}
                    label="Адресная доставка"
                    name="delivery"
                    value="addressDelivery"
                    id={
                      `;
      radio - 2`
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} className="mt-3">
                  <Form.Control
                    className={'mt-3'}
                    required
                    disabled={deliveryType !== 'addressDelivery'}
                    value={customerData.deliveryAddrs}
                    onChange={(e) => onChangeCustomerData('deliveryAddrs', e.target.value)}
                    type="text"
                    style={{height: 50, transition: '.2s linear'}}
                    placeholder={'Введите адрес доставки...'}
                  />
                </Form.Group>
              </div>
              <div className={'mt-5'}>
                <Row>
                  <Col lg={6}>
                    <h3 style={{margin: 0}}>Ваш заказ</h3>
                  </Col>
                  <Col lg={3} className={'d-flex align-items-center'}>
                    <p style={{margin: 0}}>на сумму: {totalOrderInfo.paymentAmount.toLocaleString('ru-RU') + ' ₴'}</p>
                  </Col>
                  <Col lg={3} className={'d-flex justify-content-end'}>
                    <Button
                      variant={'outline-dark'}
                      onClick={handleShow}
                      className={'ms-3'}
                    >
                      Редактировать
                    </Button>
                  </Col>
                </Row>
                <CheckoutProductList
                  cartProducts={shopProducts.cart}
                />
              </div>
            </Col>
            <Col lg={4}>
              <CheckoutTotalInfoBlock
                totalOrderInfo={totalOrderInfo}
              />
            </Col>
          </Row>
        </Form>
      </Container>

      <CheckoutModal
        onRemoveCartItem={removeProductFromCart}
        onChangeQuantity={changeQuantity}
        show={show}
        handleClose={handleClose}
        cartProducts={shopProducts.cart}
      />
    </>
  );
});

export default CheckoutPageContainer;