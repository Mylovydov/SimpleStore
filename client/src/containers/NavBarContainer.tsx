import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {Badge, Button, Col, Container, FormControl, Row} from 'react-bootstrap';
import {NavLink, useNavigate} from 'react-router-dom';
import CartModal from '../components/CartModal';
import {BASKET_ROUTE, CATALOG_ROUTE, SEARCH_ROUTE, SHOP_ROUTE} from '../utils/consts';
import {ShopContext} from '../components/PublicRouter';
import {observer} from 'mobx-react-lite';

const NavBarContainer = observer(() => {
    const {shopProducts} = useContext(ShopContext);

    const [modalVisible, setVisible] = useState(false);
    const [search, setSearch] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const storeCartData = shopProducts.cart;

        if (!(storeCartData.length)) {
            let storageCartData = localStorage.getItem('cart');
            storageCartData && shopProducts.setCart(JSON.parse(storageCartData));
        }
    }, []);

    const onSearchProducts = () => {
        if (search) {
            navigate(`${SEARCH_ROUTE}/search=${encodeURIComponent(search)};`);
            setSearch('');
        }
    };

    return (
        <Container>
            <Row className="d-flex align-items-center w-100">
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
                        onClick={() => navigate(CATALOG_ROUTE)}
                    >
                        Каталог
                    </Button>
                </Col>
                <Col lg={6} className={'d-flex'}>
                    <FormControl
                        value={search}
                        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearch(e.target.value.trim().toLocaleLowerCase())}
                        type="text"
                        placeholder="Поиск..."
                    />
                    <Button
                        variant={'success'}
                        className="ms-2"
                        onClick={onSearchProducts}
                    >
                        Найти
                    </Button>
                </Col>
                <Col lg={2} className={'d-flex justify-content-end'}>
                    <Button
                        variant="dark"
                        style={{height: 38}}
                        onClick={() => navigate(BASKET_ROUTE)}
                        className={'d-flex align-items-center justify-content-center'}
                    >
                        Корзина
                        <img
                            className={'ms-2'}
                            src="/assets/cart.svg"
                            alt="cart-icon"
                            style={{width: 20, height: 20}}
                        />
                        {
                            shopProducts.cart.length >= 1 &&
                            <Badge
                                className={'ms-3'}
                                bg="success"
                            >
                                {shopProducts.cart.length}
                            </Badge>
                        }
                    </Button>
                </Col>
            </Row>
            <CartModal show={modalVisible} onHide={() => setVisible(false)}/>
        </Container>
    );
});

export default NavBarContainer;