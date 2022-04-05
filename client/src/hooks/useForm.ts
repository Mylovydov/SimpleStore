import { ChangeEvent, useCallback, useState } from 'react';
import { TypeCustomerDataState } from '../containers/CheckoutPageContainer';
import editPhone from '../utils/editPhone';

const useForm = () => {
	const [customerData, setCustomerData] = useState<TypeCustomerDataState>({
		name: '',
		email: '',
		phone: '',
		deliveryAddrs: '',
		cartItems: []
	});

	const clearDeliveryAddrs = () => {
		setCustomerData((state => ({
			...state,
			deliveryAddrs: ''
		})));
	};

	const [errors, setErrors] = useState({});

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		switch (name) {
			case 'phone':
				setCustomerData({
					...customerData,
					[name]: editPhone(value)
				});
				break;
			default:
				setCustomerData((customerData) => ({
					...customerData,
					[name]: value
				}));
		}
	}, []);

	return {
		handleChange,
		customerData,
		clearDeliveryAddrs
	};
};

export default useForm;