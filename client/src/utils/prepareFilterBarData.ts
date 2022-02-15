import {TypeShopTag, TypeShopTagType} from '../store/shop/TagStore';

export type TypeIsChecked = {
    isChecked: boolean
}

export type TypePrepareTagsDataItem = TypeShopTag & TypeIsChecked

export type TypePrepareFilterBarData = {
    [key: TypeShopTagType['_id']]: [TypeShopTagType, TypePrepareTagsDataItem[]]
}

const decodeUrl = (url: string) => {
    if (!url) {
        return {filterType: [], filterTags: []};
    }

    const filterType = url.slice(0, -1).split(';').map(item => item.split('=')[0]);
    const filterTags = url.slice(0, -1).split(';').map(item => item.split('=')[1]);

    return {
        filterType,
        filterTags
    };
};

export function prepareFilterBarData(tagTypes: TypeShopTagType[], tags: TypeShopTag[], filters: string) {
    const {filterType, filterTags} = decodeUrl(filters);
    const prepareTagTypeId = tagTypes.filter(tagType => filterType.includes(tagType.slug)).map(tagType => tagType._id);
    const prepareTags = tags.map(tag => filterTags.includes(tag.slug) && prepareTagTypeId.includes(tag.tagTypeId)
        ? {...tag, isChecked: true}
        : {...tag, isChecked: false}
    );

    const prepareData = tagTypes.reduce((acc: TypePrepareFilterBarData, tagType: TypeShopTagType) => {
        acc[tagType._id] = [tagType, []];
        return acc;
    }, {});

    prepareTags.forEach(tag => {
        prepareData[tag.tagTypeId][1].push(tag);
    });

    return prepareData;
}

// export function prepareFilterBarData(tagTypes: TypeShopTagType[], tags: TypeShopTag[]) {
//     console.log('work');
//     const prepareTagTypes = tagTypes.reduce((acc: TypePrepareFilterBarData, tagType: TypeShopTagType) => {
//         acc[tagType._id] = [tagType, []]
//         return acc
//     }, {});
//
//     tags.forEach(tag => {
//         prepareTagTypes[tag.tagTypeId][1].push({...tag, isChecked: false})
//     })
//
//     return prepareTagTypes
// }