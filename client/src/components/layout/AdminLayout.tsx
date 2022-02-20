import React from 'react';
import {Col, Container} from 'react-bootstrap';
import {Outlet} from 'react-router-dom';
import AdminSidebar from '../AdminSidebar';

const AdminLayout = () => {
  return (
    <>
      <Col className="d-flex flex-column position-fixed" style={{width: 300}}>
        <AdminSidebar/>
      </Col>
      <div style={{paddingLeft: 300}}>
        <Container style={{maxWidth: 1300, paddingTop: 70}}>
          <Outlet/>
        </Container>
      </div>
    </>
  );
};

export default AdminLayout;