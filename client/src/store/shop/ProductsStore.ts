import {makeAutoObservable} from 'mobx';
import {TypeProduct} from '../admin/ProductStore';

export type TypeProductsQuantity = {
    quantity: number
}

export type TypeCartItem =
    Omit<
        TypeProduct, 'description' | 'orderCounter' | 'tagsIds' | 'slug' | 'createdDate' | 'updatedDate'
        >
    & TypeProductsQuantity

export interface IProductsStore {
    products: TypeProduct[]

    cart: TypeCartItem[]
    setCart: (basket: TypeCartItem[]) => void

    currentPage: number
    setCurrentPage: (currentPage: number) => void

    currentFilters: string
    prevFilters: string | null
    setCurrentFilters: (filter: string) => void
    setPrevFilters: (prevUrl: string) => void

    currentSearch: string
    prevSearch: string
    setCurrentSearch: (currentSearch: string) => void
    setPrevSearch: (search: string) => void

    totalCount: number
    limit: number

    setData: (data: any) => void
    // setProducts: (products: TypeProduct[]) => void
    // setTotalCount: (totalCount: number) => void

    setLimit: (limit: number) => void
}

class ProductsStore implements IProductsStore {
    _products: TypeProduct[] = [];
    _basket: TypeCartItem[];
    _currentPage: number;
    _totalCount: number;
    _limit: number;
    _prevFilters: string | null;
    _currentFilters: string;
    _prevSearch: string;
    _currentSearch: string;

    constructor() {
        this._products = [];
        this._basket = [];
        this._currentPage = 1;
        this._totalCount = 0;
        this._limit = 4;
        this._currentFilters = '';
        this._prevFilters = null;
        this._currentSearch = '';
        this._prevSearch = '';
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

    setCart(basket: TypeCartItem[]): void {
        this._basket = basket;
    }

    // setProducts(products: TypeProduct[]): void {
    //     this._products = products;
    // }

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

    get cart(): TypeCartItem[] {
        return this._basket;
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