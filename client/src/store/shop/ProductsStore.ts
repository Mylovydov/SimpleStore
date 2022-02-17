import {makeAutoObservable} from 'mobx';
import {TypeProduct} from '../admin/ProductStore';

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
    prevSearch: string
    currentSearch: string
    setProducts: (products: TypeProduct[]) => void
    // setTotalCount: (totalCount: number) => void
    setCurrentPage: (currentPage: number) => void
    setLimit: (limit: number) => void
    setCurrentFilters: (filter: string) => void
    setData: (data: any) => void
    setPrevFilters: (prevUrl: string) => void
    setPrevSearch: (search: string) => void
    setCurrentSearch: (currentSearch: string) => void
}

class ProductsStore implements IProductsStore {
    _products: TypeProduct[] = [];
    _currentPage: number;
    _prevFilters: string | null;
    _totalCount: number;
    _limit: number;
    _currentFilters: string;
    _prevSearch: string
    _currentSearch: string

    constructor() {
        this._products = [];
        this._currentPage = 1;
        this._prevFilters = null;
        this._totalCount = 0;
        this._limit = 4;
        this._currentFilters = '';
        this._prevSearch = ''
        this._currentSearch = ''
        makeAutoObservable(this);
    }

    // Setters
    setData(data: any): void {
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
    }

    // setTotalCount(totalCount: number): void {
    //     this._totalCount = totalCount;
    // }

    setLimit(limit: number): void {
        this._limit = limit;
    }

    setCurrentFilters(currentFilters: string): void {
        this._currentFilters = currentFilters;
    }

    setPrevSearch(prevSearch: string): void {
        this._prevSearch = prevSearch;
    }

    setCurrentSearch(currentSearch: string): void {
        this._currentSearch = currentSearch;
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

    get prevSearch(): string {
        return this._prevSearch;
    }

    get currentSearch(): string {
        return this._currentSearch;
    }
}

export default new ProductsStore();