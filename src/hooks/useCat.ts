import { Cat } from '@/app/types/cat.type'

interface FetchCatProps {
  id: string
}

export const useCat = ({ id }: FetchCatProps) => {
  const fetchCat = async () => {
    try {
      const res = await fetch(`https://api.thecatapi.com/v1/images/${id}`, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_THE_CAT_API_KEY || '',
        },
      })

      if (!res.ok) {
        throw new Error('Error fetching data from TheCatAPI API')
      }

      const cat: Cat = await res.json()

      return cat
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  return { fetchCat }
}
