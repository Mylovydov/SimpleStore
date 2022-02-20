import {observer} from 'mobx-react-lite';
import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import StatisticsPageContainer from '../containers/StatisticsPageContainer';
import AdminLayout from './layout/AdminLayout';
import {authRoutes} from '../routes';
import AdministratorsStore, {IAdministratorsStore} from '../store/admin/AdministratorsStore';
import AdminStore, {IAdminStore} from '../store/admin/AdminStore';
import ProductStore, {IProductStore} from '../store/admin/ProductStore';
import TagStore, {ITagStore} from '../store/admin/TagStore';
import TagTypeStore, {ITagTypeStore} from '../store/admin/TagTypeStore';
import {ADMIN_ROUTE, LOGIN_ROUTE} from '../utils/consts';
import {check} from '../http/adminAPI/authAPI';
import {Spinner} from 'react-bootstrap';

export type TypeAdminContext = {
  admin: IAdminStore
  product: IProductStore
  administrators: IAdministratorsStore
  tagType: ITagTypeStore
  tag: ITagStore
}

export const Context = createContext<TypeAdminContext>({
  admin: AdminStore,
  product: ProductStore,
  administrators: AdministratorsStore,
  tagType: TagTypeStore,
  tag: TagStore
});

const AdminRouter: FC = observer(() => {
  const {admin} = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(_id => {
      admin.setAdmin({_id});
      admin.setIsAuth(true);
    }).catch((e) => {
      navigate(LOGIN_ROUTE);
      alert(e.response.data.message);
    })
      .finally(() => setLoading(false));
  }, []);


  if (loading) {
    return <Spinner animation="border"/>;
  }

  return (
    <Context.Provider value={{
      admin: AdminStore,
      product: ProductStore,
      administrators: AdministratorsStore,
      tagType: TagTypeStore,
      tag: TagStore
    }}>
      <Routes>
        {admin.isAuth &&
        <Route path="/" element={<AdminLayout/>}>
            <Route index element={<StatisticsPageContainer/>}/>
          {authRoutes.map(({path, Component}) => {
            return <Route key={path} path={path} element={Component}/>;
          })}
        </Route>
        }
        <Route path={'*'} element={<Navigate to={ADMIN_ROUTE}/>}/>
      </Routes>
    </Context.Provider>
  );
});

export default AdminRouter;