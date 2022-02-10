import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Pagination } from 'react-bootstrap';

export type TypePagesProps = {
   pages: number[]
   currentPage: number
   onChangePage: (currentPage: number) => void
}

const Pages: FC<TypePagesProps> = observer(({ pages, currentPage, onChangePage }) => {

   return (
      <Pagination className='mt-2'>
         {pages.map(page => {
            return (
               <Pagination.Item
                  active={currentPage === page}
                  key={page}
                  style={{color: '#198754'}}
                  onClick={() => onChangePage(page)}
               >
                  {page}
               </Pagination.Item>
            )
         })}
      </Pagination>
   )
})

export default Pages