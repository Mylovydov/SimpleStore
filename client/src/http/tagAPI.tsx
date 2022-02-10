import { $host } from './index'

export const getAllTags = async () => {
   const { data } = await $host.get('api/shop-tags')
   return data
}