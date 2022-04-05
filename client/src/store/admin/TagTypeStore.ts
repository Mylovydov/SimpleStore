import { makeAutoObservable } from 'mobx';

export type TypeTagType = {
	_id: string
	title: string,
	slug: string,
	createdDate: any,
	updatedDate: any
}

export interface ITagTypeStore {
	tagTypes: TypeTagType[];
	totalCount: number;
	limit: number;
	setTagTypes: (tagTypes: TypeTagType[]) => void;
	setTotalCount: (totalCount: number) => void;
	setLimit: (limit: number) => void;
}

class TagTypeStore implements ITagTypeStore {
	_tagTypes: TypeTagType[] = [];
	_totalCount: number;
	_limit: number;

	constructor() {
		this._tagTypes = [];
		this._totalCount = 0;
		this._limit = 1;
		makeAutoObservable(this);
	}

	setTagTypes(tagTypes: TypeTagType[]): void {
		this._tagTypes = tagTypes;
	}

	setTotalCount(totalCount: number): void {
		this._totalCount = totalCount;
	}

	setLimit(limit: number): void {
		this._limit = limit;
	}

	get tagTypes(): TypeTagType[] {
		return this._tagTypes;
	}

	get totalCount(): number {
		return this._totalCount;
	}

	get limit(): number {
		return this._limit;
	}
}

export default new TagTypeStore();