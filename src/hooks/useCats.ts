import { Cat } from '@/app/types/cat.type'

interface FetchCatsProps {
  page: number
  categoryId: number | undefined
}

export const useCats = ({ page, categoryId }: FetchCatsProps) => {
  const fetchCats = async () => {
    try {
      const res = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}${categoryId ? `&category_ids=${categoryId}` : ''}`,
        {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_THE_CAT_API_KEY || '',
          },
        },
      )

      if (!res.ok) {
        throw new Error('Error fetching data from TheCatAPI API')
      }

      const cats: Cat[] = await res.json()

      return cats
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  return { fetchCats }
}
