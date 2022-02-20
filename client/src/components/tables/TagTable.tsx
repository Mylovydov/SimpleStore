import React, {FC} from 'react';
import {Table} from 'react-bootstrap';
import {TypeTagType} from '../../store/admin/TagTypeStore';
import TableHead from './TableHead';
import {TBaseTableItem, THeadTableField} from './TagTypesTable';

export type TTagTableProps<T extends TBaseTableItem = TBaseTableItem> = {
  tags: T[],
  types: TypeTagType[],
  fields: THeadTableField[]
  // sortField: string
  // sortDirection: string
  // onSortFieldChange: (value: string) => void
  // onSortDirectionChange: (value: 'ASC' | 'DESC') => void
  onClick: (id: string) => void
}

const TagTable: FC<TTagTableProps> = ({tags, fields, types, onClick}) => {

  const tagTableItems = tags.map(tag => {
    return (
      <tr key={tag._id} style={{cursor: 'pointer'}} onClick={() => onClick(tag._id)}>
        {fields.map(field => {
          switch (field._id) {
            case 'tagTypeId': {
              return types.map(type => {
                if (tag.tagTypeId.includes(type._id)) {
                  return (
                    <td
                      key={field._id}
                    >
                      {type.title}
                    </td>
                  );
                }
                return null;
              });
            }
            case 'createdDate':
              const createdDate = new Date(tag[field._id]).toLocaleDateString('ru-RU');
              const createdTime = new Date(tag[field._id]).toLocaleTimeString('ru-RU');
              return (
                <td
                  key={field._id}
                >
                  <div>{createdDate}</div>
                  <div>{createdTime}</div>
                </td>
              );
            case 'updatedDate':
              const updatedDate = new Date(tag[field._id]).toLocaleDateString('ru-RU');
              const updatedTime = new Date(tag[field._id]).toLocaleTimeString('ru-RU');
              return (
                <td
                  key={field._id}
                >
                  <div>{updatedDate}</div>
                  <div>{updatedTime}</div>
                </td>
              );
            default:
              return (
                <td
                  key={field._id}
                >
                  {tag[field._id]}
                </td>
              );
          }
        })}
      </tr>
    );
  });

  return (
    <Table striped bordered hover responsive>
      <thead style={{backgroundColor: '#212529', color: 'white', height: 70}}>
      <TableHead
        fields={fields}
      />
      </thead>
      <tbody>
      {tagTableItems}
      </tbody>
    </Table>
  );
};

export default TagTable;