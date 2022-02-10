import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import FilterProductsBar from '../components/FilterProductsBar';
import ProductList from '../components/ProductList';
import Pages from '../components/Pages';
import { getAllProducts } from '../http/productAPI';
import { pagination } from '../utils/pagination';
import { ShopContext } from '../components/PublicRouter';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import {SELECTED_PRODUCT_ROUTE, SHOP_ROUTE} from '../utils/consts';

export type TypeQueryStateItem = {filtersTitle: string, filters: string[]}

// const generateQueryUrl = (arr: TypeQueryStateItem[]) => {
//    return arr.reduce((acc: string, item: TypeQueryStateItem, i: number, arr: TypeQueryStateItem[]) => {
//       let str = ''
//       if (!item.filters.length) {
//          return acc
//       }
//       i === arr.length - 1
//       ?
//       str = `${item.filtersTitle}=${item.filters.join(',')}/`
//       :
//       str = `${item.filtersTitle}=${item.filters.join(',')};`
//
//       return acc.concat(str)
//    }, '')
// }

const generateQueryUrl = (arr: TypeQueryStateItem[], page: number) => {
   const pageUrl = page > 1 ? `page=${page};` : ''
   
   const filters =  arr.reduce((acc: string, item: TypeQueryStateItem, i: number, arr: TypeQueryStateItem[]) => {
      let str = ''
      if (!item.filters.length) {
         return acc
      }
      i === arr.length - 1
      ?
      str = `${item.filtersTitle}=${item.filters.join(',')}/`
      :
      str = `${item.filtersTitle}=${item.filters.join(',')};`

      return acc.concat(str)
   }, '')

   return pageUrl + filters
}

