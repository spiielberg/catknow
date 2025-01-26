import { Cat } from '@/app/types/cat.type'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface CatCardProps {
  cat: Cat
  disabled?: boolean
}

export const CatCard = ({ cat, disabled }: CatCardProps) => {
  return (
    <Link
      href={!disabled ? `/cat/${cat.id}` : ''}
      className={cn(
        'border-primary-purple flex flex-col items-stretch overflow-hidden rounded-2xl border',
        !disabled && 'cursor-pointer',
      )}
    >
      <Image
        src={cat.url}
        alt={cat.id}
        width={cat.width}
        height={cat.height}
        className="pointer-events-none aspect-square w-full object-cover"
      />

      <div className="pointer-events-none h-10 px-[10px] py-2">
        {!!cat.breeds?.length && (
          <p className="text-md text-primary-purple text-center font-bold">
            {cat.breeds[0].name}
          </p>
        )}
      </div>
    </Link>
  )
}
