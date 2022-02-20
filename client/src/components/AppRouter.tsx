import React, {FC} from 'react';
import {Routes, Route} from 'react-router-dom';
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from '../utils/consts';
import AdminRouter from './AdminRouter';
import PublicRouter from './PublicRouter';
import AuthPage from '../pages/AuthPage';

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={ADMIN_ROUTE + '/*'} element={<AdminRouter/>}/>
      <Route path={SHOP_ROUTE + '*'} element={<PublicRouter/>}/>
      <Route path={LOGIN_ROUTE} element={<AuthPage/>}/>
    </Routes>
  );
};

export default AppRouter;