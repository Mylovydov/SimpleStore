import { TypeTagType } from '../../store/admin/TagTypeStore';
import { $authHost } from '../index';

export const createTagType = async (tagType: Omit<TypeTagType, '_id' | 'createdDate' | 'updatedDate'>) => {
	const { data } = await $authHost.post('api/tag-types/create', tagType);
	return data;
};

export const getAllTagTypes = async () => {
	const { data } = await $authHost.get('api/tag-types/');
	return data;
};