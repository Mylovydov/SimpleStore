import {makeAutoObservable} from 'mobx';
import {TypeProduct} from '../admin/ProductStore';

export type TypeProductsQuantity = {
	quantity: number
}

export type TypeData = {
	allProducts: TypeProduct[]
	productsTotalCount?: number
	productsLimit?: number
	noveltiesProducts?: TypeProduct[]
	popularProducts?: TypeProduct[]
}

export type TypeCartItem =
	Omit<TypeProduct, 'description' | 'orderCounter' | 'tagsIds' | 'slug' | 'createdDate' | 'updatedDate'>
	& TypeProductsQuantity

export interface IProductsStore {
	products: TypeProduct[];
	noveltiesProducts: TypeProduct[];
	popularProducts: TypeProduct[];

	cart: TypeCartItem[];
	setCart: (cart: TypeCartItem[]) => void;

	currentPage: number;
	setCurrentPage: (currentPage: number) => void;

	currentFilters: string;
	prevFilters: string | null;
	setCurrentFilters: (filter: string) => void;
	setPrevFilters: (prevUrl: string) => void;

	currentSearch: string;
	prevSearch: string;
	setCurrentSearch: (currentSearch: string) => void;
	setPrevSearch: (search: string) => void;

	totalCount: number;
	limit: number;

	setData: (data: any) => void;
	// setTotalCount: (totalCount: number) => void

	setLimit: (limit: number) => void;
}

class ProductsStore implements IProductsStore {
	_products: TypeProduct[] = [];
	_noveltiesProducts: TypeProduct[] = [];
	_popularProducts: TypeProduct[] = [];
	_cart: TypeCartItem[];
	_currentPage: number;
	_totalCount: number;
	_limit: number;
	_prevFilters: string | null;
	_currentFilters: string;
	_prevSearch: string;
	_currentSearch: string;

	constructor() {
		this._products = [];
		this._noveltiesProducts = [];
		this._popularProducts = [];
		this._cart = [];
		this._currentPage = 1;
		this._totalCount = 0;
		this._limit = 8;
		this._currentFilters = '';
		this._prevFilters = null;
		this._currentSearch = '';
		this._prevSearch = '';
		makeAutoObservable(this);
	}

	// Setters
	setData(data: TypeData): void {
		if (data.allProducts) {
			this._products = data.allProducts;
		}
		if (data.productsTotalCount) {
			this._totalCount = data.productsTotalCount;
		}
		if (data.productsLimit) {
			this._limit = data.productsLimit;
		}
		if (data.noveltiesProducts) {
			this._noveltiesProducts = data.noveltiesProducts;
		}
		if (data.popularProducts) {
			this._popularProducts = data.popularProducts;
		}
	}

	setCart(cart: TypeCartItem[]): void {
		this._cart = cart;
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

	get cart(): TypeCartItem[] {
		return this._cart;
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

	get noveltiesProducts(): TypeProduct[] {
		return this._noveltiesProducts;
	}

	get popularProducts(): TypeProduct[] {
		return this._popularProducts;
	}
}

export default new ProductsStore();