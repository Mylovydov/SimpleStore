import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from 'react-bootstrap';
import FilterProductsBar from '../components/FilterProductsBar';
import ProductList from '../components/ProductList';
import Pages from '../components/Pages';
import {getAllProducts, getPaginatedProducts} from '../http/shopAPI/productAPI';
import {pagination} from '../utils/pagination';
import {ShopContext} from '../components/PublicRouter';
import {observer} from 'mobx-react-lite';
import {useLocation, useNavigate} from 'react-router-dom';
import {CATALOG_ROUTE, SELECTED_PRODUCT_ROUTE} from '../utils/consts';
import {prepareFilterBarData, TypePrepareFilterBarData, TypePrepareTagsDataItem} from '../utils/prepareFilterBarData';
import {TypeShopTagType} from '../store/shop/TagStore';

const generateQueryUrl = (data: TypePrepareFilterBarData, page: number) => {
    const pageUrl = page > 1 ? `page=${page};` : ''

    const filters =  Object.values(data).reduce((acc: string, item: [TypeShopTagType, TypePrepareTagsDataItem[]]) => {
        const [tagType, tags] = item;
        const checkedTagsSlug = tags.filter((tag: TypePrepareTagsDataItem) => tag.isChecked)
            .map((tag: TypePrepareTagsDataItem) => tag.slug);

        if (!(checkedTagsSlug.length)) {
            return acc;
        }

        let str = `${tagType.slug}=${checkedTagsSlug.join()};`;
        return acc.concat(str);
    }, '').replace(/;$/, '/');

    return pageUrl + filters
};

const pageUrl = (page: number) => {
    return page > 1 ? `page=${page};` : ''
}

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
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const filters = location.pathname === '/catalog/' ? '' : location.pathname.slice('/catalog/'.length);
        console.log('location.pathname', location);
        console.log('filters', filters);

        // getPaginatedProducts(filters).then(data => console.log('getPaginatedProducts', data))
        // getAllProducts(filters).then(data => console.log('getAllProducts', data))
        getAllProducts(filters)
            .then(data => {
                shopProducts.setData(data);
                shopTags.setData(data);
                shopTags.setFilterBarData(prepareFilterBarData(data.allTagTypes, data.allTags, filters));
                shopProducts.setFilter(filters);
            })
            .catch(e => alert(e.response.data.message))
            .finally(() => {
                setLoading(false);
                setIsTouched(false);
            });
    }, [location.pathname]);
    console.log('shopTags.filterBarData', shopTags.filterBarData);

    useEffect(() => {
        // const createdPageUrl = pageUrl(shopProducts.currentPage)
        // navigate(`${CATALOG_ROUTE}/${createdPageUrl}`);
        // console.log('createdPageUrl', createdPageUrl);
        if (isTouched) {
            const queryUrl = generateQueryUrl(shopTags.filterBarData, shopProducts.currentPage);
            console.log('queryUrl', queryUrl);
            navigate(`${CATALOG_ROUTE}/${queryUrl}`);
        }
    }, [shopTags.filterBarData, shopProducts.currentPage]);

    const onHandleChangePage = (currentPage: number): void => {
        shopProducts.setCurrentPage(currentPage);
    };

    const onChangeFilter = (typeId: string, tagId: string) => {
        const [type, tags] = shopTags.filterBarData[typeId];
        const updatedTags = tags.map(tagItem => tagItem._id === tagId ?
            {
                ...tagItem,
                isChecked: !tagItem.isChecked
            }
            : tagItem
        );

        shopTags.setFilterBarData(
            {
                ...shopTags.filterBarData, [typeId]: [type, updatedTags]
            }
        );
        setIsTouched(true);
    };

    const onHandleNavProduct = (slug: string) => {
        navigate(`${SELECTED_PRODUCT_ROUTE}/${slug}`);
    };

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
                        onChangeFilter={onChangeFilter}
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