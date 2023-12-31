import ProductCard from '@/components/product-card'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { formatPrice } from '@/utils/price-format'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: { revalidate: 60 * 60 }, // 1 hour
  })

  const products = await response.json()

  return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  const highlightedProduct =
    featuredProducts.length > 0 ? featuredProducts[0] : null
  const otherProducts =
    featuredProducts.length > 0 ? featuredProducts.slice(1) : []

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      {highlightedProduct ? (
        <Link
          href={`/product/${highlightedProduct.slug}`}
          className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
        >
          <Image
            className="group-hover:scale-105 transition-transform duration-500"
            src={highlightedProduct.image}
            width={920}
            height={920}
            quality={100}
            alt=""
          />
          <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{highlightedProduct.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {formatPrice(highlightedProduct.price, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      ) : null}

      {otherProducts && otherProducts.length > 0
        ? otherProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />
          })
        : null}
    </div>
  )
}
