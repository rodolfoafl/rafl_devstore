import ProductCard from '@/components/product-card'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { redirect } from 'next/navigation'

interface SearchPageProps {
  searchParams: {
    q: string
  }
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: { revalidate: 60 * 60 }, // 1 hour
  })

  const products = await response.json()

  return products
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = searchParams
  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      {products && products.length > 0 && (
        <p className="text-lg">
          {products.length} resultado{products.length > 1 && 's'} para:{' '}
          <span className="text-xl font-semibold">{query}</span>
        </p>
      )}

      <div className="grid grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                isOnHomePage={false}
              />
            )
          })
        ) : (
          <p className="text-lg">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  )
}
