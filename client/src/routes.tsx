import AllAdminsPage from './pages/AllAdminsPage.';
import AllOrdersPage from './pages/AllOrdersPage';
import AllProductsPage from './pages/AllProductsPage';
import AllTagsPage from './pages/AllTagsPage';
import AllTagTypesPage from './pages/AllTagTypesPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CurrentAdminSettingsPage from './pages/CurrentAdminSettingsPage';
import ProductPage from './pages/ProductPage';
import GetOneAdminPage from './pages/GetOneAdminPage';
import GetOneOrderPage from './pages/GetOneOrderPage';
import GetOneProductPage from './pages/GetOneProductPage';
import GetOneTagPage from './pages/GetOneTagPage';
import GetOneTagTypePage from './pages/GetOneTagTypePage';
import CreateTagTypePage from './pages/CreateTagTypePage';
import CreateProductPage from './pages/CreateProductPage';
import CreateAdminPage from './pages/CreateAdminPage';
import CreateTagPage from './pages/CreateTagPage';
import CreateOrderPage from './pages/CreateOrderPage';
import CatalogPage from './pages/CatalogPage';

import {
    ADMINS_ROUTE,
    BASKET_ROUTE,
    CATALOG_ROUTE,
    CHECKOUT_ROUTE,
    CREATE_ADMIN_ROUTE,
    CREATE_ORDER_ROUTE,
    CREATE_PRODUCTS_ROUTE,
    CREATE_TAG_ROUTE,
    CREATE_TAGTYPE_ROUTE,
    CURRENT_ADMIN_SETTINGS_ROUTE,
    ORDERS_ROUTE,
    PRODUCTS_ROUTE, SEARCH_ROUTE,
    SELECTED_PRODUCT_ROUTE,
    STATISTICS_ROUTE,
    TAGS_ROUTE,
    TAGTYPES_ROUTE,
} from './utils/consts';
import StatisticsPageContainer from './containers/StatisticsPageContainer';
import SearchPage from './pages/SearchPage';

export const authRoutes = [
    {
        path: CURRENT_ADMIN_SETTINGS_ROUTE,
        Component: <CurrentAdminSettingsPage/>
    },
    {
        path: ADMINS_ROUTE,
        Component: <AllAdminsPage/>
    },
    {
        // Редактирование, удаление админа
        path: `${ADMINS_ROUTE}/:id/edit`,
        Component: <GetOneAdminPage/>
    },
    {
        path: CREATE_ADMIN_ROUTE,
        Component: <CreateAdminPage/>
    },
    {
        path: TAGTYPES_ROUTE,
        Component: <AllTagTypesPage/>
    },
    {
        path: `${TAGTYPES_ROUTE}/:id/edit`,
        Component: <GetOneTagTypePage/>
    },
    {
        path: CREATE_TAGTYPE_ROUTE,
        Component: <CreateTagTypePage/>
    },
    {
        path: TAGS_ROUTE,
        Component: <AllTagsPage/>
    },
    {
        path: `${TAGS_ROUTE}/:id/edit`,
        Component: <GetOneTagPage/>
    },
    {
        path: CREATE_TAG_ROUTE,
        Component: <CreateTagPage/>
    },
    {
        path: PRODUCTS_ROUTE,
        Component: <AllProductsPage/>
    },
    {
        path: `${PRODUCTS_ROUTE}/:id/edit`,
        Component: <GetOneProductPage/>
    },
    {
        path: CREATE_PRODUCTS_ROUTE,
        Component: <CreateProductPage/>
    },
    {
        path: ORDERS_ROUTE,
        Component: <AllOrdersPage/>
    },
    {
        path: `${ORDERS_ROUTE}/:id/edit`,
        Component: <GetOneOrderPage/>
    },
    {
        path: CREATE_ORDER_ROUTE,
        Component: <CreateOrderPage/>
    },
    {
        path: STATISTICS_ROUTE,
        Component: <StatisticsPageContainer/>
    },
];

export const publicRoutes = [
    {
        path: `${SELECTED_PRODUCT_ROUTE}/:slug`,
        Component: <ProductPage/>
    },
    {
        path: `${SEARCH_ROUTE}/:searchParams`,
        Component: <SearchPage/>
    },
    {
        path: CHECKOUT_ROUTE,
        Component: <CheckoutPage/>
    },
    {
        path: BASKET_ROUTE,
        Component: <CartPage/>
    }
];