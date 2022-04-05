import { $authHost, $host } from '../index';
import jwt_decode from 'jwt-decode';

export const login = async (email: string, password: string) => {
	const { data } = await $host.post('api/auth/login', { email, password });
	localStorage.setItem('token', data.token);
	const _id: string = jwt_decode(data.token);
	return _id;
};

export const check = async () => {
	const { data } = await $authHost.get('/api/auth/check-auth');
	localStorage.setItem('token', data.token);
	const _id: string = jwt_decode(data.token);
	return _id;
};