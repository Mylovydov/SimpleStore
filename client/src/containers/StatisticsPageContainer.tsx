import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Context } from '../components/AdminRouter';
import { getAllProducts } from '../http/adminAPI/productsAPI';
import { getAllTags } from '../http/adminAPI/tagsAPI';
import { getAllTagTypes } from '../http/adminAPI/tagTypesAPI';
import StatisticsPage from '../pages/StatisticsPage';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';

const StatisticsPageContainer = observer(() => {
   const { tag, tagType, product, admin } = useContext(Context)
   // const [loading, setLoading] = useState(true)

   // useEffect(() => {
   //    getAllProducts().then(products => product.setProducts(products))
   //       .catch(e => {
   //       alert(e.response.data.message)
   //    })
   // }, [])

   // if (loading) {
   //    return <Spinner animation='border'
   //       style={{position: 'relative', top: '50%', left: '50%'}}/>
   //  }

   return (
      <StatisticsPage />
   )
})

export default StatisticsPageContainer