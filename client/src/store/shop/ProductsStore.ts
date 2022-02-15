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
    prevFilters: string | null
    totalCount: number
    limit: number
    currentFilters: string
    setProducts: (products: TypeProduct[]) => void
    // setTotalCount: (totalCount: number) => void
    setCurrentPage: (currentPage: number) => void
    // setLimit: (limit: number) => void
    setCurrentFilters: (filter: string) => void
    setData: (data: any) => void
    setPrevFilters: (prevUrl: string) => void
}

class ProductsStore implements IProductsStore {
    _products: TypeProduct[] = [];
    _currentPage: number;
    _prevFilters: string | null;
    _totalCount: number;
    _limit: number;
    _currentFilters: string;

    constructor() {
        this._products = [];
        this._currentPage = 1;
        this._prevFilters = null;
        this._totalCount = 0;
        this._limit = 4;
        this._currentFilters = '';
        makeAutoObservable(this);
    }

    // Setters
    setData(data: any): void {
        console.log('setData', data);
        this._products = data.allProducts;
        if (data.productsTotalCount) {
            this._totalCount = data.productsTotalCount;
        }
        if (data.productsLimit) {
            this._limit = data.productsLimit;
        }
    }

    setProducts(products: TypeProduct[]): void {
        this._products = products;
    }

    setCurrentPage(currentPage: number): void {
        this._currentPage = currentPage;
    }

    setPrevFilters(prevFilters: string): void {
        this._prevFilters = prevFilters;
        console.log('this._prevFilters', this._prevFilters);
    }

    // setTotalCount(totalCount: number): void {
    //     this._totalCount = totalCount;
    // }

    // setLimit(limit: number): void {
    //     this._limit = limit;
    // }

    setCurrentFilters(currentFilters: string): void {
        this._currentFilters = currentFilters;
    }

    // Getters
    get products(): TypeProduct[] {
        return this._products;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    get prevFilters(): string | null {
        return this._prevFilters;
    }

    get totalCount(): number {
        return this._totalCount;
    }

    get limit(): number {
        return this._limit;
    }

    get currentFilters(): string {
        return this._currentFilters;
    }
}

export default new ProductsStore();