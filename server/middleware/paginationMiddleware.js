module.exports = function (request, response, next) {
    const paginationQuery = request.params[0]

    // console.log('paginationQuery', paginationQuery);

    const pages = paginationQuery.split(';').reduce((acc, item) => {
        const [key, value] = item.split('=');
        switch (key) {
            case 'page':
                acc[key] = value;
                break;
            case 'limit':
                acc[key] = value;
                break;
            default:
                break;
        }
        return acc;
    }, {});

    let {page, limit} = pages;

    // console.log('page', page);
    // console.log('limit', limit);

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 50;

    let skip = page * limit - limit;

    // console.log('parseInt(page)', page);
    // console.log('skip', skip);
    request.skip = skip;
    request.limit = limit;
    next();

};







// module.exports = function (request, response, next) {
//     const paginationQuery = request.params[0];
//     console.log('paginationQuery', paginationQuery);
//
//     const pages = request.params[0].split(';').reduce((acc, item) => {
//         const [key, value] = item.split('=');
//         switch (key) {
//             case 'page':
//                 acc[key] = value;
//                 break;
//             case 'limit':
//                 acc[key] = value;
//                 break;
//             default:
//                 break;
//         }
//         return acc;
//     }, {});
//
//     let {page, limit} = pages;
//
//     console.log('page', page);
//     console.log('limit', limit);
//
//     page = parseInt(page) || 1;
//     limit = parseInt(limit) || 8;
//
//     let skip = page * limit - limit;
//
//     console.log('skip', skip);
//     request.skip = skip;
//     request.limit = limit;
//     next();
//
// };
