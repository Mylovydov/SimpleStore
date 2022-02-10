import React, { FC, createContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../layout/PublicLayout';
import CatalogPage from '../pages/CatalogPage';
import { publicRoutes } from '../routes';
import ProductsStore, { IProductsStore } from '../store/shop/ProductsStore';
import { SHOP_ROUTE } from '../utils/consts';
import HomePage from "../pages/HomePage";
import { ITagTypeStore } from "../store/shop/TagTypeStore";
import TagTypeStore from "../store/shop/TagTypeStore";
import TagStore, {ITagStore} from "../store/shop/TagStore";


export type TypeShopContext = {
   shopProducts: IProductsStore
   shopTagTypes: ITagTypeStore
   shopTags: ITagStore
}

export const ShopContext = createContext<TypeShopContext>({
   shopProducts: ProductsStore,
   shopTagTypes: TagTypeStore,
   shopTags: TagStore
})

const PublicRouter:FC = () => {
   return (
      <ShopContext.Provider value={{
         shopProducts: ProductsStore,
         shopTagTypes: TagTypeStore,
         shopTags: TagStore
      }}>
         <Routes>
            <Route path='/' element={<PublicLayout />}>
               <Route index element={<HomePage />} />
               {publicRoutes.map(({path, Component}) => {
                  return <Route key={path} path={path} element={Component} />
               })}
            </Route>
             <Route path={'*'} element={<Navigate to={SHOP_ROUTE} />} />
         </Routes>
      </ShopContext.Provider>
   );
};

export default PublicRouter;