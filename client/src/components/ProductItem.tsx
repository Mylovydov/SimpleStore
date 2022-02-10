import React, { FC } from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';
import { TypeProduct } from '../store/ProductStore';

export type TypeProductItem = {
   product: TypeProduct
   onClick: (slig: string) => void
}

const ProductItem: FC<TypeProductItem> = ({product, onClick}) => {

   return (
      <Col md={3} style={{marginBottom: 20}}>
         <Card style={{minHeight: 400, width: '100%'}}>
            <div style={{position: 'relative', width: '100%', paddingBottom: '130%', overflow: 'hidden'}}>
               <Image src={`${process.env.REACT_APP_API_URL}${product.image}`} className='img-absolute'/>
            </div>
            <div style={{padding: 20}}>
               <h5>{product.title}</h5>
               <div style={{marginTop: 20, fontSize: 24, color: '#198754'}}>
                  {product.price +'₴'}
               </div>
               <div style={{marginTop: 20}}>
                  <Button 
                     style={{width: '100%'}}
                     variant='outline-dark' 
                     onClick={() => onClick(product.slug)}
                  >
                     Подробнее
                  </Button>
                  <Button 
                     className='mt-2'
                     style={{width: '100%'}}
                     variant='outline-success'
                  >
                     Добавить в корзину
                  </Button>
               </div>
            </div>
         </Card>
      </Col>
   );
};

export default ProductItem;