import {makeAutoObservable} from 'mobx';
import {TypeTagType} from '../admin/TagTypeStore';

export interface ITagTypeStore {
  tagTypes: TypeTagType[]
  setTagTypes: (tagTypes: TypeTagType[]) => void
}

class TagTypeStore implements ITagTypeStore {
  _tagTypes: TypeTagType[] = [];

  constructor() {
    this._tagTypes = [];
    makeAutoObservable(this);
  }

  setTagTypes(tagTypes: TypeTagType[]): void {
    this._tagTypes = tagTypes;
  }

  get tagTypes(): TypeTagType[] {
    return this._tagTypes;
  }
}

export default new TagTypeStore();