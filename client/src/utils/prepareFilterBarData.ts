import {TypeShopTag, TypeShopTagType} from '../store/shop/TagStore';

export type TypeIsChecked = {
    isChecked: boolean
}

export type TypePrepareTagsDataItem = TypeShopTag & TypeIsChecked

export type TypePrepareFilterBarData = {
    [key: TypeShopTagType['_id']]: [TypeShopTagType, TypePrepareTagsDataItem[]]
}

let str = 'category=refrigerator;brands=reno/';

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
    const prepareTags = tags.map(tag => filterTags.includes(tag.slug) ? {...tag, isChecked: true} : {...tag, isChecked: false})


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