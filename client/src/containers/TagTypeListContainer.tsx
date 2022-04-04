import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Context} from '../components/AdminRouter';
import SearchTableInput from '../components/tables/SearchTableInput';
import TagTypesTable, {THeadTableField} from '../components/tables/TagTypesTable';
import {getAllTagTypes} from '../http/adminAPI/tagTypesAPI';
import {ADMIN_ROUTE, TAGTYPES_ROUTE} from '../utils/consts';
import {pagination} from '../utils/pagination';
import Pages from '../components/Pages';

const FIELDS: THeadTableField[] = [
	{_id: '_id', title: '_id', sortable: true},
	{_id: 'title', title: 'Название', sortable: true},
	{_id: 'slug', title: 'Slug', sortable: true},
	{_id: 'createdDate', title: 'Дата создания', 'sortable': true},
	{_id: 'updatedDate', title: 'Дата обновления', 'sortable': true}
];

const TagTypeListContainer = observer(() => {
	const {tagType} = useContext(Context);

	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		getAllTagTypes()
			.then(data => {
				tagType.setTagTypes(data.tagTypes);
				tagType.setTotalCount(data.totalCount);
				tagType.setLimit(data.limit);
			})
			.finally(() => setLoading(false));
	}, []);

	const pages = pagination(tagType.totalCount, tagType.limit);

	const handleNavEdit = (id: string) => {
		navigate(`${ADMIN_ROUTE}${TAGTYPES_ROUTE}/${id}/edit`);
	};

	return (
		<>
			<SearchTableInput/>
			{loading
				?
				<Spinner animation="border" className="m-auto d-block"/>
				:
				<>
					<TagTypesTable
						fields={FIELDS}
						tagTypes={tagType.tagTypes}
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

export default TagTypeListContainer;