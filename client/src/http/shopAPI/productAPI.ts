import {$host} from '../index';

export const getAllProducts = async (filter: string) => {
	const {data} = await $host.get(`api/catalog/${filter}`);
	return data;
};

export const getPaginatedProducts = async (paginationData: string) => {
	const {data} = await $host.get(`api/catalog/paginated/${paginationData}`);
	return data;
};

export const getOneProduct = async (slug: string) => {
	const {data} = await $host.get(`api/catalog/one-product/${slug}`);
	return data;
};

export const getNoveltiesAndPopular = async () => {
	const {data} = await $host.get(`api/catalog/novelties-popular/`);
	return data;
};