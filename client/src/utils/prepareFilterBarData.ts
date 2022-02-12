import {TypeShopTag, TypeShopTagType} from '../store/shop/TagStore';

export type TypeIsChecked = {
    isChecked: boolean
}


// const tagTypes = [
//     {_id: '61fa89bc2e6bb14e0e47c9f8', title: 'Категория', slug: 'category'},
//     {_id: '61fa89ca2e6bb14e0e47c9fb', title: 'Бренды', slug: 'brands'},
//     {_id: '61fa89d52e6bb14e0e47c9fe', title: 'Автор', slug: 'author'}
// ];
// const tags = [
//     {_id: '61fa8b982e6bb14e0e47ca04', title: 'Книги', tagTypeId: '61fa89bc2e6bb14e0e47c9f8', slug: 'books'},
//     {_id: '61fa8ba42e6bb14e0e47ca07', title: 'Машины', tagTypeId: '61fa89bc2e6bb14e0e47c9f8', slug: 'cars'},
//     {_id: '61fa8bc42e6bb14e0e47ca0d', title: 'Reno', tagTypeId: '61fa89ca2e6bb14e0e47c9fb', slug: 'reno'},
//     {_id: '61fa8bcd2e6bb14e0e47ca10', title: 'Audi', tagTypeId: '61fa89ca2e6bb14e0e47c9fb', slug: 'audi'},
//     {_id: '61fa8c252e6bb14e0e47ca1c', title: 'Бушков', tagTypeId: '61fa89d52e6bb14e0e47c9fe', slug: 'bushkov'},
//     {_id: '61fa8c3f2e6bb14e0e47ca1f', title: 'С. Кинг', tagTypeId: '61fa89d52e6bb14e0e47c9fe', slug: 'king'},
// ];



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