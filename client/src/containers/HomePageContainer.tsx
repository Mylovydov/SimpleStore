import React, {useContext, useEffect} from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {SELECTED_PRODUCT_ROUTE} from '../utils/consts';
import useUpdateCartFunctions from '../hooks/useUpdateCartFunctions';
import {getNoveltiesAndPopular} from '../http/shopAPI/productAPI';
import {ShopContext} from '../components/PublicRouter';
import {observer} from 'mobx-react-lite';
import ProductList from '../components/ProductList';

const HomePageContainer = observer(() => {

  const {shopProducts} = useContext(ShopContext);
  const navigate = useNavigate();
  const {setProductToCart, removeProductFromCart} = useUpdateCartFunctions();

  useEffect(() => {
    getNoveltiesAndPopular()
      .then(data => shopProducts.setData(data))
      .catch(e => console.log(e));
  }, []);


  const onHandleNavProduct = (slug: string) => {
    navigate(`${SELECTED_PRODUCT_ROUTE}/${slug}`);
  };

  return (
    <Container>
      <Row className={'mt-4'}>
        <Col md={6}>
          <div className={'position-relative'} style={{overflow: 'hidden', paddingBottom: '55%'}}>
            <Image src={'/assets/banner-1.jpg'} style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}/>
          </div>
        </Col>

        <Col md={6}>

          <div className={'position-relative'} style={{overflow: 'hidden', paddingBottom: '55%'}}>
            <Image src={'/assets/banner.jpg'} style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}/>
          </div>
        </Col>
      </Row>
      <h2
        className={'mb-3 mt-5'}
      >
        Новинки
      </h2>
      <hr/>
      <Row className={'mt-2'}>
        <ProductList
          products={shopProducts.noveltiesProducts}
          onProductClick={onHandleNavProduct}
          onAddToCartBtnClick={setProductToCart}
          onAddToCartBtnClickAgain={removeProductFromCart}
        />
      </Row>
      <h2
        className={'mb-3 mt-5'}
      >
        Популярное
      </h2>
      <hr/>
      <Row>
        <ProductList
          products={shopProducts.popularProducts}
          onProductClick={onHandleNavProduct}
          onAddToCartBtnClick={setProductToCart}
          onAddToCartBtnClickAgain={removeProductFromCart}
        />
      </Row>
    </Container>
  );
});

export default HomePageContainer;