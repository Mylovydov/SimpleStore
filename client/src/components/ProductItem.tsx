import React, {FC, useContext} from 'react';
import {Button, Card, Col, Image} from 'react-bootstrap';
import {TypeProduct} from '../store/admin/ProductStore';
import {ShopContext} from './PublicRouter';
import {observer} from 'mobx-react-lite';
import useUpdateBasketFunctions from '../hooks/useUpdateCartFunctions';

export type TypeProductItem = {
    product: TypeProduct
    onClick: (slug: string) => void
    onAddToCart: (id: string) => void
}

const ProductItem: FC<TypeProductItem> = observer(({product, onClick, onAddToCart}) => {
    const {shopProducts} = useContext(ShopContext);

    return (
        <Col lg={3} style={{marginBottom: 20}}>
            <Card style={{minHeight: 300, width: '100%', padding: '0 0 25px 0'}}>
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        paddingBottom: '120%',
                        overflow: 'hidden',
                        cursor: 'pointer'
                    }}
                    onClick={() => onClick(product.slug)}
                >
                    <Image src={`${process.env.REACT_APP_API_URL}${product.image}`} className="img-absolute"/>
                </div>
                <h6
                    style={{
                        cursor: 'pointer',
                        padding: '0 25px',
                        marginTop: 20,
                        marginBottom: 0,
                        fontSize: 14,
                        fontWeight: 400,
                        color: '#221f1f'
                    }}
                >
                    {product.title.slice(0, 40) + '...'}
                </h6>

                <Col style={{padding: '0 25px'}} className={'mt-4 d-flex align-items-center justify-content-between'}>
                    <div style={{fontSize: 24, color: '#198754'}}>
                        <span style={{display: 'block', fontSize: 12, color: '#8d8d8d'}}>Цена</span>
                        {product.price.toLocaleString('ru-RU') + '₴'}
                    </div>
                    <Button
                        className="d-flex justify-content-center align-items-center ms-2"
                        style={{height: 35, width: 35}} variant="success"
                    >
                        <img
                            onClick={() => onAddToCart(product._id)}
                            style={{width: 18, height: 18}}
                            src="/assets/cart.svg"
                            alt="cart-icon"
                        />
                    </Button>
                </Col>

            </Card>
        </Col>
    );
});

export default ProductItem;