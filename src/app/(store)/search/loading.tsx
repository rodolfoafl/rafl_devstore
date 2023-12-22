'use client'

import Skeleton from '@/components/skeleton'
import { useSearchParams } from 'next/navigation'

export default function SearchLoading() {
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg">
        Buscando resultados para:{' '}
        <span className="text-xl font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[496px]" />
        <Skeleton className="h-[496px]" />
        <Skeleton className="h-[496px]" />
      </div>
    </div>
  )
}
