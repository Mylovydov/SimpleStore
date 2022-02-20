import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Context} from '../components/AdminRouter';
import Pages from '../components/Pages';
import SearchTableInput from '../components/tables/SearchTableInput';
import TagTable from '../components/tables/TagTable';
import {THeadTableField} from '../components/tables/TagTypesTable';
import {getAllTags} from '../http/adminAPI/tagsAPI';
import {getAllTagTypes} from '../http/adminAPI/tagTypesAPI';
import {ADMIN_ROUTE, TAGS_ROUTE} from '../utils/consts';
import {pagination} from '../utils/pagination';

const FIELDS: THeadTableField[] = [
  {_id: '_id', title: '_id', sortable: true},
  {_id: 'title', title: 'Название', sortable: true},
  {_id: 'tagTypeId', title: 'Тип', sortable: false},
  {_id: 'slug', title: 'Slug', 'sortable': true},
  {_id: 'createdDate', title: 'Дата создания', 'sortable': true},
  {_id: 'updatedDate', title: 'Дата обновления', 'sortable': true}
];

const TagListContainer = observer(() => {
  const {tag, tagType} = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllTags().then(data => {
      tag.setTags(data.tags);
      tag.setTotalCount(data.totalCount);
      tag.setLimit(data.limit);

    }).catch(e => alert(e.data.message));
    getAllTagTypes()
      .then(data => tagType.setTagTypes(data.tagTypes))
      .catch(e => alert(e.data.message))
      .finally(() => setLoading(false));
  }, []);


  const pages = pagination(tag.totalCount, tag.limit);

  const handleNavEdit = (id: string) => {
    navigate(`${ADMIN_ROUTE}${TAGS_ROUTE}/${id}/edit`);
  };

  return (
    <>
      <SearchTableInput/>
      {loading
        ?
        <Spinner animation="border" className="m-auto d-block"/>
        :
        <>
          <TagTable
            types={tagType.tagTypes}
            tags={tag.tags}
            fields={FIELDS}
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

export default TagListContainer;