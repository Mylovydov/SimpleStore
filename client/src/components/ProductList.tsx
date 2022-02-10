import React, { FC } from 'react';
import { Row } from 'react-bootstrap';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';
import { SELECTED_PRODUCT_ROUTE } from '../utils/consts';
import { TypeProduct } from '../store/ProductStore';
import CardProdItem from './CardProdItem';

export type TypeProductListProps = {
   products: TypeProduct[]
}

const ProductList: FC<TypeProductListProps> = ({products}) => {
   const navigate = useNavigate()
   
   const handleNavProduct = (slug: string) => {
      navigate(`${SELECTED_PRODUCT_ROUTE}/${slug}`)
   }
   
   return (
      <Row className='d-flex'>
         {products.map((product) => {
            return <CardProdItem key={product._id} product={product} onClick={handleNavProduct}/>
            // return <ProductItem key={product._id} product={product} onClick={handleNavProduct}/>
         })}
      </Row>
   );
}

export default ProductList