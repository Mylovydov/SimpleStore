import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Context} from '../components/AdminRouter';
import Pages from '../components/Pages';
import ProductTable from '../components/tables/ProductTable';
import SearchTableInput from '../components/tables/SearchTableInput';
import {THeadTableField} from '../components/tables/TagTypesTable';
import {getAllProducts} from '../http/adminAPI/productsAPI';
import {getAllTags} from '../http/adminAPI/tagsAPI';
import {ADMIN_ROUTE, PRODUCTS_ROUTE} from '../utils/consts';
import {pagination} from '../utils/pagination';

const FIELDS: THeadTableField[] = [
  {_id: '_id', title: '# _id', sortable: true},
  {_id: 'title', title: 'Заголовок', sortable: true},
  {_id: 'price', title: 'Цена', sortable: true},
  {_id: 'image', title: 'Фото', sortable: true},
  {_id: 'description', title: 'Описание', sortable: true},
  {_id: 'orderCounter', title: 'Кол-во покупок', sortable: true},
  {_id: 'tagsIds', title: 'Теги', sortable: true},
  {_id: 'slug', title: 'Slug', sortable: true},
  {_id: 'createdDate', title: 'Дата создания', 'sortable': true},
  {_id: 'updatedDate', title: 'Дата обновления', 'sortable': true}
];


const ProductListContainer = observer(() => {
  const {product, tag} = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    getAllProducts().then(data => {
      product.setProducts(data.products);
      product.setTotalCount(data.totalCount);
      product.setLimit(data.limit);
    });
    getAllTags().then(data => tag.setTags(data.tags))
      .finally(() => setLoading(false));
  }, []);

  const pages = pagination(product.totalCount, product.limit);

  const handleNavEdit = (id: string): void => {
    navigate(`${ADMIN_ROUTE}${PRODUCTS_ROUTE}/${id}/edit`);
  };

  return (
    <>
      <SearchTableInput/>
      {loading
        ?
        <Spinner animation="border" className="m-auto d-block"/>
        :
        <>
          <ProductTable
            tags={tag.tags}
            products={product.products}
            fields={FIELDS}
            onClick={handleNavEdit}
          />
          {pages.length > 1 &&
          <Pages
              pages={pages}
              currentPage={currentPage}
              onChangePage={setCurrentPage}
          />
          }
        </>
      }
    </>
  );
});

export default ProductListContainer;