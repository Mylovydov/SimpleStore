import {TypePrepareFilterBarData, TypePrepareTagsDataItem} from './prepareFilterBarData';
import {TypeShopTagType} from '../store/shop/TagStore';

export const generateQueryUrl = (data: TypePrepareFilterBarData) => {
  return Object.values(data).reduce((acc: string, item: [TypeShopTagType, TypePrepareTagsDataItem[]]) => {
    const [tagType, tags] = item;
    const checkedTagsSlug = tags.filter((tag: TypePrepareTagsDataItem) => tag.isChecked)
      .map((tag: TypePrepareTagsDataItem) => tag.slug);

    if (!(checkedTagsSlug.length)) {
      return acc;
    }

    let str = `${tagType.slug}=${checkedTagsSlug.join()};`;
    return acc.concat(str);
  }, '');
};


export const decodeQueryUrl = (url: string) => {
  if (!url) {
    return {
      filters: '',
      page: '1'
    };
  }

  return url.split(';').reduce((acc: any, item: string) => {
    if (item) {
      const [key, value] = item.split('=');

      switch (key) {
        case 'page':
          return {...acc, page: value};
        case 'sort':
          return {...acc, sort: value};
        case 'search':
          return {...acc, search: value};
        default:
          return {...acc, ['filters']: acc['filters'].concat(`${key}=${value};`)};
      }
    }
    return acc;
  }, {filters: '', page: '1', search: ''});
};

