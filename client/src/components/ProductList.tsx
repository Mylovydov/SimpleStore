import React, {FC} from 'react';
import {Row} from 'react-bootstrap';
import ProductItem from './ProductItem';
import {TypeProduct} from '../store/admin/ProductStore';

export type TypeProductListProps = {
  onProductClick: (slug: string) => void
  products: TypeProduct[]
  onAddToCartBtnClick: (product: TypeProduct) => void
  onAddToCartBtnClickAgain: (id: string) => void
}

const ProductList: FC<TypeProductListProps> = ({
                                                 onProductClick,
                                                 products,
                                                 onAddToCartBtnClick,
                                                 onAddToCartBtnClickAgain
                                               }) => {

  return (
    <Row className="d-flex">
      {products.map((product) => {
        return (
          <ProductItem
            key={product._id}
            product={product}
            onProductClick={onProductClick}
            onAddToCartBtnClick={onAddToCartBtnClick}
            onAddToCartBtnClickAgain={onAddToCartBtnClickAgain}
          />
        );
      })}
    </Row>
  );
};

export default ProductList;