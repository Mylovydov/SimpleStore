import React, { useState } from 'react';
import { Button, Col, Container, Form, FormControl, Nav, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import CartModal from '../components/CartModal';
import { SHOP_ROUTE } from '../utils/consts';

const NavBarContainer = () => {

   const [modalVisible, setVisible] = useState(false)

   return (
      <Container>
            <Row className='d-flex justify-content-between align-items-center w-100'>
               <Col sm={3}>
                  <NavLink 
                     to={SHOP_ROUTE} 
                     style={{color: 'white', textDecoration: 'none', fontSize: 22}} 
                  >
                     SimpleStore
                  </NavLink>
               </Col>
               <Col sm={6}>
                  <Form className="d-flex">
                        <FormControl type="text" 
                           placeholder="Поиск..." 
                           className="mr-2"
                        />
                  </Form>
               </Col>
               <Col sm={3}>
                  <Nav className="ml-auto" style={{color: 'white'}} >
                     <Button 
                        variant="success"
                        onClick={() => setVisible(true)}
                     >
                        Корзина
                     </Button>
                  </Nav>
               </Col>
            </Row>
            <CartModal show={modalVisible} onHide={() => setVisible(false)}/>
      </Container>
   );
};

export default NavBarContainer