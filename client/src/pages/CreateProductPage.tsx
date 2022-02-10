import React, { useContext } from 'react';
import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap';
import CreateProductContainer from '../containers/CreateProductContainer';

const CreateProduct = () => {

   return (
      <Row  className='d-flex flex-column'>
         <Col>
            <h2 className='m-auto text-center'>Добавить новый продукт</h2>
         </Col>
         <Col className='mt-5'>
            <CreateProductContainer />
         </Col>
      </Row>
   );
};

export default CreateProduct;