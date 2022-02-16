import React, { useContext } from 'react';
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
   ADMIN_ROUTE,
   ORDERS_ROUTE,
   PRODUCTS_ROUTE,
   TAGS_ROUTE,
   CREATE_ADMIN_ROUTE,
   CREATE_ORDER_ROUTE,
   CREATE_PRODUCTS_ROUTE,
   CREATE_TAGTYPE_ROUTE,
   CREATE_TAG_ROUTE,
   CURRENT_ADMIN_SETTINGS_ROUTE,
   LOGIN_ROUTE,
   STATISTICS_ROUTE,
   TAGTYPES_ROUTE, ADMINS_ROUTE
} from '../utils/consts';
import { Context } from '../components/AdminRouter';


const AdminSydebar = () => {
   const navigate = useNavigate()
   const {admin} = useContext(Context)

   const logOut = () => {
      admin.setAdmin({_id: ''})
      admin.setIsAuth(false)
      localStorage.removeItem('token')
      
      navigate(LOGIN_ROUTE)
   }

   const location = useLocation()

   return (
      <Container
         style={{backgroundColor: '#212529', height: '100vh'}}
         className={'ps-4 pt-5 pb-5 pe-4'}
      >
         <Row className='d-flex flex-column' style={{height: '100%'}}>
            <Col style={{flex: '0 0 120px'}}>
                  <h1 style={{fontSize: 32, color: 'white'}}>
                     SimpleStore
                  </h1>
               <span style={{fontSize: 13, color: '#9f9f9f'}}>
                  ПАНЕЛЬ АДМИНИСТРАТОРА
               </span>
            </Col>
            <Col className='p-0' style={{flex: '1 1 auto'}}>
               <Nav defaultActiveKey={STATISTICS_ROUTE} className="d-flex flex-column" as='ul'>
                  <Nav.Item as='li'>
                     <Nav.Link
                        active={
                           location.pathname === ADMIN_ROUTE + PRODUCTS_ROUTE ||
                           location.pathname === ADMIN_ROUTE + CREATE_PRODUCTS_ROUTE ? true : false
                        }
                        eventKey={PRODUCTS_ROUTE}
                        onClick={() => navigate(ADMIN_ROUTE + PRODUCTS_ROUTE)}
                        className='sidebar-link'
                     >
                        Продукты
                     </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as='li'>
                     <Nav.Link 
                        active={
                           location.pathname === ADMIN_ROUTE + TAGTYPES_ROUTE ||
                           location.pathname === ADMIN_ROUTE + CREATE_TAGTYPE_ROUTE ? true : false
                        }
                        eventKey={TAGTYPES_ROUTE}
                        onClick={() => navigate(ADMIN_ROUTE + TAGTYPES_ROUTE)}
                        className='sidebar-link'
                     >
                        Типы
                     </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as='li'>
                     <Nav.Link 
                        active={
                           location.pathname === ADMIN_ROUTE + TAGS_ROUTE ||
                           location.pathname === ADMIN_ROUTE + CREATE_TAG_ROUTE ? true : false
                        }
                        eventKey={TAGS_ROUTE}
                        onClick={() => navigate(ADMIN_ROUTE + TAGS_ROUTE)}
                        className='sidebar-link'
                     >
                        Теги
                     </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as='li'>
                     <Nav.Link 
                        active={
                           location.pathname === ADMIN_ROUTE + ORDERS_ROUTE ||
                           location.pathname === ADMIN_ROUTE + CREATE_ORDER_ROUTE ? true : false
                        }
                        eventKey={ORDERS_ROUTE}
                        onClick={() => navigate(ADMIN_ROUTE + ORDERS_ROUTE)}
                        className='sidebar-link'
                     >
                        Заказы
                     </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as='li'>
                     <Nav.Link 
                        active={
                           location.pathname === ADMIN_ROUTE + ADMINS_ROUTE ||
                           location.pathname === ADMIN_ROUTE + CREATE_ADMIN_ROUTE ? true : false
                        }
                        eventKey={ADMINS_ROUTE}
                        onClick={() => navigate(ADMIN_ROUTE + ADMINS_ROUTE)}
                        className='sidebar-link'
                     >
                        Администраторы
                     </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as='li'>
                     <Nav.Link 
                        active={
                           location.pathname === ADMIN_ROUTE + STATISTICS_ROUTE ? true : false
                        }
                        eventKey={STATISTICS_ROUTE} 
                        onClick={() => navigate(ADMIN_ROUTE + STATISTICS_ROUTE)} 
                        className='sidebar-link'
                     >
                        Статистика
                     </Nav.Link>
                  </Nav.Item>
               </Nav>
            </Col>
            <Col className='d-flex flex-column' style={{flex: '0 0 100px'}}>
               <Button 
                  onClick={() => navigate(ADMIN_ROUTE + CURRENT_ADMIN_SETTINGS_ROUTE)}
                  variant="outline-light" 
               >
                  Настройки
               </Button>
               <Button 
                  variant="success" 
                  className='mt-3'
                  onClick={() => {
                     logOut()
                  }}
               >
                  Выйти
               </Button>
               </Col>
         </Row>
      </Container>
   );
};


// const AdminSydebar = () => {
//    const navigate = useNavigate()
   
//    return (
//       <Container
//          style={{backgroundColor: '#212529', height: '100vh'}}
//          className={'ps-4 pt-5 pb-5'}
//       >
//          <Row className='d-flex flex-column'>
//             <Col >
//                <NavLink 
//                   to={ADMIN_ROUTE} 
//                   style={{color: 'white', textDecoration: 'none', fontSize: 30}} 
//                >
//                   <h1>SimpleStore</h1>
//                </NavLink>
//             </Col>
//             <Col className='mt-5 p-0'>
//                <Nav defaultActiveKey={STATISTICS_ROUTE} className="d-flex flex-column" as='ul'>
//                   <Nav.Item as='li'>
//                      <Nav.Link eventKey={ALL_PRODUCTS_ROUTE} onClick={() => navigate(ADMIN_ROUTE + ALL_PRODUCTS_ROUTE)} className='sidebar-link'>Продукты</Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item as='li'>
//                      <Nav.Link eventKey={ALL_TAGTYPES_ROUTE} onClick={() => navigate(ADMIN_ROUTE + ALL_TAGTYPES_ROUTE)} className='sidebar-link'>Типы</Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item as='li'>
//                      <Nav.Link eventKey={ALL_TAGS_ROUTE} onClick={() => navigate(ADMIN_ROUTE + ALL_TAGS_ROUTE)} className='sidebar-link' >Теги</Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item as='li'>
//                      <Nav.Link eventKey={ALL_ORDERS_ROUTE} onClick={() => navigate(ADMIN_ROUTE + ALL_ORDERS_ROUTE)} className='sidebar-link' >Заказы</Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item as='li'>
//                      <Nav.Link eventKey={ALL_ADMINS_ROUTE} onClick={() => navigate(ADMIN_ROUTE + ALL_ADMINS_ROUTE)} className='sidebar-link' >Администраторы</Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item as='li'>
//                      <Nav.Link eventKey={STATISTICS_ROUTE} onClick={() => navigate(STATISTICS_ROUTE)} className='sidebar-link' >Статистика</Nav.Link>
//                   </Nav.Item>
//                </Nav>
//                </Col>
//          </Row>
//       </Container>
//    );
// };
export default AdminSydebar;