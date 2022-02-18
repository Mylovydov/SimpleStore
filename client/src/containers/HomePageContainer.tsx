import React from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import ProductItem from '../components/ProductItem';
import {useNavigate} from 'react-router-dom';
import {CATALOG_ROUTE, SELECTED_PRODUCT_ROUTE, SHOP_ROUTE} from '../utils/consts';
import useUpdateCartFunctions from '../hooks/useUpdateCartFunctions';
import {addToCart, removeFromCart} from './CatalogPageContainer';

const products = [
    {
        _id: '1',
        orderCounter: 0,
        title: 'Мобильный телефон Samsung Galaxy M12 4/64GB',
        description: '',
        tagsIds: [],
        price: 4399,
        image: '092ca6c3-06dc-4e6d-846a-de345984b949.jpg',
        slug: 'samsung-galaxy-m12',
        createdDate: '',
        updatedDate: ''
    },
    {
        _id: '2',
        orderCounter: 0,
        title: 'Мобильный телефон Samsung Galaxy M12 4/64GB',
        description: '',
        tagsIds: [],
        price: 4399,
        image: '092ca6c3-06dc-4e6d-846a-de345984b949.jpg',
        slug: 'samsung-galaxy-m12',
        createdDate: '',
        updatedDate: ''
    }, {
        _id: '3',
        orderCounter: 0,
        title: 'Мобильный телефон Samsung Galaxy M12 4/64GB',
        description: '',
        tagsIds: [],
        price: 4399,
        image: '092ca6c3-06dc-4e6d-846a-de345984b949.jpg',
        slug: 'samsung-galaxy-m12',
        createdDate: '',
        updatedDate: ''
    }, {
        _id: '4',
        orderCounter: 0,
        title: 'Мобильный телефон Samsung Galaxy M12 4/64GB',
        description: '',
        tagsIds: [],
        price: 4399,
        image: '092ca6c3-06dc-4e6d-846a-de345984b949.jpg',
        slug: 'samsung-galaxy-m12',
        createdDate: '',
        updatedDate: ''
    }
];

const HomePageContainer = () => {

    const navigate = useNavigate();


    const {setProductToCart, removeProductFromCart} = useUpdateCartFunctions();
    const handleSetProductToCart = addToCart(setProductToCart);
    const handleRemoveFromCart = removeFromCart(removeProductFromCart)

    const handleNavProduct = (slug: string) => {
        console.log('slug', slug);
        navigate(`${CATALOG_ROUTE}/${SELECTED_PRODUCT_ROUTE}/${slug}`);
    };

    const newItems = products.map(item => {
        return (
            <ProductItem
                key={item._id}
                product={item}
                onProductClick={handleNavProduct}
                onAddToCartBtnClick={handleSetProductToCart}
                onAddToCartBtnClickAgain={handleRemoveFromCart}
            />
        )
    });

    return (
        <Container>
            <Row className={'mt-4'}>
                <Col md={6}>
                    <div className={'position-relative'} style={{overflow: 'hidden', paddingBottom: '55%'}}>
                        <Image src={'/assets/banner-1.jpg'} style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}/>
                    </div>
                </Col>

                <Col md={6}>

                    <div className={'position-relative'} style={{overflow: 'hidden', paddingBottom: '55%'}}>
                        <Image src={'/assets/banner.jpg'} style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}/>
                    </div>
                </Col>
            </Row>
            <h2
                className={'mb-3 mt-5'}
            >
                Новинки
            </h2>
            <hr/>
            <Row className={'mt-2'}>
                {newItems}
            </Row>
            <h2
                className={'mb-3 mt-5'}
            >
                Популярное
            </h2>
            <hr/>
            <Row>
                {newItems}
            </Row>
        </Container>
    );
};

export default HomePageContainer;