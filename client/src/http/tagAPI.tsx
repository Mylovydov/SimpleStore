import { $host } from './index'

export const getAllTags = async () => {
   const { data } = await $host.get('api/tags')
   return data
}