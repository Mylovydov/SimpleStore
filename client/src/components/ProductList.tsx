import React, {FC} from 'react';
import {Row} from 'react-bootstrap';
import ProductItem from './ProductItem';

export type TypeProductListProps = {
    onClick: (slug: string) => void
    products: any[]
    onAddToCart: (id: string) => void
}

const ProductList: FC<TypeProductListProps> = ({onClick, products, onAddToCart}) => {

    return (
        <Row className="d-flex">
            {products.map((product) => {
                return (
                    <ProductItem
                        key={product._id}
                        product={product}
                        onClick={onClick}
                        onAddToCart={onAddToCart}
                    />
                );
            })}
        </Row>
    );
};

export default ProductList;