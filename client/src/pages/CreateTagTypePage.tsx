import React from 'react';
import {Col, Row} from 'react-bootstrap';
import CreateTagTypeContainer from '../containers/CreateTagTypeContainer';

const CreateTagTypePage = () => {
  return (
    <Row className="d-flex flex-column">
      <Col>
        <h2 className="m-auto text-center">Добавить новый тип</h2>
      </Col>
      <Col className="mt-5">
        <CreateTagTypeContainer/>
      </Col>
    </Row>
  );
};

export default CreateTagTypePage;