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
import {prepareFilterBarData, TypePrepareFilterBarData, TypePrepareTagsDataItem} from '../utils/prepareFilterBarData';
import {TypeShopTagType} from '../store/shop/TagStore';

const generateQueryUrl = (data: TypePrepareFilterBarData) => {
    return Object.values(data).reduce((acc: string, item: [TypeShopTagType, TypePrepareTagsDataItem[]]) => {
        const [tagType, tags] = item;
        const checkedTagsSlug = tags.filter((tag: TypePrepareTagsDataItem) => tag.isChecked)
            .map((tag: TypePrepareTagsDataItem) => tag.slug);

        if (!(checkedTagsSlug.length)) {
            return acc;
        }

        let str = `${tagType.slug}=${checkedTagsSlug.join()};`;
        return acc.concat(str);
    }, '').replace(/;$/, '/');
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
    console.log('render');
    const {shopProducts, shopTags} = useContext(ShopContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const filters = location.pathname === '/catalog/' ? '' : location.pathname.slice('/catalog/'.length);
    //     // console.log('location.pathname', location.pathname);
    //     getAllProducts(filters)
    //         .then(data => {
    //             // console.log('before');
    //             shopProducts.setProducts(data.allProducts);
    //             shopProducts.setTotalCount(data.productsTotalCount);
    //             shopProducts.setLimit(data.productsLimit);
    //             shopProducts.setFilter(filters);
    //             shopTags.setTagTypes(data.allTagTypes);
    //             shopTags.setTags(data.allTags);
    //             shopTags.setFilterBarData(prepareFilterBarData(data.allTagTypes, data.allTags));
    //             console.log('filters', filters);
    //             // console.log('after');
    //         })
    //         // .catch(e => alert(e.response.data.message))
    //         .finally(() => setLoading(false));
    //     // }
    // }, [location.pathname]);

    useEffect(() => {
        const filters = location.pathname === '/catalog/' ? '' : location.pathname.slice('/catalog/'.length);
        console.log('location.pathname', location);

        getAllProducts(filters)
            .then(data => {
                shopProducts.setData(data);
                shopTags.setData(data);
                shopTags.setFilterBarData(prepareFilterBarData(data.allTagTypes, data.allTags, filters));
                shopProducts.setFilter(filters);
            })
            .catch(e => alert(e.response.data.message))
            .finally(() => {
                setLoading(false)
                setIsTouched(false);
            });
    }, [location.pathname]);

    useEffect(() => {
        if (isTouched) {
            // const queryUrl = generateQueryUrl(query, shop.currentPage)
            const queryUrl = generateQueryUrl(shopTags.filterBarData);
            console.log('queryUrl', queryUrl);
            navigate(`${CATALOG_ROUTE}/${queryUrl}`);
        }
    }, [isTouched]);

    const onHandleChangePage = (currentPage: number): void => {
        shopProducts.setCurrentPage(currentPage);
    };

    // console.log('shopTags.filterBarData', shopTags.filterBarData);

    // const handleChangeFilter = (title: string, e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.checked) {
    //         setQuery((state: TypeQueryStateItem[]) => {
    //             const candidate = state.some((item: TypeQueryStateItem) => item.filtersTitle === title);
    //             if (!candidate) {
    //                 return [...state, {filtersTitle: title, filters: [e.target.value]}];
    //             } else {
    //                 return state.map((item: TypeQueryStateItem) => item.filtersTitle === title
    //                     ?
    //                     {...item, filters: [...item.filters, e.target.value]}
    //                     :
    //                     item
    //                 );
    //             }
    //         });
    //     } else {
    //         setQuery((state: TypeQueryStateItem[]) => {
    //             return state.map((item: TypeQueryStateItem) => item.filtersTitle === title
    //                 ?
    //                 {...item, filters: item.filters.filter((slug: string) => slug !== e.target.value)}
    //                 :
    //                 item
    //             );
    //         });
    //     }
    // };

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