import {makeAutoObservable} from 'mobx';
import {TypeProduct} from '../admin/ProductStore';

export interface IProductsStore {
    allProducts: TypeProduct[]
    allFilteredProducts: TypeProduct[]
    paginatedProducts: TypeProduct[]
    currentPage: number
    totalCount: number
    limit: number
    setAllProducts: (products: TypeProduct[]) => void
    setAllFilteredProducts: (products: TypeProduct[]) => void
    setPaginatedProducts: (products: TypeProduct[]) => void
    setTotalCount: (totalCount: number) => void
    setCurrentPage: (currentPage: number) => void
    setLimit: (limit: number) => void
}

class ProductsStore implements IProductsStore {
    _allProducts: TypeProduct[] = [];
    _allFilteredProducts: TypeProduct[] = [];
    _paginatedProducts: TypeProduct[] = [];
    _currentPage: number;
    _totalCount: number;
    _limit: number;

    constructor() {
        this._allProducts = [];
        this._allFilteredProducts = [];
        this._paginatedProducts = [];
        this._currentPage = 1;
        this._totalCount = 0;
        this._limit = 1;
        makeAutoObservable(this);
    }

    // Setters
    setAllProducts(products: TypeProduct[]): void {
        this._allProducts = products;
    }

    setAllFilteredProducts(products: TypeProduct[]): void {
        this._allFilteredProducts = products;
    }

    setPaginatedProducts(products: TypeProduct[]): void {
        this._paginatedProducts = products;
    }

    setCurrentPage(currentPage: number): void {
        this._currentPage = currentPage;
    }

    setTotalCount(totalCount: number): void {
        this._totalCount = totalCount;
    }

    setLimit(limit: number): void {
        this._limit = limit;
    }

    // Getters
    get allProducts(): TypeProduct[] {
        return this._allProducts;
    }

    get allFilteredProducts(): TypeProduct[] {
        return this._allFilteredProducts;
    }

    get paginatedProducts(): TypeProduct[] {
        return this._paginatedProducts;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    get totalCount(): number {
        return this._totalCount;
    }

    get limit(): number {
        return this._limit;
    }
}

export default new ProductsStore();