const CatalogPageContainer = observer(() => {

   const { shopProducts, shopTagTypes, shopTags } = useContext(ShopContext)

   const [loading, setLoading] = useState<boolean>(false)
   const [query, setQuery] = useState<TypeQueryStateItem[]>([])

   const location = useLocation()
   const navigate = useNavigate()

   useEffect(() => {
      getAllProducts().then(data => {
         // shop.setAllTagTypes(data.allTagTypes)
         // shop.setAllTags(data.allTags)
         // shop.setAllProducts(data.allProducts)
         console.log(data)
         // shop.setAllFilteredProducts(data.filteredProducts)
         // shop.setPaginatedProducts(data.paginatedProducts)
         // shop.setTotalCount(data.productsTotalCount)
         // shop.setLimit(data.productsLimit)
      })
          .catch(e => alert(e.response.data.message))
          .finally(() => setLoading(false))
   })


   // useEffect(() => {
   //    console.log('location', location)
   //    if (location.pathname !== '/') {
   //       getAllProducts(location.pathname).then(data => {
   //          shop.setAllTagTypes(data.allTagTypes)
   //          shop.setAllTags(data.allTags)
   //          shop.setAllProducts(data.allProducts)
   //          shop.setAllFilteredProducts(data.filteredProducts)
   //          shop.setPaginatedProducts(data.paginatedProducts)
   //          shop.setTotalCount(data.productsTotalCount)
   //          shop.setLimit(data.productsLimit)
   //       })
   //       .catch(e => alert(e.response.data.message))
   //    }
   //
   //    if (location.pathname === '/') {
   //       getAllProducts().then(data => {
   //          shop.setAllTagTypes(data.allTagTypes)
   //          shop.setAllTags(data.allTags)
   //          shop.setAllProducts(data.allProducts)
   //          shop.setAllFilteredProducts(data.filteredProducts)
   //          shop.setPaginatedProducts(data.paginatedProducts)
   //          shop.setTotalCount(data.productsTotalCount)
   //          shop.setLimit(data.productsLimit)
   //       })
   //       .catch(e => alert(e.response.data.message))
   //       .finally(() => setLoading(false))
   //    }
   // }, [location])
   //

   let tagsIdsArr: string[] = []
   let tagTypeIdsArr: string[] = []

   if (shopProducts.allFilteredProducts.length) {
      tagsIdsArr = shopProducts.allFilteredProducts.map(product => {
         return product.tagsIds
      }).flat().filter((tagId, i, arr) => arr.indexOf(tagId) === i)

      tagTypeIdsArr = shopTags.tags.map(tag => {
         return tagsIdsArr.includes(tag._id) ? tag.tagTypeId : ''
      }).flat().filter((typeId, i, arr) => arr.indexOf(typeId) === i && typeId !== '')
   }
   
   const onHandleChangePage = (currentPage: number): void => {
      shopProducts.setCurrentPage(currentPage)
   }

   const handleChangeFilter = (title: string, e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
         setQuery((state: TypeQueryStateItem[]) => {
            const candidate = state.some((item: TypeQueryStateItem) => item.filtersTitle === title)
            if (!candidate) {
               return [...state, {filtersTitle: title, filters: [e.target.value]}]
            } else {
               return state.map((item: TypeQueryStateItem) => item.filtersTitle === title 
                  ?
                  {...item, filters: [...item.filters, e.target.value]}
                  :
                  item
               )
            }
         })
      } 
      
      else {
         setQuery((state: TypeQueryStateItem[]) => {
            return state.map((item: TypeQueryStateItem) => item.filtersTitle === title
               ?
               {...item, filters: item.filters.filter((slug:string) => slug !== e.target.value)}
               :
               item
               )
         })
      }
   }
   console.log('query', query)

   const onHandleNavProduct = (slug: string) => {
      navigate(`${SELECTED_PRODUCT_ROUTE}/${slug}`)
   }

   // const handleChangeFilter = (title: string, e: React.ChangeEvent<HTMLInputElement>) => {
   //    console.log('title', title);
   //    console.log('filters', e.target.value);
      
   //    if (e.target.checked) {
   //       setQuery((state: TypeQueryStateItem[]) => {
   //          // if (!state.length) {
   //          //    return [...state, {filtersTitle: title, filters: [e.target.value]}]
   //          // }
   //          const candidate = state.some((item: TypeQueryStateItem) => item.filtersTitle === title)
   //          if (!candidate) {
   //             return [...state, {filtersTitle: title, filters: [e.target.value]}]
   //          } else {
   //             return state.map((item: TypeQueryStateItem) => item.filtersTitle === title 
   //                ?
   //                {...item, filters: [...item.filters, e.target.value]}
   //                :
   //                item
   //             )
   //          }
   //       })
   //    } 
      
   //    else {
   //       setQuery((state: TypeQueryStateItem[]) => {
   //          return state.map((item: TypeQueryStateItem) => item.filtersTitle === title
   //             ?
   //             {...item, filters: item.filters.filter((slug:string) => slug !== e.target.value)}
   //             :
   //             item
   //             )
   //       })
   //    }
   // }

   

   // useEffect(() => {
   //    const queryUrl = generateQueryUrl(query, shop.currentPage)
   //    // const queryUrl = generateQueryUrl(query)
   //    navigate(`${SHOP_ROUTE}${queryUrl}`)
   // }, [query, shop.currentPage])
   
   const pages = pagination(shopProducts.totalCount, shopProducts.limit)

   if (loading) {
      return (<Spinner 
         animation='border'
         style={{position: 'absolute', top: '50%', left: '50%'}}
      />)
   }

   return (
      <Container className='mt-3'>
         <Row>
            <Col md={3}>
               <FilterProductsBar
                  tagsIdsArr={tagsIdsArr}
                  tagTypeIdsArr={tagTypeIdsArr}
                  onChangeFilter={handleChangeFilter}
               />
            </Col>

            <Col md={9}>
               <ProductList products={shopProducts.allProducts} onClick={onHandleNavProduct}/>
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
})

export default CatalogPageContainer