import React, {FC, useContext, useEffect} from 'react';
import { Row } from 'react-bootstrap';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';
import { SELECTED_PRODUCT_ROUTE } from '../utils/consts';
import { TypeProduct } from '../store/admin/ProductStore';
import {ShopContext} from './PublicRouter';

export type TypeProductListProps = {
   onClick: (slug: string) => void
   products: any[]
}

const ProductList: FC<TypeProductListProps> = ({ onClick, products }) => {

   return (
      <Row className='d-flex'>
         {products.map((product) => {
            return <ProductItem key={product._id} product={product} onClick={onClick}/>
         })}
      </Row>
   );
}

export default ProductList