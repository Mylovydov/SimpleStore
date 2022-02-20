import React from 'react';
import CheckoutPageContainer from '../containers/CheckoutPageContainer';
import {Container, Navbar} from 'react-bootstrap';

const CheckoutPage = () => {
  return (
    <>
      <Navbar
        className="pt-3 pb-3"
        bg="light"
        style={{borderBottom: '1px solid #eee'}}
      >
        <Container>
          <div
            style={{color: '#212529', fontSize: 22}}
          >
            SimpleStore
          </div>
        </Container>
      </Navbar>
      <CheckoutPageContainer/>
    </>
  );
};

export default CheckoutPage;