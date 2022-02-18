export const addToCart = (setProductToCart: (id: string) => void) => (id: string) => {
    setProductToCart(id);
};