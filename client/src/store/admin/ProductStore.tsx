import {makeAutoObservable} from 'mobx';

export type TypeProduct = {
  _id: string
  title: string
  price: number
  image: string
  description: string
  orderCounter: number
  tagsIds: string[]
  slug: string
  createdDate: any
  updatedDate: any
}

export interface IProductStore {
  products: TypeProduct[]
  totalCount: number
  limit: number
  setProducts: (products: TypeProduct[]) => void
  setTotalCount: (totalCount: number) => void
  setLimit: (limit: number) => void
}

class ProductStore implements IProductStore {
  _products: TypeProduct[] = [];
  _totalCount: number;
  _limit: number;

  constructor() {
    this._products = [];
    this._totalCount = 0;
    this._limit = 1;
    makeAutoObservable(this);
  }

  setProducts(products: TypeProduct[]): void {
    this._products = products;
  }

  setTotalCount(totalCount: number): void {
    this._totalCount = totalCount;
  }

  setLimit(limit: number): void {
    this._limit = limit;
  }

  get products(): TypeProduct[] {
    return this._products;
  }

  get totalCount(): number {
    return this._totalCount;
  }

  get limit(): number {
    return this._limit;
  }
}

export default new ProductStore();