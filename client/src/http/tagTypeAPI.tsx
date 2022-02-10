import { $host } from './index'

export const getAllTagTypes = async () => {
   const { data } = await $host.get('api/types')
   return data
}