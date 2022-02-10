import React, {FC} from 'react';
import {Button, Card, Col, Image} from 'react-bootstrap';
import {TypeProduct} from '../store/admin/ProductStore';

export type TypeProductItem = {
    product: TypeProduct
    onClick: (slug: string) => void
}

const ProductItem: FC<TypeProductItem> = ({product, onClick}) => {

    return (
        <Col md={3} style={{marginBottom: 20}}>
            <Card style={{minHeight: 400, width: '100%', flexDirection: 'column', padding: '0 0 25px 0'}}>
                <Col style={{cursor: 'pointer', padding: '0 25px'}} onClick={() => onClick(product.slug)}>
                    <div
                        style={{position: 'relative', width: '100%', paddingBottom: '130%', overflow: 'hidden'}}
                    >
                        <Image src={`${process.env.REACT_APP_API_URL}${product.image}`} className='img-absolute'/>
                    </div>
                    <h5
                        style={{cursor: 'pointer'}}
                    >
                        {product.title}
                    </h5>
                </Col>

                <Col style={{padding: '0 25px'}} className={'mt-2 d-flex align-items-center justify-content-between'}>
                    <div style={{fontSize: 24, color: '#198754'}}>
                        {product.price + '₴'}
                    </div>
                    <Button
                        className='d-flex justify-content-center align-items-center ms-2'
                        style={{height: 35, width: 35}} variant="success"
                    >
                        <img style={{width: 18, height: 18}} src="/assets/cart.svg" alt="cart-icon" />
                    </Button>
                </Col>

            </Card>
        </Col>
    );
};

export default ProductItem;