import {makeAutoObservable} from 'mobx';
import {TypeProduct} from '../admin/ProductStore';
import {TypePrepareFilterBarData} from '../../utils/prepareFilterBarData';

// export interface IProductsStore {
//     products: TypeProduct[]
//     currentPage: number
//     totalCount: number
//     limit: number
//     filter: string
//     setProducts: (products: TypeProduct[]) => void
//     setTotalCount: (totalCount: number) => void
//     setCurrentPage: (currentPage: number) => void
//     setLimit: (limit: number) => void
//     setFilter: (filter: string) => void
// }
// class ProductsStore implements IProductsStore {
//     _products: TypeProduct[] = [];
//     _currentPage: number;
//     _totalCount: number;
//     _limit: number;
//     _filter: string
//
//     constructor() {
//         this._products = [];
//         this._currentPage = 1;
//         this._totalCount = 0;
//         this._limit = 1;
//         this._filter = ''
//         makeAutoObservable(this);
//     }
//
//     // Setters
//     setProducts(products: TypeProduct[]): void {
//         this._products = products;
//     }
//
//     setCurrentPage(currentPage: number): void {
//         this._currentPage = currentPage;
//     }
//
//     setTotalCount(totalCount: number): void {
//         this._totalCount = totalCount;
//     }
//
//     setLimit(limit: number): void {
//         this._limit = limit;
//     }
//
//     setFilter(filter: string): void {
//         this._filter = filter;
//     }
//
//     // Getters
//     get products(): TypeProduct[] {
//         return this._products;
//     }
//
//     get currentPage(): number {
//         return this._currentPage;
//     }
//
//     get totalCount(): number {
//         return this._totalCount;
//     }
//
//     get limit(): number {
//         return this._limit;
//     }
//
//     get filter(): string {
//         return this._filter;
//     }
// }

export interface IProductsStore {
    products: TypeProduct[]
    currentPage: number
    prevUrl: string
    totalCount: number
    limit: number
    filter: string
    setProducts: (products: TypeProduct[]) => void
    setTotalCount: (totalCount: number) => void
    setCurrentPage: (currentPage: number) => void
    setLimit: (limit: number) => void
    setFilter: (filter: string) => void
    setData: (data: any) => void
}

class ProductsStore implements IProductsStore {
    _products: TypeProduct[] = [];
    _currentPage: number;
    _prevUrl: string
    _totalCount: number;
    _limit: number;
    _filter: string

    constructor() {
        this._products = [];
        this._currentPage = 1;
        this._prevUrl = ''
        this._totalCount = 0;
        this._limit = 8;
        this._filter = ''
        makeAutoObservable(this);
    }

    // Setters
    setData(data: any): void {
        this._products = data.allProducts;
        this._totalCount = data.productsTotalCount;
        this._limit = data.productsLimit;
    }

    setProducts(products: TypeProduct[]): void {
        this._products = products;
    }

    setCurrentPage(currentPage: number): void {
        this._currentPage = currentPage;
    }

    setPrevUrl(prevUrl: string): void {
        this._prevUrl = prevUrl;
    }

    setTotalCount(totalCount: number): void {
        this._totalCount = totalCount;
    }

    setLimit(limit: number): void {
        this._limit = limit;
    }

    setFilter(filter: string): void {
        this._filter = filter;
    }

    // Getters
    get products(): TypeProduct[] {
        return this._products;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    get prevUrl(): string {
        return this._prevUrl;
    }

    get totalCount(): number {
        return this._totalCount;
    }

    get limit(): number {
        return this._limit;
    }

    get filter(): string {
        return this._filter;
    }
}

export default new ProductsStore();