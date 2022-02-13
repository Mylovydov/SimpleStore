import { $host } from '../index'

export const getAllProducts = async (filter: string) => {
   const { data } = await $host.get(`api/catalog/${filter}`)
   return data
}

export const getOneProduct = async (slug: string) => {
   const { data } = await $host.get(`api/catalog/one-product/${slug}`)
   return data
}