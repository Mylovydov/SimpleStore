import React, {FC} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import TagTypeListContainer from '../containers/TagTypeListContainer';
import {ADMIN_ROUTE, CREATE_TAGTYPE_ROUTE} from '../utils/consts';

const AllTagTypesPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Row className="d-flex flex-column">
      <Col className="mb-3">
        <h1 className="mb-5">Типы Тегов</h1>
        <Button
          variant="outline-success"
          onClick={() => navigate(ADMIN_ROUTE + CREATE_TAGTYPE_ROUTE)}
        >
          Добавить тип
        </Button>
      </Col>
      <Col className="mt-3">
        <TagTypeListContainer/>
      </Col>
    </Row>
  );
};

export default AllTagTypesPage;