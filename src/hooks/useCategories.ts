import { Category } from '@/app/types/category.type'

export const useCategories = () => {
  const fetchCategories = async () => {
    try {
      const res = await fetch('https://api.thecatapi.com/v1/categories', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_THE_CAT_API_KEY || '',
        },
      })

      if (!res.ok) {
        throw new Error('Error fetching data from TheCatAPI API')
      }

      const categories: Category[] = await res.json()

      return categories
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  return { fetchCategories }
}
