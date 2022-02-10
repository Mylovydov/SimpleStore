module.exports = function (request, response, next) {
   console.log('request.params[0]', request.params);
   const filters = request.params[0].replace('/', '').split(';').reduce((acc, item) => {
      // console.log('item', item)
      const [key, value] = item.split('=')
      switch(key) {
         case 'page': break;
         case '': break;
         default:
            return [...acc, ...value.split(',')]
      }
      return acc
   }, [])

   console.log('filtersfiltersfilters', filters)
   request.userFilters = filters
   next()
}

// ===========================================================================

// module.exports = function (request, response, next) {
//    const filters = request.params[0].replace('/', '').split(';').reduce((acc, item) => {
//       console.log('item', item)
//       const [key, value] = item.split('=')
//       switch(key) {
//          case 'page': break;
//          case '': break;
//          default:
//             return [...acc, ...value.split(',')]
//       }
//       return acc
//    }, [])

//    console.log('filters', filters)
//    request.userFilters = filters
//    next()
// }


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