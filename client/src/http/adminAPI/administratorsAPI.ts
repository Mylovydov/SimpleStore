import { $host } from '../index';
import jwt_decode from 'jwt-decode';

export const login = async (email: string, password: string) => {
	const { data } = await $host.post('api/admin/login', { email, password });
	localStorage.setItem('token', data.token);
	return jwt_decode(data.token);
};