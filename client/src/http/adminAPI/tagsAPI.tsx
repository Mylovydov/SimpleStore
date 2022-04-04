import {TypeTag} from '../../store/admin/TagStore';
import {$authHost} from '../index';

export const createTag = async (tag: Omit<TypeTag, '_id' | 'createdDate' | 'updatedDate'>) => {
	const {data} = await $authHost.post('api/tags/create', tag);
	return data;
};

export const getAllTags = async () => {
	const {data} = await $authHost.get('api/tags');
	return data;
};