import {makeAutoObservable} from 'mobx';
import {TypeTag} from '../admin/TagStore';
import {TypeTagType} from '../admin/TagTypeStore';
import {TypePrepareFilterBarData} from '../../utils/prepareFilterBarData';

export type TypeShopTag = Omit<TypeTag, 'createdDate' | 'updatedDate' | '__v'>
export type TypeShopTagType = Omit<TypeTagType, 'createdDate' | 'updatedDate' | '__v'>

export interface ITagStore {
    tags: TypeShopTag[]
    tagTypes: TypeShopTagType[]
    filterBarData: TypePrepareFilterBarData
    setTags: (tags: TypeTag[]) => void
    setTagTypes: (tagTypes: TypeTagType[]) => void
    setFilterBarData: (filterBarData: TypePrepareFilterBarData) => void
}

class TagStore implements ITagStore {
    _tags: TypeTag[] = [];
    _tagTypes: TypeTagType[] = [];
    _filterBarData: TypePrepareFilterBarData = {};

    constructor() {
        this._tags = [];
        this._tagTypes = [];
        this._filterBarData = {};
        makeAutoObservable(this);
    }

    setTags(tags: TypeTag[]): void {
        this._tags = tags;
    }

    setTagTypes(tagTypes: TypeTagType[]): void {
        this._tagTypes = tagTypes;
    }

    setFilterBarData(filterBarData: TypePrepareFilterBarData): void {
        this._filterBarData = filterBarData;
    }

    get tags(): TypeTag[] {
        return this._tags;
    }

    get tagTypes(): TypeTagType[] {
        return this._tagTypes;
    }

    get filterBarData(): TypePrepareFilterBarData {
        return this._filterBarData;
    }
}

export default new TagStore();