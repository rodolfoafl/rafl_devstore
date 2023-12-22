'use client'

import { useSearchParams } from 'next/navigation'

export default function CurrentSearch() {
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  return (
    <p className="text-lg">
      Buscando resultados para:{' '}
      <span className="text-xl font-semibold">{query}</span>
    </p>
  )
}
