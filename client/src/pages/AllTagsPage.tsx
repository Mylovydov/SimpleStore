import React, {FC} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import TagListContainer from '../containers/TagListContainer';
import {ADMIN_ROUTE, CREATE_TAG_ROUTE} from '../utils/consts';

const AllTagsPage: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Row className="d-flex flex-column">
        <Col className="mb-3">
          <h1 className="mb-5">Теги</h1>
          <Button
            variant="outline-success"
            onClick={() => navigate(ADMIN_ROUTE + CREATE_TAG_ROUTE)}
          >
            Добавить тег
          </Button>
        </Col>
        <Col className="mt-3">
          <TagListContainer/>
        </Col>
      </Row>
    </>
  );
};

export default AllTagsPage;