export const removeFromCart = (removeProductFromCart: (id: string) => void) => (id: string) => {
    removeProductFromCart(id)
}