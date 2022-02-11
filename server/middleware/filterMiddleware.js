const Tag = require('../models/Tag');

module.exports = async function (request, response, next) {
    // console.log('request.params[0]', request.params[0]);
    const filters = request.params[0].slice('catalog/'.length, -1).split(';').reduce((acc, item) => {
        if (item) {
            const [key, value] = item.split('=');
            switch (key) {
                case 'page':
                    break;
                default:
                    return [...acc, ...value.split(',')];
            }
            return acc;
        }
    }, []);

    // Получаем массив объектов id тегов
    const foundTagsIds = await Tag.find({slug: {$in: filters}}, {_id: 1});
    // Получаем массив id тегов
    const filteredTagsId = foundTagsIds.map(tagId => tagId._id);

    request.userFilters = filteredTagsId || [];
    next();
};


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