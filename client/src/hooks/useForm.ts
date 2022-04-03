import {useState} from 'react';
import {TypeCustomerDataState} from '../containers/CheckoutPageContainer';


const useForm = () => {
  const [customerData, setCustomerData] = useState<TypeCustomerDataState>({
    name: '',
    email: '',
    phone: '',
    deliveryAddrs: '',
    cartItems: []
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setCustomerData({
      ...customerData,
      [name]: value
    });
  };

  return {
    handleChange,
    customerData
  };
};

export default useForm;