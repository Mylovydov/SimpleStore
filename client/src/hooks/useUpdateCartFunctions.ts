import {useContext} from 'react';
import {ShopContext} from '../components/PublicRouter';
import {TypeCartItem} from '../store/shop/ProductsStore';


const useUpdateCartFunctions = () => {
    const {shopProducts} = useContext(ShopContext);

    // console.log('shopProducts.basket', shopProducts.cart);

    const setProductToCart = (id: string) => {
        const candidateForAddingToCart = shopProducts.cart.find(prod => prod._id === id);

        if (!candidateForAddingToCart) {
            const product = shopProducts.products.find(prod => prod._id === id);
            if (!product) {
                return;
            }
            const {_id, title, price, image} = product;
            shopProducts.setCart([...shopProducts.cart, {_id, title, price, image, quantity: 1}]);

            localStorage.setItem('cart', JSON.stringify(shopProducts.cart));
        }
    };

    const changeQuantity = (id: string, isIncrease: boolean) => {
        shopProducts.setCart(shopProducts.cart.map(item => item._id === id
            ? {...item, quantity: item.quantity + (isIncrease ? 1 : -1)}
            : item
        ));
    };

    const removeProductFromCart = (id: string) => {
        const updatedCartData = shopProducts.cart.filter(item => item._id !== id);
        shopProducts.setCart(updatedCartData);
        localStorage.setItem('cart', JSON.stringify(updatedCartData));
    };

    return {
        setProductToCart,
        changeQuantity,
        removeProductFromCart
    };
};

export default useUpdateCartFunctions;