import AllAdminsPage from "./pages/AllAdminsPage."
import AllOrdersPage from "./pages/AllOrdersPage"
import AllProductsPage from "./pages/AllProductsPage"
import AllTagsPage from "./pages/AllTagsPage"
import AllTagTypesPage from "./pages/AllTagTypesPage"
import BasketPage from "./pages/BasketPage"
import CheckoutPage from "./pages/CheckoutPage"
import CurrentAdminSettingsPage from "./pages/CurrentAdminSettingsPage"
import ProductPage from "./pages/ProductPage"
import GetOneAdminPage from "./pages/GetOneAdminPage"
import GetOneOrderPage from "./pages/GetOneOrderPage"
import GetOneProductPage from "./pages/GetOneProductPage"
import GetOneTagPage from "./pages/GetOneTagPage"
import GetOneTagTypePage from "./pages/GetOneTagTypePage"
// import StatisticsPage from "./pages/StatisticsPage"
import CreateTagTypePage from "./pages/CreateTagTypePage"
import CreateProductPage from "./pages/CreateProductPage"
import CreateAdminPage from "./pages/CreateAdminPage"
import CreateTagPage from "./pages/CreateTagPage"
import CreateOrderPage from "./pages/CreateOrderPage"
import AuthPage from "./pages/AuthPage"
import CatalogPage from "./pages/CatalogPage"

import {
    ALL_ADMINS_ROUTE,
    GET_ONE_ADMIN_ROUTE, ALL_TAGTYPES_ROUTE, GET_ONE_TAGTYPE_ROUTE,
    ALL_TAGS_ROUTE, GET_ONE_TAG_ROUTE, ALL_PRODUCTS_ROUTE,
    GET_ONE_PRODUCT_ROUTE, ALL_ORDERS_ROUTE, GET_ONE_ORDER_ROUTE,
    STATISTICS_ROUTE, CURRENT_ADMIN_SETTINGS_ROUTE, CHECKOUT_ROUTE,
    BASKET_ROUTE,
    SELECTED_PRODUCT_ROUTE,
    CREATE_PRODUCTS_ROUTE,
    CREATE_ADMIN_ROUTE,
    CREATE_TAGTYPE_ROUTE,
    CREATE_TAG_ROUTE,
    CREATE_ORDER_ROUTE,
    LOGIN_ROUTE,
    SHOP_ROUTE, CATALOG_ROUTE,
} from "./utils/consts"
import StatisticsPageContainer from "./containers/StatisticsPageContainer"
import HomePage from "./pages/HomePage";

// Страницы на которые может зайти только авторизованный пользователь
export const authRoutes = [
    {
        // Настройки админа
        path: CURRENT_ADMIN_SETTINGS_ROUTE,
        Component: <CurrentAdminSettingsPage />
    },


    {
        // Все администраторы
        path: ALL_ADMINS_ROUTE,
        Component: <AllAdminsPage />
    },
    {
        // Редактирование, удаление админа
        path: `${GET_ONE_ADMIN_ROUTE}/:id/edit`,
        Component: <GetOneAdminPage />
    },
    {
        // Создание админа
        path: CREATE_ADMIN_ROUTE,
        Component: <CreateAdminPage />
    },


    {
        // Все ТипыТега
        path: ALL_TAGTYPES_ROUTE,
        Component: <AllTagTypesPage />
    },
    {
        // Редактирование, удаление ТипаТега
        path: `${GET_ONE_TAGTYPE_ROUTE}/:id/edit`,
        Component: <GetOneTagTypePage />
    },
    {
        // Создание ТипаТега
        path: CREATE_TAGTYPE_ROUTE,
        Component: <CreateTagTypePage />
    },


    {
        // Все Теги
        path: ALL_TAGS_ROUTE,
        Component: <AllTagsPage />
    },
    {
        // Редактирование, удаление Тега
        path: `${GET_ONE_TAG_ROUTE}/:id/edit`,
        Component: <GetOneTagPage />
    },
    {
        // Создание Тега
        path: CREATE_TAG_ROUTE,
        Component: <CreateTagPage />
    },


    {
        // Все Продукты
        path: ALL_PRODUCTS_ROUTE,
        Component: <AllProductsPage />
    },
    {
        // Редактирование, удаление продукта
        path: `${GET_ONE_PRODUCT_ROUTE}/:id/edit`,
        Component: <GetOneProductPage />
    },
    {
        // Создание продукта
        path: CREATE_PRODUCTS_ROUTE,
        Component: <CreateProductPage />
    },


    {
        // Все Заказы
        path: ALL_ORDERS_ROUTE,
        Component: <AllOrdersPage />
    },
    {
        // Редактирование, удаление Заказа
        path: `${GET_ONE_ORDER_ROUTE}/:id/edit`,
        Component: <GetOneOrderPage />
    },
    {
        // Создание Заказа
        path: CREATE_ORDER_ROUTE,
        Component: <CreateOrderPage />
    },


    {
        // Статистика
        path: STATISTICS_ROUTE,
        Component: <StatisticsPageContainer />
    },
]

// Страницы на которые может зайти любой
export const publicRoutes = [
    {
        // Страница выбранного продукта
        path: `${SELECTED_PRODUCT_ROUTE}/:slug`,
        Component: <ProductPage />
    },
    {
        // Страница оформления заказа
        path: CHECKOUT_ROUTE,
        Component: <CheckoutPage />
    },
    {
        // Корзина
        path: BASKET_ROUTE,
        Component: <BasketPage />
    },
    {
        // Логин
        path: LOGIN_ROUTE,
        Component: <AuthPage />
    },
    // {
    //     // Home
    //     path: `${SHOP_ROUTE}`,
    //     Component: <HomePage />
    // },
    {
        // Catalog
        path: CATALOG_ROUTE,
        Component: <CatalogPage />
    }
]