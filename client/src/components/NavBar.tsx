import React, { FC } from 'react';
import { Navbar } from 'react-bootstrap';
import NavBarContainer from '../containers/NavBarContainer';

export const NavBar: FC<any> = () => {
   return (
      <Navbar 
         sticky="top" 
         bg="dark" 
         variant="dark" 
         className='pt-3 pb-3'
         style={{boxShadow: "rgb(33 37 41) 0px 0px 0.35rem"}}
      >
         <NavBarContainer/>
    </Navbar>
   );
};