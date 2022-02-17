import {useContext} from 'react';
import {ShopContext} from '../components/PublicRouter';
import {TypeBasketItem} from '../store/shop/ProductsStore';


const useUpdateBasketFunctions = () => {
    const {shopProducts} = useContext(ShopContext);

    console.log('shopProducts.basket', shopProducts.basket);

    const setProductToBasket = (id: string) => {
        const candidateForAddingToCart = shopProducts.basket.find(prod => prod._id === id);

        if (!candidateForAddingToCart) {
            const product = shopProducts.products.find(prod => prod._id === id);
            if (!product) {
                return;
            }
            const {_id, title, price, image} = product;
            shopProducts.setBasket([...shopProducts.basket, {_id, title, price, image, quantity: 1}]);

            localStorage.setItem('cart', JSON.stringify(shopProducts.basket));
        }
    };

    const changeQuantity = (id: string, isIncrease: boolean) => {
        shopProducts.setBasket(shopProducts.basket.map(item => item._id === id
            ? {...item, quantity: item.quantity + (isIncrease ? 1 : -1)}
            : item
        ));

    };

    const removeProductFromBasket = (id: string) => {
        shopProducts.setBasket(shopProducts.basket.filter(item => item._id !== id));
        const storageCartData = localStorage.getItem('cart')
        if (storageCartData) {
            const parsedStorageCartData = JSON.parse(storageCartData)
            const updatedStorageCartData = parsedStorageCartData.filter((item: TypeBasketItem) => item._id !== id)
            shopProducts.setBasket(updatedStorageCartData)
            localStorage.setItem('cart', JSON.stringify(updatedStorageCartData))
        }
    };

    return {
        setProductToBasket,
        changeQuantity,
        removeProductFromBasket
    };
};

export default useUpdateBasketFunctions;