import axios from 'axios';

// Запросы, которые не требуют авторизации
const $host = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

// Запросы, которые требуют авторизации
const $authHost = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

const authInterceptor = (config: any) => {
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
};

// Интерцептор для запроса
$authHost.interceptors.request.use(authInterceptor);
// Можно сделать и для ответа

export {
	$host,
	$authHost
};
