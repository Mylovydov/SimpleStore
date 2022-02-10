import React, { FC } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { TypeProduct } from '../store/ProductStore';

export type TypeProductItem = {
   product: TypeProduct
   onClick: (slig: string) => void
}

const CardProdItem: FC<TypeProductItem> = ({ product, onClick }) => {
   return (
      <Col md={4} style={{marginBottom: 20}}>
         <Card >
            <Card.Img 
               height={300}
               width={200}
               style={{objectFit: 'cover'}}
               variant="top" 
               src={`${process.env.REACT_APP_API_URL}${product.image}`} 
            />
            <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
               {product.description}
            </Card.Text>
            <div className='d-flex align-items-center justify-content-between'>
               <div style={{fontSize: 24, color: '#198754'}}>
                  {product.price +'₴'}
               </div>
               <Button 
                  className='d-flex justify-content-center align-items-center' 
                  style={{height: 35, width: 35}} variant="success"
               >
                  <img style={{width: 18, height: 18}} src="/assets/cart.svg" alt="dvsvs" />
               </Button>
            </div>

            <Button 
               className='mt-3'
               style={{width: '100%'}}
               variant='outline-dark' 
               onClick={() => onClick(product.slug)}
            >
               Подробнее
            </Button>
            </Card.Body>
         </Card>
      </Col>
   );
};

export default CardProdItem;