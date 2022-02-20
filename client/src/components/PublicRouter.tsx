import React, {createContext, FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import PublicLayout from './layout/PublicLayout';
import {publicRoutes} from '../routes';
import ProductsStore, {IProductsStore} from '../store/shop/ProductsStore';
import {CATALOG_ROUTE, CHECKOUT_ROUTE, SHOP_ROUTE} from '../utils/consts';
import HomePage from '../pages/HomePage';
import TagStore, {ITagStore} from '../store/shop/TagStore';
import CatalogPage from '../pages/CatalogPage';
import CheckoutPage from '../pages/CheckoutPage';


export type TypeShopContext = {
  shopProducts: IProductsStore
  shopTags: ITagStore
}

export const ShopContext = createContext<TypeShopContext>({
  shopProducts: ProductsStore,
  shopTags: TagStore
});

const PublicRouter: FC = () => {
  return (
    <ShopContext.Provider value={{
      shopProducts: ProductsStore,
      shopTags: TagStore
    }}>
      <Routes>
        <Route path="/" element={<PublicLayout/>}>
          <Route index element={<HomePage/>}/>
          {publicRoutes.map(({path, Component}) => {
            return <Route key={path} path={path} element={Component}/>;
          })}
          <Route path={CATALOG_ROUTE} element={<CatalogPage/>}>
            <Route path={':filters'} element={<CatalogPage/>}/>
          </Route>
        </Route>
        <Route path={CHECKOUT_ROUTE} element={<CheckoutPage/>}/>
        <Route path={'*'} element={<Navigate to={SHOP_ROUTE}/>}/>
      </Routes>
    </ShopContext.Provider>
  );
};

export default PublicRouter;