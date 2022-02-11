import React, {useState} from 'react';
import {Button, Col, Container, Form, FormControl, Nav, Row} from 'react-bootstrap';
import {NavLink, useNavigate} from 'react-router-dom';
import CartModal from '../components/CartModal';
import {CATALOG_ROUTE, SHOP_ROUTE} from '../utils/consts';

const NavBarContainer = () => {

    const [modalVisible, setVisible] = useState(false)
    const navigate = useNavigate()

    return (
        <Container>
            <Row className='d-flex align-items-center w-100'>
                <Col lg={2}>
                    <NavLink
                        to={SHOP_ROUTE}
                        style={{color: 'white', textDecoration: 'none', fontSize: 22}}
                    >
                        SimpleStore
                    </NavLink>
                </Col>
                <Col lg={2}>
                    <Button
                        variant="secondary"
                        className={'w-100 catalog-btn'}
                        onClick={() => navigate(CATALOG_ROUTE + '/')}
                    >
                        Каталог
                    </Button>
                </Col>
                <Col lg={6} className={'d-flex'}>
                    <FormControl
                        type="text"
                        placeholder="Поиск..."
                    />
                    <Button
                        variant={"success"}
                        className="ms-2"
                    >
                        Найти
                    </Button>
                </Col>
                <Col lg={2} className={'d-flex justify-content-end'}>
                    <Button
                        variant="dark"
                        style={{height: 38}}
                        onClick={() => setVisible(true)}
                        className={'d-flex align-items-center justify-content-center'}
                    >
                        Корзина
                        <img
                            className={'ms-2'}
                            src="/assets/cart.svg"
                            alt="cart-icon"
                            style={{width: 20, height: 20}}
                        />
                    </Button>
                </Col>
            </Row>
            <CartModal show={modalVisible} onHide={() => setVisible(false)}/>
        </Container>
    );
};

export default NavBarContainer