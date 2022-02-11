import React, {useContext, useEffect, useState} from 'react';
import {Col, Spinner} from 'react-bootstrap';
import FilterProductsBar from '../components/FilterProductsBar';
import {CATALOG_ROUTE} from '../utils/consts';
import {useLocation, useNavigate} from 'react-router-dom';
import {ShopContext} from '../components/PublicRouter';
import {getAllTagTypes} from '../http/shopAPI/tagTypeAPI';
import {getAllTags} from '../http/shopAPI/tagAPI';
import {observer} from 'mobx-react-lite';

export type TypeQueryStateItem = { filtersTitle: string, filters: string[] }

const generateQueryUrl = (arr: TypeQueryStateItem[]) => {
    return arr.reduce((acc: string, item: TypeQueryStateItem, i: number, arr: TypeQueryStateItem[]) => {
        let str = '';
        if (!item.filters.length) {
            return acc;
        }
        i === arr.length - 1
            ?
            str = `${item.filtersTitle}=${item.filters.join(',')}/`
            :
            str = `${item.filtersTitle}=${item.filters.join(',')};`;

        return acc.concat(str);
    }, '');
};

// const generateQueryUrl = (arr: TypeQueryStateItem[], page: number) => {
//     const pageUrl = page > 1 ? `page=${page};` : ''
//
//     const filters = arr.reduce((acc: string, item: TypeQueryStateItem, i: number, arr: TypeQueryStateItem[]) => {
//         let str = ''
//         if (!item.filters.length) {
//             return acc
//         }
//         i === arr.length - 1
//             ?
//             str = `${item.filtersTitle}=${item.filters.join(',')}/`
//             :
//             str = `${item.filtersTitle}=${item.filters.join(',')};`
//
//         return acc.concat(str)
//     }, '')
//
//     return pageUrl + filters
// }


const FilterProductsBarContainer = observer(() => {

    const [query, setQuery] = useState<TypeQueryStateItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const location = useLocation();

    const navigate = useNavigate();
    console.log(location.pathname);

    const {shopProducts, shopTagTypes, shopTags} = useContext(ShopContext);

    useEffect(() => {
        if (location.pathname === '/catalog/') {
            getAllTagTypes().then(data => shopTagTypes.setTagTypes(data))
                .catch(e => alert(e.response.data.message));
            getAllTags().then(data => shopTags.setTags(data))
                .catch(e => alert(e.response.data.message))
                .finally(() => setLoading(false));
        }
    }, [location.pathname]);

    useEffect(() => {
        // const queryUrl = generateQueryUrl(query, shop.currentPage)
        const queryUrl = generateQueryUrl(query);
        // console.log('queryUrl', queryUrl);
        navigate(`${CATALOG_ROUTE}/${queryUrl}`);
    }, [query]);

    const handleChangeFilter = (title: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setQuery((state: TypeQueryStateItem[]) => {
                const candidate = state.some((item: TypeQueryStateItem) => item.filtersTitle === title);
                if (!candidate) {
                    return [...state, {filtersTitle: title, filters: [e.target.value]}];
                } else {
                    return state.map((item: TypeQueryStateItem) => item.filtersTitle === title
                        ?
                        {...item, filters: [...item.filters, e.target.value]}
                        :
                        item
                    );
                }
            });
        } else {
            setQuery((state: TypeQueryStateItem[]) => {
                return state.map((item: TypeQueryStateItem) => item.filtersTitle === title
                    ?
                    {...item, filters: item.filters.filter((slug: string) => slug !== e.target.value)}
                    :
                    item
                );
            });
        }
    };

    let tagsIdsArr: string[] = [];
    let tagTypeIdsArr: string[] = [];

    // if (shopProducts.allFilteredProducts.length) {
    //    tagsIdsArr = shopProducts.allFilteredProducts.map(product => {
    //       return product.tagsIds
    //    }).flat().filter((tagId, i, arr) => arr.indexOf(tagId) === i)
    //
    //    tagTypeIdsArr = shopTags.tags.map(tag => {
    //       return tagsIdsArr.includes(tag._id) ? tag.tagTypeId : ''
    //    }).flat().filter((typeId, i, arr) => arr.indexOf(typeId) === i && typeId !== '')
    // }

    let selectedCheckboxes: string[] = []

    if (location.pathname !== '/catalog/') {
        // console.log('location.pathname', location.pathname);
        selectedCheckboxes = location.pathname
            .split('/')[2]
            .split(';')
            .reduce((acc: string[], item: string) => {
                const [key, value] = item.split('=')
                switch(key) {
                    case 'page': break;
                    case '': break;
                    default:
                        return [...acc, ...value.split(',')]
                }
                return acc
            }, [])
    }

    return (
        <Col md={3}>
            {loading
                ?
                <Spinner
                    animation="border"
                    style={{position: 'absolute', top: '50%', left: '50%'}}
                />
                :
                <FilterProductsBar
                    tags={shopTags.tags}
                    tagTypes={shopTagTypes.tagTypes}
                    onChangeFilter={handleChangeFilter}
                />
            }

        </Col>
    );
});

export default FilterProductsBarContainer;