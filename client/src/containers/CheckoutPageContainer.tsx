import React, {useContext, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import CheckoutProductList from '../components/checkout/CheckoutProductList';
import {getTotalCartItemsInfo} from '../utils/getTotalCartItemsInfo';
import {ShopContext} from '../components/PublicRouter';
import CheckoutModal from '../components/modal/CheckoutModal';
import {observer} from 'mobx-react-lite';
import {useGetCartItems} from '../hooks/useGetCartItems';
import useUpdateCartFunctions from '../hooks/useUpdateCartFunctions';
import CheckoutTotalInfoBlock from '../components/checkout/CheckoutTotalInfoBlock';


const CheckoutPageContainer = observer(() => {
  const [validated, setValidated] = useState(false);
  const {shopProducts} = useContext(ShopContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {removeProductFromCart, changeQuantity} = useUpdateCartFunctions();
  useGetCartItems();

  const totalOrderInfo = getTotalCartItemsInfo(shopProducts.cart);

  return (
    <>
      <Container>
        <h1 className={'mt-5'}>
          Оформление заказа
        </h1>
        <Row className={'mt-4'}>
          <Col lg={8}>
            <div>
              <div>Ваши контактные данные</div>
              <Form
                noValidate
                validated={validated}
                className="d-flex flex-column"
              >
                <Row className="mt-3">
                  <Form.Group as={Col} lg={6}>
                    <Form.Control
                      required
                      type="text"
                      style={{height: 50}}
                      placeholder={'Введите имя...'}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} lg={6}>
                    <Form.Control
                      required
                      type="email"
                      style={{height: 50}}
                      placeholder={'Введите email...'}
                    />
                  </Form.Group>
                </Row>
                <Form.Group as={Col} className="mt-3">
                  <Form.Control
                    required
                    type="tel"
                    style={{height: 50}}
                    placeholder={'Введите номер телефона...'}
                  />
                </Form.Group>
              </Form>
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