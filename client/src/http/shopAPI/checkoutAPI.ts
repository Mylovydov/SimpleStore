import { $host } from '../index';

export const checkout = async (customerData: any) => {
	console.log(customerData, 'customerData');

	const { data } = await $host.post('api/create-checkout-session', customerData);
	return data.url;
};

// export const checkout = async (customerData: any) => {
//   const res = await $host.post(`api/create-checkout-session`, customerData);
//   return res;
// };