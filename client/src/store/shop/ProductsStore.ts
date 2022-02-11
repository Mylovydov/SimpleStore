import {makeAutoObservable} from 'mobx';
import {TypeProduct} from '../admin/ProductStore';
import {TypePrepareFilterBarData} from '../../utils/prepareFilterBarData';

export interface IProductsStore {
    products: TypeProduct[]
    paginatedProducts: TypeProduct[]
    currentPage: number
    totalCount: number
    limit: number
    setProducts: (products: TypeProduct[]) => void
    setPaginatedProducts: (products: TypeProduct[]) => void
    setTotalCount: (totalCount: number) => void
    setCurrentPage: (currentPage: number) => void
    setLimit: (limit: number) => void
}

class ProductsStore implements IProductsStore {
    _products: TypeProduct[] = [];
    _paginatedProducts: TypeProduct[] = [];
    _currentPage: number;
    _totalCount: number;
    _limit: number;

    constructor() {
        this._products = [];
        this._paginatedProducts = [];
        this._currentPage = 1;
        this._totalCount = 0;
        this._limit = 1;
        makeAutoObservable(this);
    }

    // Setters
    setProducts(products: TypeProduct[]): void {
        this._products = products;
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
    get products(): TypeProduct[] {
        return this._products;
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