const Tag = require('../models/Tag');
const TagType = require('../models/TagType');

module.exports = async function (request, response, next) {
    const filtersQuery = request.params[0].includes('paginated/')
        ? request.params[0].slice('paginated/'.length, -1)
        : request.params[0].slice(0, -1);

    console.log('filtersQuery', filtersQuery);

    const filters = filtersQuery === '' || filtersQuery.indexOf('=') === -1
        ? {}
        : filtersQuery.split(';').reduce((acc, item) => {
            if (item) {
                const [key, value] = item.split('=');
                switch (key) {
                    case 'page':
                        break;
                    case 'limit':
                        break;
                    default:
                        acc.tagTypes.push(key);
                        acc.tags.push(value);
                        return acc;
                }
                return acc;
            }
        }, {tagTypes: [], tags: []});

    console.log('filtersssss', filters);

    let filteredTagsId = [];

    if (Object.keys(filters).length) {
        console.log('есть фильтры');
        // Получаем массив объектов id типов
        const foundTagTypes = await TagType.find(
            {slug: {$in: filters.tagTypes}},
            {_id: 1, slug: 1});
        console.log('foundTagTypes', foundTagTypes);

        const objArr = filters.tagTypes.map((tagTypeSlug, i) => {
            return {tagTypeId: foundTagTypes.filter(tt => tt.slug === tagTypeSlug), slug: filters.tags[i]};
        });
        const filterData = objArr.map(item => ({...item, tagTypeId: item.tagTypeId[0]._id}));

        console.log('objArr', objArr);
        console.log('filterData', filterData);
        // Получаем массив объектов id тегов
        const foundTagsIds = await Tag.find(
            {$or: filterData},
            {_id: 1});
        // // // Получаем массив id тегов
        filteredTagsId = foundTagsIds.map(tagId => tagId._id);
        console.log('foundTagsIds', foundTagsIds);
    }

    request.userFilters = filteredTagsId;
    next();
};


// module.exports = async function (request, response, next) {
//     const filtersQuery = request.params[0].includes('paginated/')
//         ? request.params[0].slice('paginated/'.length, -1)
//         : request.params[0].slice(0, -1)
//
//     console.log('filtersQuery', filtersQuery);
//
//     const filters = filtersQuery === '' || filtersQuery.indexOf('=') === -1
//         ? []
//         : filtersQuery.split(';').reduce((acc, item) => {
//             if (item) {
//                 const [key, value] = item.split('=');
//                 switch (key) {
//                     case 'page':
//                         break;
//                     case 'limit':
//                         break;
//                     default:
//                         return [...acc, ...value.split(',')];
//                 }
//                 return acc;
//             }
//         }, []);
//
//     console.log('filters', filters);
//
//     let filteredTagsId = []
//
//     if (filters.length) {
//         // Получаем массив объектов id тегов
//         const foundTagsIds = await Tag.find({slug: {$in: filters}}, {_id: 1});
//         // Получаем массив id тегов
//         filteredTagsId = foundTagsIds.map(tagId => tagId._id);
//     }
//
//     request.userFilters = filteredTagsId;
//     next();
// };


// module.exports = async function (request, response, next) {
//     const filtersQuery = request.params[0].slice(0, -1)
//     console.log('request.params', request.params[0]);
//     const filters = filtersQuery === '' || filtersQuery.indexOf('=') === -1
//         ? []
//         : filtersQuery.split(';').reduce((acc, item) => {
//             if (item) {
//                 const [key, value] = item.split('=');
//                 switch (key) {
//                     case 'page':
//                         break;
//                     case 'limit':
//                         break;
//                     default:
//                         return [...acc, ...value.split(',')];
//                 }
//                 return acc;
//             }
//         }, []);
//
//     console.log('filters', filters);
//
//     let filteredTagsId = []
//
//     if (filters.length) {
//         // Получаем массив объектов id тегов
//         const foundTagsIds = await Tag.find({slug: {$in: filters}}, {_id: 1});
//         // Получаем массив id тегов
//         filteredTagsId = foundTagsIds.map(tagId => tagId._id);
//     }
//
//     request.userFilters = filteredTagsId;
//     next();
// };
//


//
// module.exports = async function (request, response, next) {
//     const filters = request.params[0].slice('catalog/'.length, -1).split(';').reduce((acc, item) => {
//         if (item) {
//             const [key, value] = item.split('=');
//             switch (key) {
//                 case 'page':
//                     break;
//                 default:
//                     return [...acc, ...value.split(',')];
//             }
//             return acc;
//         }
//     }, []);
//
//     // Получаем массив объектов id тегов
//     const foundTagsIds = await Tag.find({slug: {$in: filters}}, {_id: 1});
//     // Получаем массив id тегов
//     const filteredTagsId = foundTagsIds.map(tagId => tagId._id);
//
//     request.userFilters = filteredTagsId || [];
//     next();
// };


// module.exports = function (request, response, next) {
//    console.log('request.para', request.params[0].slice('catalog/'.length, -1) === '');
//    const filters = request.params[0].slice('catalog/'.length, -1).split(';').reduce((acc, item) => {
//       if (item) {
//          const [key, value] = item.split('=')
//          switch (key) {
//             case 'page': break;
//             default:
//                return {...acc, [key]:value.split(',')}
//          }
//          return acc
//       }
//    }, {})
//
//    console.log('filtersssss', filters);
//    request.userFilters = filters || {}
//    next()
// }

// ===========================================================================

// module.exports = function (request, response, next) {
//    const filters = request.params[0].replace('/', '').split(';').reduce((acc, item) => {
//       const [key, value] = item.split('=')
//       console.log('key', key)
//       console.log('value', value)
//
//       switch(key) {
//          case 'category':
//             acc[key]=value; break;
//          case 'page': break;
//          case '': break;
//          default:
//             acc['filters']={...acc['filters'], [key]:value.split(',')}
//       }
//       return acc
//    }, {})
//
//    console.log('filtersssss', filters);
//
//    request.userFilters = filters
//    next()
// }