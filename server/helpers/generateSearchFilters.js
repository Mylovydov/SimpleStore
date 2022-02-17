const generateSearchFilters = (search, filters) => {
    const reqExp = search ? new RegExp(search, 'ig') : '';
    let searchFilters = {};

    if (filters.length && reqExp) {
        console.log('Есть фильтры и поиск');
        searchFilters = {
            $and: [
                {tagsIds: {$all: filters}},
                {title: {$regex: reqExp}}
            ]
        };
    }
    if (filters.length && !reqExp) {
        console.log('Есть фильтры и нет поиска');
        searchFilters = {tagsIds: {$all: filters}};
    }

    if (!(filters.length) && reqExp) {
        console.log('Нет фильтров и есть поиск');
        searchFilters = {title: {$regex: reqExp}};
    }

    return searchFilters;
};

module.exports = generateSearchFilters;