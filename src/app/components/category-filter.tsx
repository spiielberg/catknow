import { Loading } from '@/app/components/loading'
import { Category } from '@/app/types/category.type'
import { Button } from '@/components/ui/button'
import { useCategories } from '@/hooks/useCategories'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface CategoryFilterProps {
  categoryId: number | undefined
  handleChangeCategory: (categoryId: number | undefined) => void
  disabled?: boolean
}

export const CategoryFilter = ({
  categoryId,
  handleChangeCategory,
  disabled,
}: CategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { fetchCategories } = useCategories()

  useEffect(() => {
    fetchCategories().then((categories) => {
      if (categories) {
        setCategories(categories)
      }
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-16 w-full items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-[calc(100vw-5rem)] space-x-2 overflow-x-auto">
      {categories.map((category, index) => (
        <Button
          key={`${category.id}-${index}`}
          className={cn(
            'text-md flex items-center justify-center rounded-full border border-primary-purple/80 bg-white text-primary-purple/80 hover:bg-white',
            categoryId === category.id &&
              'bg-primary-purple/80 text-white hover:bg-primary-purple/60',
          )}
          onClick={() =>
            handleChangeCategory(
              categoryId !== category.id ? category.id : undefined,
            )
          }
          disabled={disabled}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}
