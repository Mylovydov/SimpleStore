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



export type TypePrepareTagsDataArrItem = [TypeShopTagType, TypePrepareTagsDataItem[]]

export type TypePrepareFilterBarArrData = TypePrepareTagsDataArrItem[]

export function prepareFilterBarDataArr(tagTypes: TypeShopTagType[], tags: TypeShopTag[]) {
    const prepareArr =  tagTypes.reduce((acc: TypePrepareFilterBarArrData, tagType: TypeShopTagType)=> {
        acc.push([tagType, []])
        return acc
    }, [])

    prepareArr.forEach((prepareItem: TypePrepareTagsDataArrItem) => {
        tags.forEach((tagItem: TypeShopTag ) => {
            if (prepareItem[0]._id === tagItem.tagTypeId) {
                prepareItem[1].push({...tagItem, isChecked: false})
            }
        })
    })

    return prepareArr
}