import { Breed } from '@/app/types/breed.type'

export interface Cat {
  id: string
  width: number
  height: number
  url: string
  breeds: Breed[]
}
