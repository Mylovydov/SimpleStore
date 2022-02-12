import {makeAutoObservable} from 'mobx';
import {TypeTag} from '../admin/TagStore';
import {TypeTagType} from '../admin/TagTypeStore';
import {TypePrepareFilterBarArrData, TypePrepareFilterBarData} from '../../utils/prepareFilterBarData';

export type TypeShopTag = Omit<TypeTag, 'createdDate' | 'updatedDate' | '__v'>
export type TypeShopTagType = Omit<TypeTagType, 'createdDate' | 'updatedDate' | '__v'>

export interface ITagStore {
    tags: TypeShopTag[]
    tagTypes: TypeShopTagType[]
    filterBarData: TypePrepareFilterBarData
    filterBarArrData: TypePrepareFilterBarArrData
    setTags: (tags: TypeTag[]) => void
    setTagTypes: (tagTypes: TypeTagType[]) => void
    setFilterBarData: (filterBarData: TypePrepareFilterBarData) => void
    //==============================================================
    setFilterBarArrData: (filterArrBarData: TypePrepareFilterBarArrData) => void
}

class TagStore implements ITagStore {
    _tags: TypeTag[] = [];
    _tagTypes: TypeTagType[] = [];
    _filterBarData: TypePrepareFilterBarData = {};
    //==============================================================
    _filterBarArrData: TypePrepareFilterBarArrData = [];

    constructor() {
        this._tags = [];
        this._tagTypes = [];
        this._filterBarData = {};
        this._filterBarArrData = [];
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

    //==============================================================
    setFilterBarArrData(filterArrBarData: TypePrepareFilterBarArrData): void {
        this._filterBarArrData = filterArrBarData;
    }
    //==============================================================

    get tags(): TypeTag[] {
        return this._tags;
    }

    get tagTypes(): TypeTagType[] {
        return this._tagTypes;
    }

    get filterBarData(): TypePrepareFilterBarData {
        return this._filterBarData;
    }

    //==============================================================
    get filterBarArrData(): TypePrepareFilterBarArrData {
        return this._filterBarArrData;
    }
    //==============================================================
}

export default new TagStore();