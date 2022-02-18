import {useCallback, useContext} from 'react';
import {ShopContext} from '../components/PublicRouter';
import {TypeProduct} from '../store/admin/ProductStore';


const useUpdateCartFunctions = () => {
    const {shopProducts} = useContext(ShopContext);

    const setProductToCart = useCallback((product: TypeProduct) => {
        console.log('product', product);
        const candidateForAddingToCart = shopProducts.cart.find(cartItem => cartItem._id === product._id);

        if (!candidateForAddingToCart) {
            const {_id, title, price, image} = product;
            shopProducts.setCart([...shopProducts.cart, {_id, title, price, image, quantity: 1}]);

            localStorage.setItem('cart', JSON.stringify(shopProducts.cart));
        }
    }, [shopProducts.products, shopProducts.cart]);

    const changeQuantity = useCallback((id: string, isIncrease: boolean) => {
        shopProducts.setCart(shopProducts.cart.map(item => item._id === id
            ? {...item, quantity: item.quantity + (isIncrease ? 1 : -1)}
            : item
        ));
    }, [shopProducts.cart]);

    const removeProductFromCart = useCallback((id: string) => {
        const updatedCartData = shopProducts.cart.filter(item => item._id !== id);
        shopProducts.setCart(updatedCartData);
        localStorage.setItem('cart', JSON.stringify(updatedCartData));
    }, [shopProducts.cart]);

    return {
        setProductToCart,
        changeQuantity,
        removeProductFromCart
    };
};

export default useUpdateCartFunctions;