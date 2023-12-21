import { Metadata } from 'next'
import Image from 'next/image'

import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { formatPrice } from '@/utils/price-format'

import Link from 'next/link'

interface ProductProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: { revalidate: 60 * 60 }, // 1 hour
  })

  const product = await response.json()

  return product
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug)
  const { title } = product

  return {
    title,
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  return products.map((product) => {
    return {
      slug: product.slug,
    }
  })
}

export default async function ProductPage({ params }: ProductProps) {
  const { slug } = params
  const product = await getProduct(slug)

  const availableSizes = ['P', 'M', 'G', 'GG']

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product?.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {formatPrice(product.price, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/ juros de{' '}
            {formatPrice(product.price / 12, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            {availableSizes && availableSizes.length > 0
              ? availableSizes.map((size) => {
                  return (
                    <button
                      key={size}
                      type="button"
                      className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:bg-zinc-700"
                    >
                      {size}
                    </button>
                  )
                })
              : null}
          </div>
        </div>

        <button
          type="button"
          className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white hover:bg-emerald-500"
        >
          Adicionar ao carrinho
        </button>
        <Link
          href={'/'}
          className="mt-8 flex h-12 items-center justify-center rounded-full bg-transparent border border-zinc-400 font-semibold text-white hover:bg-zinc-800"
        >
          Voltar
        </Link>
      </div>
    </div>
  )
}
