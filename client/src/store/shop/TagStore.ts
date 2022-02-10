import { makeAutoObservable } from "mobx"
import {TypeTag} from "../admin/TagStore"


export interface ITagStore {
    tags: TypeTag[]
    setTags: (tagTypes: TypeTag[]) => void
}

class TagStore implements ITagStore {
    _tags: TypeTag[] = []

    constructor() {
        this._tags = []
        makeAutoObservable(this)
    }

    setTags(tags: TypeTag[]): void {
        this._tags = tags
    }

    get tags(): TypeTag[] {
        return this._tags
    }
}

export default new TagStore()