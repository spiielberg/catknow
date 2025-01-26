'use client'

import { CatCard } from '@/app/components/cat-card'
import { CategoryFilter } from '@/app/components/category-filter'
import { Loading } from '@/app/components/loading'
import { Cat } from '@/app/types/cat.type'
import { useCats } from '@/hooks/useCats'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [categoryId, setCategoryId] = useState<number>()
  const loaderRef = useRef<HTMLDivElement | null>(null)

  const { fetchCats } = useCats({ page, categoryId })

  const handleChangeCategory = (categoryId: number | undefined) => {
    setCategoryId(categoryId)
    setCats([])
    setPage(0)
    setHasMore(true)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          if (isLoading) return
          setIsLoading(true)
          fetchCats().then((newCats) => {
            if (newCats) {
              setCats((prevCats) => [...prevCats, ...newCats])
              setPage((prevPage) => prevPage + 1)
            } else {
              setHasMore(false)
            }
            setIsLoading(false)
          })
        }
      },
      { root: null, rootMargin: '16px', threshold: 0.1 },
    )

    const currentLoaderRef = loaderRef.current

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef)
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef)
      }
    }
  }, [isLoading, fetchCats, hasMore])

  return (
    <div className="flex flex-col gap-y-4">
      <CategoryFilter
        categoryId={categoryId}
        handleChangeCategory={handleChangeCategory}
        disabled={isLoading}
      />
      <div className="max-h-[calc(100dvh-5rem-4rem-2.5rem-2.25rem-1rem)] overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((cat, index) => (
            <CatCard key={`${cat.id}-${index}`} cat={cat} />
          ))}
        </div>

        <div
          ref={loaderRef}
          className="flex h-16 w-full items-center justify-center"
        >
          {isLoading && <Loading />}
          {!hasMore && (
            <p className="mt-4 text-center text-black">No more cats 🐾</p>
          )}
        </div>
      </div>
    </div>
  )
}
