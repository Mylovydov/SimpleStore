import React from 'react';
import {Button, Card, Container} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {
  ADMIN_ROUTE,
  ADMINS_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  TAGS_ROUTE,
  STATISTICS_ROUTE, TAGTYPES_ROUTE
} from '../utils/consts';


const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
    >
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">Панель администратора</h2>
        <Button
          onClick={() => navigate(ADMIN_ROUTE + PRODUCTS_ROUTE)}
          size="lg"
          variant="outline-dark"
          className="mb-3 mt-4"
        >
          Продукты
        </Button>
        <Button
          onClick={() => navigate(ADMIN_ROUTE + TAGTYPES_ROUTE)}
          size="lg"
          variant="outline-dark"
          className="mb-3"
        >
          Типы
        </Button>
        <Button
          onClick={() => navigate(ADMIN_ROUTE + TAGS_ROUTE)}
          size="lg"
          variant="outline-dark"
          className="mb-3"
        >
          Теги
        </Button>
        <Button
          onClick={() => navigate(ADMIN_ROUTE + ORDERS_ROUTE)}
          size="lg"
          variant="outline-dark"
          className="mb-3"
        >
          Заказы
        </Button>
        <Button
          onClick={() => navigate(ADMIN_ROUTE + ADMINS_ROUTE)}
          size="lg"
          variant="outline-dark"
          className="mb-3"
        >
          Администраторы
        </Button>
        <Button
          onClick={() => navigate(ADMIN_ROUTE + STATISTICS_ROUTE)}
          size="lg"
          variant="outline-dark"
        >
          Статистика
        </Button>
      </Card>
    </Container>
  );
};
export default AdminPage;