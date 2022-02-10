import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';
import { Image, Table } from 'react-bootstrap';
import { TypeTag } from '../../store/admin/TagStore';
import { Context } from '../AdminRouter';
import TableHead from './TableHead'
import { TBaseTableItem, THeadTableField } from './TagTypesTable';

export type TProductTableProps<T extends TBaseTableItem = TBaseTableItem> = {
    products: T[]
    tags: TypeTag[]
    fields: THeadTableField[]
    // sortField: string
    // sortDirection: string
    // onSortFieldChange: (value: string) => void
    // onSortDirectionChange: (value: 'ASC' | 'DESC') => void
    onClick: (id: string) => void
}

const ProductTable: FC<TProductTableProps> = observer(({products, fields, tags, onClick}) => {
    
    const productTableItems = products.map(product => {
        return (
            <tr key={product._id} style={{cursor: 'pointer'}} onClick={() => onClick(product._id)}>
                {fields.map(field => {
                    switch (field._id) {
                        case 'image':
                            return <td key={field._id}><Image src={process.env.REACT_APP_API_URL + product[field._id]} style={{width: '100%'}}/></td>
                        case 'tagsIds':
                            return ( 
                                <td key={field._id}>
                                    {tags.map(tag => {
                                        if (product[field._id].includes(tag._id)) {

                                            return <div key={tag._id}>{tag.title}</div>
                                        }
                                        return null
                                    })}
                                </td>)
                        case 'createdDate':
                            const createdDate = new Date(product[field._id]).toLocaleDateString('ru-RU')
                            const createdTime = new Date(product[field._id]).toLocaleTimeString('ru-RU')
                            return (
                                <td
                                    key={field._id}
                                >
                                    <div>{createdDate}</div>
                                    <div>{createdTime}</div>
                                </td>
                            )
                        case 'updatedDate':
                            const updatedDate = new Date(product[field._id]).toLocaleDateString('ru-RU')
                            const updatedTime = new Date(product[field._id]).toLocaleTimeString('ru-RU')
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
                                    {product[field._id]}
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
                <TableHead
                    fields={fields}
                />
            </thead>
            <tbody>
                {productTableItems}
            </tbody>
        </Table>
    );
})

export default ProductTable;