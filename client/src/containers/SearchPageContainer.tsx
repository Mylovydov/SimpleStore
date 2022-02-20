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
import {SEARCH_ROUTE, SELECTED_PRODUCT_ROUTE} from '../utils/consts';
import {prepareFilterBarData} from '../utils/prepareFilterBarData';
import {decodeQueryUrl, generateQueryUrl} from '../utils/queryString';
import useUpdateCartFunctions from '../hooks/useUpdateCartFunctions';

const SearchPageContainer = observer(() => {
  const {shopProducts, shopTags} = useContext(ShopContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {setProductToCart, removeProductFromCart} = useUpdateCartFunctions();

  useEffect(() => {
    const filters = location.pathname === '/search/'
      ? ''
      : location.pathname.slice('/search/'.length);

    const decode = decodeQueryUrl(filters);

    shopProducts.setCurrentFilters(decode.filters);
    shopProducts.setCurrentSearch(decode.search);

    if (shopProducts.currentFilters === shopProducts.prevFilters && shopProducts.currentSearch === shopProducts.prevSearch) {
      console.log('отправляем запрос на получение следующих товаров');
      const paginatedFilters = `search=${decode.search};${decode.filters}page=${decode.page};limit=${shopProducts.limit};`;
      getPaginatedProducts(paginatedFilters).then(data => {
        shopProducts.setData(data);
      }).finally(() => {
        setLoading(false);
        setIsTouched(false);
        shopProducts.setPrevSearch(decode.search);
        shopProducts.setPrevFilters(decode.filters);
        shopProducts.setCurrentPage(Number(decode.page));
      });
    } else {
      console.log('отправляем запрос на получение отфильтрованных товаров');
      const paginatedFilters = `search=${decode.search};${decode.filters}limit=${shopProducts.limit};`;
      getAllProducts(paginatedFilters).then(data => {
        shopProducts.setData(data);
        shopTags.setData(data);
        shopTags.setFilterBarData(prepareFilterBarData(data.allTagTypes, data.allTags, filters));
      }).finally(() => {
        shopProducts.setPrevSearch(decode.search);
        setLoading(false);
        setIsTouched(false);
        shopProducts.setPrevFilters(decode.filters);
        shopProducts.setCurrentPage(decode.page || 1);
      });
    }
  }, [location.pathname]);


  useEffect(() => {
    if (isTouched) {
      const queryUrl = generateQueryUrl(shopTags.filterBarData);
      navigate(`${SEARCH_ROUTE}/${queryUrl}search=${shopProducts.currentSearch};`);
    }
  }, [isTouched]);

  const onHandleChangePage = (newPage: number): void => {
    let newPath = location.pathname;
    if (newPage === 1) {
      newPath = newPath.replace(/(page=[1-9][0-9]*);/, '');
    } else {
      if (shopProducts.currentPage > 1) {
        newPath = newPath.replace(/(page=[1-9][0-9]*)/, `page=${newPage}`);
      } else {
        newPath = newPath + `page=${newPage};`;
      }
    }
    navigate(newPath);
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
    navigate(
      `${SELECTED_PRODUCT_ROUTE}/${slug}`
    );
  };

  const pages = pagination(shopProducts.totalCount, shopProducts.limit);

  if (loading) {
    return (<Spinner
      animation="border"
      style={{position: 'absolute', top: '50%', left: '50%'}}
    />);
  }

  return (
    <Container>
      <div className={'mt-5'}>
        <h5 className={'m-0'}>
          Поиск по "{decodeURIComponent(shopProducts.currentSearch)}"
        </h5>
        <span style={{fontSize: 12}}>Найдено {shopProducts.totalCount} товаров</span>
      </div>
      <Row className={'mt-4'}>
        <Col md={3}>
          <FilterProductsBar
            onChangeFilter={onChangeFilter}
          />
        </Col>

        <Col md={9}>
          <ProductList
            products={shopProducts.products}
            onProductClick={onHandleNavProduct}
            onAddToCartBtnClick={setProductToCart}
            onAddToCartBtnClickAgain={removeProductFromCart}
          />
          {pages.length > 1 &&
          <Pages
              pages={pages}
              onChangePage={onHandleChangePage}
          />}
        </Col>
      </Row>
    </Container>
  );
});

export default SearchPageContainer;