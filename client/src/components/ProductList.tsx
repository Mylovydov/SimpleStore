import React, {FC, useContext} from 'react';
import { Row } from 'react-bootstrap';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';
import { SELECTED_PRODUCT_ROUTE } from '../utils/consts';
import { TypeProduct } from '../store/admin/ProductStore';
import {ShopContext} from './PublicRouter';

export type TypeProductListProps = {
   onClick: (slug: string) => void
}

const ProductList: FC<TypeProductListProps> = ({ onClick }) => {
   const {shopProducts} = useContext(ShopContext)
   console.log('ProductListshopProducts.products', shopProducts.products);
   return (
      <Row className='d-flex'>
         {shopProducts.products.map((product) => {
            return <ProductItem key={product._id} product={product} onClick={onClick}/>
         })}
      </Row>
   );
}

export default ProductList