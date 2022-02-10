import React, { FC } from 'react';
import { Row } from 'react-bootstrap';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';
import { SELECTED_PRODUCT_ROUTE } from '../utils/consts';
import { TypeProduct } from '../store/admin/ProductStore';

export type TypeProductListProps = {
   products: TypeProduct[]
   onClick: (slug: string) => void
}

const ProductList: FC<TypeProductListProps> = ({products, onClick}) => {
   
   return (
      <Row className='d-flex'>
         {products.map((product) => {
            return <ProductItem key={product._id} product={product} onClick={onClick}/>
         })}
      </Row>
   );
}

export default ProductList