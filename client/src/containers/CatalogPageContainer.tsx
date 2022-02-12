import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from 'react-bootstrap';
import FilterProductsBar from '../components/FilterProductsBar';
import ProductList from '../components/ProductList';
import Pages from '../components/Pages';
import {getAllProducts} from '../http/shopAPI/productAPI';
import {pagination} from '../utils/pagination';
import {ShopContext} from '../components/PublicRouter';
import {observer} from 'mobx-react-lite';
import {useLocation, useNavigate} from 'react-router-dom';
import {CATALOG_ROUTE, SELECTED_PRODUCT_ROUTE} from '../utils/consts';
import {prepareFilterBarDataArr} from '../utils/prepareFilterBarData';

export type TypeQueryStateItem = { filtersTitle: string, filters: string[] }


const tagTypes = [
    {_id: '61fa89bc2e6bb14e0e47c9f8', title: 'Категория', slug: 'category'},
    {_id: '61fa89ca2e6bb14e0e47c9fb', title: 'Бренды', slug: 'brands'},
    {_id: '61fa89d52e6bb14e0e47c9fe', title: 'Автор', slug: 'author'}
];
const tags = [
    {_id: '61fa8b982e6bb14e0e47ca04', title: 'Книги', tagTypeId: '61fa89bc2e6bb14e0e47c9f8', slug: 'books'},
    {_id: '61fa8ba42e6bb14e0e47ca07', title: 'Машины', tagTypeId: '61fa89bc2e6bb14e0e47c9f8', slug: 'cars'},
    {_id: '61fa8bc42e6bb14e0e47ca0d', title: 'Reno', tagTypeId: '61fa89ca2e6bb14e0e47c9fb', slug: 'reno'},
    {_id: '61fa8bcd2e6bb14e0e47ca10', title: 'Audi', tagTypeId: '61fa89ca2e6bb14e0e47c9fb', slug: 'audi'},
    {_id: '61fa8c252e6bb14e0e47ca1c', title: 'Бушков', tagTypeId: '61fa89d52e6bb14e0e47c9fe', slug: 'bushkov'},
    {_id: '61fa8c3f2e6bb14e0e47ca1f', title: 'С. Кинг', tagTypeId: '61fa89d52e6bb14e0e47c9fe', slug: 'king'},
];


const generateQueryUrl = (arr: TypeQueryStateItem[]) => {
    return arr.reduce((acc: string, item: TypeQueryStateItem, i: number, arr: TypeQueryStateItem[]) => {
        let str = '';
        if (!item.filters.length) {
            return acc;
        }
        i === arr.length - 1
            ?
            str = `${item.filtersTitle}=${item.filters.join(',')}/`
            :
            str = `${item.filtersTitle}=${item.filters.join(',')};`;

        return acc.concat(str);
    }, '');
};

// const generateQueryUrl = (arr: TypeQueryStateItem[], page: number) => {
//     const pageUrl = page > 1 ? `page=${page};` : ''
//
//     const filters = arr.reduce((acc: string, item: TypeQueryStateItem, i: number, arr: TypeQueryStateItem[]) => {
//         let str = ''
//         if (!item.filters.length) {
//             return acc
//         }
//         i === arr.length - 1
//             ?
//             str = `${item.filtersTitle}=${item.filters.join(',')}/`
//             :
//             str = `${item.filtersTitle}=${item.filters.join(',')};`
//
//         return acc.concat(str)
//     }, '')
//
//     return pageUrl + filters
// }

const CatalogPageContainer = observer(() => {

    const {shopProducts, shopTags} = useContext(ShopContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<TypeQueryStateItem[]>([]);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const a = location.pathname
        console.log('a', a);
        const filters = location.pathname === '/catalog/' ? '/' : location.pathname.slice('/catalog'.length, -1);
        getAllProducts(filters)
            .then(data => {
                shopProducts.setProducts(data.allProducts);
                shopTags.setTagTypes(data.allTagTypes);
                shopTags.setTags(data.allTags);
                shopTags.setFilterBarArrData(prepareFilterBarDataArr(data.allTagTypes, data.allTags));
                shopProducts.setTotalCount(data.productsTotalCount);
                shopProducts.setLimit(data.productsLimit);
            })
            .catch(e => alert(e.response.data.message))
            .finally(() => setLoading(false));
        // }

    }, [location.pathname]);


    useEffect(() => {
        // const queryUrl = generateQueryUrl(query, shop.currentPage)
        const queryUrl = generateQueryUrl(query);
        console.log('queryUrl', queryUrl);
        navigate(`${CATALOG_ROUTE}/${queryUrl}`);
    }, [query]);

    const onHandleChangePage = (currentPage: number): void => {
        shopProducts.setCurrentPage(currentPage);
    };


    const handleChangeFilter = (title: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setQuery((state: TypeQueryStateItem[]) => {
                const candidate = state.some((item: TypeQueryStateItem) => item.filtersTitle === title);
                if (!candidate) {
                    return [...state, {filtersTitle: title, filters: [e.target.value]}];
                } else {
                    return state.map((item: TypeQueryStateItem) => item.filtersTitle === title
                        ?
                        {...item, filters: [...item.filters, e.target.value]}
                        :
                        item
                    );
                }
            });
        } else {
            setQuery((state: TypeQueryStateItem[]) => {
                return state.map((item: TypeQueryStateItem) => item.filtersTitle === title
                    ?
                    {...item, filters: item.filters.filter((slug: string) => slug !== e.target.value)}
                    :
                    item
                );
            });
        }
    };

    // console.log('query', query);

    const onHandleNavProduct = (slug: string) => {
        navigate(`${SELECTED_PRODUCT_ROUTE}/${slug}`);
    };

    // console.log('query', query);
    const pages = pagination(shopProducts.totalCount, shopProducts.limit);

    if (loading) {
        return (<Spinner
            animation="border"
            style={{position: 'absolute', top: '50%', left: '50%'}}
        />);
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={3}>
                    <FilterProductsBar
                        tags={shopTags.tags}
                        tagTypes={shopTags.tagTypes}
                        onChangeFilter={handleChangeFilter}
                        filterBarData={shopTags.filterBarData}
                    />
                </Col>

                <Col md={9}>
                    <ProductList products={shopProducts.products} onClick={onHandleNavProduct}/>
                    {pages.length > 1 &&
                    <Pages
                        pages={pages}
                        currentPage={shopProducts.currentPage}
                        onChangePage={onHandleChangePage}
                    />}
                </Col>
            </Row>
        </Container>
    );
});

export default CatalogPageContainer;