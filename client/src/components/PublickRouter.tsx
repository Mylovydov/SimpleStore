import React, { FC, createContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../layout/PublicLayout';
import CatalogPage from '../pages/CatalogPage';
import { publicRoutes } from '../routes';
import ShopStore, { IShopStore } from '../store/ShopStore';
import { SHOP_ROUTE } from '../utils/consts';
import HomePage from "../pages/HomePage";


export type TypeShopContext = {
   shop: IShopStore
}

export const ShopContext = createContext<TypeShopContext>({
   shop: ShopStore
})

const PublickRouter:FC = () => {
   return (
      <ShopContext.Provider value={{
         shop: ShopStore
      }}>
         <Routes>
            <Route path='/' element={<PublicLayout />}>
               <Route index element={<CatalogPage />} />
               {publicRoutes.map(({path, Component}) => {
                  return <Route key={path} path={path} element={Component} />
               })}
            </Route>
            {/* <Route path={'*'} element={<Navigate to={SHOP_ROUTE} />} /> */}
         </Routes>
      </ShopContext.Provider>
   );
};

export default PublickRouter;