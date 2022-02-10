import { $authHost } from '../index'

export const createProduct = async (product: FormData) => {
    const { data } = await $authHost.post('api/products', product)
    return data
}

export const getAllProducts = async () => {
    const { data } = await $authHost.get('api/products')
    return data
}
 
export const getOneProduct = async (id: string) => {
    const { data } = await $authHost.get(`api/products/${id}`)
    return data
}