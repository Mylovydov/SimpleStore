import React, { FC } from 'react';
import { Table } from 'react-bootstrap';
import { TypeTagType } from '../../store/TagTypeStore';
import TableHead from './TableHead';

export type THeadTableField = {
   _id: string
   title: string,
   sortable: boolean
}

export type TBaseTableItem = {
   _id: string,
   [key: string]: any
 }

export type TTagTypesTableProps<T extends TBaseTableItem = TBaseTableItem> = {
   tagTypes: T[],
   fields: THeadTableField[]
   // sortField: string
   // sortDirection: string
   // onSortFieldChange: (value: string) => void
   // onSortDirectionChange: (value: 'ASC' | 'DESC') => void
   onClick: (id: string) => void
}

const TagTypesTable: FC<TTagTypesTableProps> = ({tagTypes, fields, onClick}) => {
   
   const tagTypesTableItems = tagTypes.map(tagType => {
      return (
         <tr key={tagType._id} style={{cursor: 'pointer'}} onClick={() => onClick(tagType._id)}>
            {fields.map(field => {
               switch (field._id) {
                  case 'createdDate':
                     const createdDate = new Date(tagType[field._id]).toLocaleDateString('ru-RU')
                     const createdTime = new Date(tagType[field._id]).toLocaleTimeString('ru-RU')
                     return (
                        <td
                           key={field._id}
                        >
                           <div>{createdDate}</div>
                           <div>{createdTime}</div>
                        </td>
                     )
                  case 'updatedDate':
                     const updatedDate = new Date(tagType[field._id]).toLocaleDateString('ru-RU')
                     const updatedTime = new Date(tagType[field._id]).toLocaleTimeString('ru-RU')

                     return (
                        <td
                           key={field._id}
                        >
                           <div>{updatedDate}</div>
                           <div>{updatedTime}</div>
                        </td>
                     )
                  default:
                     return (
                        <td
                           key={field._id}
                        >
                           {tagType[field._id]}
                        </td>
                     )
               }
            })}
         </tr>
      )
   })

   return (
      <Table striped bordered hover responsive>
         <thead style={{backgroundColor: '#212529', color: 'white', height: 70}}>
            <TableHead fields={fields}/>
         </thead>
         <tbody>
            {tagTypesTableItems}
         </tbody>
      </Table>
   );
};

export default TagTypesTable;