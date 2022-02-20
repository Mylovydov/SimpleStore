import React, {FC} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import ProductListContainer from '../containers/ProductListContainer';
import {ADMIN_ROUTE, CREATE_PRODUCTS_ROUTE} from '../utils/consts';

const AllProductsPage: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Row className="d-flex flex-column">
        <Col className="mb-3">
          <h1 className="mb-5">Продукты</h1>
          <Button
            variant="outline-success"
            onClick={() => navigate(ADMIN_ROUTE + CREATE_PRODUCTS_ROUTE)}
          >
            Добавить продукт
          </Button>
        </Col>
        <Col className="mt-3">
          <ProductListContainer/>
        </Col>
      </Row>
    </>
  );
};

export default AllProductsPage;