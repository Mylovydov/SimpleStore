import { observer } from 'mobx-react-lite';
import React, { StrictMode, useContext, useEffect, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import {BrowserRouter} from 'react-router-dom'
import { Context } from './components/AdminRouter';
import AppRouter from './components/AppRouter';
import { check } from './http/adminAPI/authAPI';

const  App = observer(() => {



  // useEffect(() => {
  //   check().then(_id => {
  //     admin.setAdmin({_id})
  //     admin.setIsAuth(true)
  //   }).finally(() => setLoading(false))
  // }, [])
  //
  // if (loading) {
  //   return <Spinner animation='border'/>
  // }
  
  return (
    <BrowserRouter>
      <StrictMode>
        <AppRouter />
      </StrictMode>
    </BrowserRouter>
  );
})

export default App;