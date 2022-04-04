import React, {FC} from 'react';
import {THeadTableField} from './TagTypesTable';

export type TTableHeadProps = {
	fields: THeadTableField[]
}

const TableHead: FC<TTableHeadProps> = ({fields}) => {
	const tableHeadItems = fields.map(field => {
		switch (field._id) {
		case '_id':
			return <th key={field._id} style={{minWidth: 80}}>{field.title}</th>;
		case 'title':
			return <th key={field._id} style={{minWidth: 140}}>{field.title}</th>;
		case 'price':
			return <th key={field._id} style={{minWidth: 80}}>{field.title}</th>;
		case 'image':
			return <th key={field._id} style={{minWidth: 150}}>{field.title}</th>;
		case 'description':
			return <th key={field._id} style={{minWidth: 300}}>{field.title}</th>;
		case 'orderCounter':
			return <th key={field._id} style={{minWidth: 30}}>{field.title}</th>;
		case 'tagsIds':
			return <th key={field._id} style={{minWidth: 20}}>{field.title}</th>;
		case 'slug':
			return <th key={field._id} style={{minWidth: 100}}>{field.title}</th>;
		case 'createdDate':
			return <th key={field._id} style={{minWidth: 100}}>{field.title}</th>;
		case 'updatedDate':
			return <th key={field._id} style={{minWidth: 100}}>{field.title}</th>;
		default:
			return <th key={field._id} style={{minWidth: 100}}>{field.title}</th>;
		}
	});

	return (
		<tr>
			{tableHeadItems}
		</tr>
	);
};

export default TableHead;