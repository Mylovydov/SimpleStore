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
import {prepareFilterBarData} from '../utils/prepareFilterBarData';
import {decodeQueryUrl, generateQueryUrl} from '../utils/queryString';
import useUpdateCartFunctions from '../hooks/useUpdateCartFunctions';

const CatalogPageContainer = observer(() => {
  const {shopProducts, shopTags} = useContext(ShopContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {setProductToCart, removeProductFromCart} = useUpdateCartFunctions();

  useEffect(() => {
    const filters = location.pathname === '/catalog/'
      ? ''
      : location.pathname.slice('/catalog/'.length);

    const decode = decodeQueryUrl(filters);

    shopProducts.setCurrentFilters(decode.filters);
    let paginatedFilters = '';

    if (shopProducts.currentFilters === shopProducts.prevFilters) {
      console.log('отправляем запрос на получение следующих товаров');
      paginatedFilters = `${decode.filters}page=${decode.page};limit=${shopProducts.limit};`;
      getPaginatedProducts(paginatedFilters).then(data => {
        shopProducts.setData(data);
      }).finally(() => {
        setLoading(false);
        setIsTouched(false);
        shopProducts.setPrevFilters(decode.filters);
        shopProducts.setCurrentPage(Number(decode.page));
      });
    } else {
      console.log('отправляем запрос на получение отфильтрованных товаров');
      paginatedFilters = `${decode.filters}limit=${shopProducts.limit};`;
      getAllProducts(paginatedFilters).then(data => {
        shopProducts.setData(data);
        shopTags.setData(data);
        shopTags.setFilterBarData(prepareFilterBarData(data.allTagTypes, data.allTags, filters));
      }).finally(() => {
        setLoading(false);
        setIsTouched(false);
        shopProducts.setPrevFilters(decode.filters);
        shopProducts.setCurrentPage(decode.page || 1);
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      shopProducts.setCurrentFilters('');
    };
  }, []);

  useEffect(() => {
    if (isTouched) {
      const queryUrl = generateQueryUrl(shopTags.filterBarData);
      navigate(`${CATALOG_ROUTE}${queryUrl}`);
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
    <Container className="mt-3">
      <Row>
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

export default CatalogPageContainer;