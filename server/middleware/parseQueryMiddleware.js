module.exports = function (request, response, next) {
    const queryData = request.params[0];

    let queryParams;
    if (queryData === '' || queryData.indexOf('=') === -1) {
        queryParams = {page: '', limit: '', tagTypes: [], tags: []};
    } else {
        queryParams = queryData.split(';').reduce((acc, item) => {
            if (item) {
                let [key, value] = item.split('=');
                switch (key) {
                    case 'page':
                        acc['page'] = value; break;
                    case 'limit':
                        acc['limit'] = value; break;
                    default:
                        acc.tagTypes.push(key);
                        acc.tags.push(value);
                }
            }
            return acc;
        }, {page: '', limit: '', tagTypes: [], tags: []});
    }

    request.page = queryParams.page;
    request.limit = queryParams.limit;
    request.filters = {tagTypes: queryParams.tagTypes, tags: queryParams.tags};
    next()
};