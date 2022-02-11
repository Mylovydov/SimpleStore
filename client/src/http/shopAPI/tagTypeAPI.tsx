import { $host } from '../index'

export const getAllTagTypes = async () => {
   const { data } = await $host.get('api/shop-types')
   return data
}