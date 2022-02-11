import React, { FC, useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { getOneProduct } from '../http/shopAPI/productAPI';
import { TypeProduct } from '../store/admin/ProductStore';
import { SHOP_ROUTE } from '../utils/consts';

const ProductPage: FC = () => {

    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState<TypeProduct>({
        _id: '',
        title: '',
        price: 0,
        image: '',
        description: '',
        orderCounter: 0,
        tagsIds: [''],
        slug: '',
        createdDate: '',
        updatedDate: '',
    })
    
    const {slug} = useParams()

    useEffect(() => {
        getOneProduct(slug as string)
            .then(product => setProduct(product))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <Spinner
                animation='border'
                style={{position: 'absolute', top: '50%', left: '50%'}}
            />
        )
    }
    
    return (
        <Container>
            <Row className='mt-4'>
                <Col md={6} className='pe-5'>
                    <div style={{
                        position: 'relative', 
                        paddingBottom: '80%', 
                        overflow: 'hidden',
                        minHeight: 600
                    }}>
                        <img className='img-absolute' src={`${process.env.REACT_APP_API_URL}${product.image}`} alt=''/>
                    </div>
                </Col>
                <Col md={6} className='ps-5 pt-4 pb-4 d-flex flex-column'>
                    <NavLink
                        to={SHOP_ROUTE}
                        style={{textDecoration: 'none', color: '#198754', marginBottom: 30}}
                    >
                        Вернуться в магазин
                    </NavLink>
                    <div>
                        <h2>{product.title}</h2>
                    </div>
                    <div style={{marginTop: 20}}>
                        <p>{product.description}</p>
                    </div>
                    <div style={{marginTop: 20, fontSize: 42, color: '#212529', fontWeight: 500}}>
                        <p>{product.price.toLocaleString('ru-RU') + '₴'}</p>
                    </div>
                    <div>
                        <Button variant="outline-success" size="lg">Добавить в корзину</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductPage