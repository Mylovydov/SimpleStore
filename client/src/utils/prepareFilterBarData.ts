import {TypeShopTag, TypeShopTagType} from '../store/shop/TagStore';

export type TypeIsChecked = {
    isChecked: boolean
}

export type TypePrepareTagsDataItem = TypeShopTag & TypeIsChecked

export type TypePrepareFilterBarData = {
    [key: TypeShopTagType['_id']]: [TypeShopTagType, TypePrepareTagsDataItem[]]
}

export function prepareFilterBarData(tagTypes: TypeShopTagType[], tags: TypeShopTag[]) {
    const prepareTagTypes = tagTypes.reduce((acc: TypePrepareFilterBarData, tagType: TypeShopTagType) => {
        acc[tagType._id] = [tagType, []]
        return acc
    }, {});

    tags.forEach(tag => {
        prepareTagTypes[tag.tagTypeId][1].push({...tag, isChecked: false})
    })

    return prepareTagTypes
}