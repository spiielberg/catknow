'use client'

import { CatCard } from '@/app/components/cat-card'
import { Loading } from '@/app/components/loading'
import { Cat } from '@/app/types/cat.type'
import { useCat } from '@/hooks/useCat'
import { Usable, use, useEffect, useState } from 'react'

interface CatPageProps {
  params: {
    id: string
  }
}

const CatPage = ({ params }: CatPageProps) => {
  const { id } = use<CatPageProps['params']>(
    params as unknown as Usable<CatPageProps['params']>,
  )

  const [cat, setCat] = useState<Cat>()
  const [isLoading, setIsLoading] = useState(true)

  const { fetchCat } = useCat({ id })

  useEffect(() => {
    fetchCat().then((cat) => {
      if (cat) {
        setCat(cat)
      }
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (isLoading) {
    return (
      <div className="flex h-screen max-h-[calc(100vh-11.5rem)] w-full items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (!cat) {
    return (
      <div className="flex h-screen max-h-[calc(100vh-11.5rem)] w-full items-center justify-center">
        <p>Failed to fetch cat</p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center gap-8 md:flex-row md:items-start">
      <div className="w-full md:w-1/2">
        <CatCard cat={cat} />
      </div>
      <div className="grid w-full grid-cols-[auto_auto] flex-col gap-x-1 gap-y-4 md:w-1/2">
        {cat.breeds?.length ? (
          <>
            <p className="text-md font-bold">Name:</p>
            <p className="text-md">{cat.breeds[0].name}</p>
            <p className="text-md font-bold">Description:</p>
            <p className="text-md">{cat.breeds[0].description}</p>
            <p className="text-md font-bold">Life Span:</p>
            <p className="text-md">{cat.breeds[0].life_span}</p>
            <p className="text-md font-bold">Origin:</p>
            <p className="text-md">{cat.breeds[0].origin}</p>
          </>
        ) : (
          <div className="w-full">
            <p>We don&apos;t have data about this cat.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CatPage
