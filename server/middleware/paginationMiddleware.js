module.exports = function (myLimit) {
   return function (request, response, next) {
      const pages = request.params[0].split(';').reduce((acc, item) => {
         const [key, value] = item.split('=')

         switch(key) {
            case 'page':
               acc[key]=value; break;
            default: break;
         }
         return acc
      }, {})

      let { page } = pages
      
      page = parseInt(page) || 1
      const limit = parseInt(myLimit) || 8

      let skip = page * limit - limit

      request.skip = skip
      request.limit = limit
      next()
   }
}


// module.exports = function (mySize) {
//    return function (request, response, next) {
//       const prop = request.params[0].split(';')
//       console.log('prop', prop);

//       const b = prop.reduce((acc, item) => {
//          const [key, value] = item.split('=')
//          console.log('key', key, 'value', value)

//          switch(key) {
//             case 'category':
//                acc[key]=value; break;
//             case 'page':
//                acc[key]=value; break;
//             case '': break;
//             default:
//                acc['filters']={...acc['filters'], [key]:value.split(',')}
//          }
//          return acc
//       }, {})
//       console.log('b', b);
//       next()
//    }
// }