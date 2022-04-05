import { makeAutoObservable } from 'mobx';

export type TypeTag = {
	_id: string
	title: string,
	tagTypeId: string,
	slug: string,
	createdDate: any,
	updatedDate: any
}

export interface ITagStore {
	tags: TypeTag[];
	totalCount: number;
	limit: number;
	setTags: (tagTypes: TypeTag[]) => void;
	setTotalCount: (totalCount: number) => void;
	setLimit: (limit: number) => void;
}

class TagStore implements ITagStore {
	_tags: TypeTag[] = [];
	_totalCount: number;
	_limit: number;

	constructor() {
		this._tags = [];
		this._totalCount = 0;
		this._limit = 1;
		makeAutoObservable(this);
	}

	setTags(tags: TypeTag[]): void {
		this._tags = tags;
	}

	setTotalCount(totalCount: number): void {
		this._totalCount = totalCount;
	}

	setLimit(limit: number): void {
		this._limit = limit;
	}

	get tags(): TypeTag[] {
		return this._tags;
	}

	get totalCount(): number {
		return this._totalCount;
	}

	get limit(): number {
		return this._limit;
	}
}

export default new TagStore();