const Tag = require('../models/Tag');
const TagType = require('../models/TagType');

module.exports = async function (request, response, next) {
    const {filters} = request;

    let filteredTagsId = [];

    if (filters.tagTypes.length && filters.tags.length) {
        console.log('есть фильтры');

        // Get an array of object id types
        const foundTagTypes = await TagType.find(
            {slug: {$in: filters.tagTypes}},
            {_id: 1, slug: 1});

        const prepareFilterData = filters.tagTypes.map((tagTypeSlug, i) => {
            return {tagTypeId: foundTagTypes.filter(tagType => tagType.slug === tagTypeSlug), slug: filters.tags[i]};
        });

        const filterData = prepareFilterData.map(item => ({...item, tagTypeId: item.tagTypeId[0]._id}));

        // Get an array of tagId objects
        const foundTagsIds = await Tag.find(
            {$or: [...filterData]},
            {_id: 1});

        // Get an array of tagId
        filteredTagsId = foundTagsIds.map(tagId => tagId._id);
    }

    // console.log('filteredTagsId', filteredTagsId);
    request.filters = filteredTagsId;
    next();
};