import { Product } from '@/data/types/product'
import { formatPrice } from '@/utils/price-format'
import Link from 'next/link'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

export default function ProductCard({
  product,
  isOnHomePage = true,
}: {
  product: Product
  isOnHomePage?: boolean
}) {
  const { id, slug, image, title, price } = product

  const onHomePageClassesToAdd = 'col-span-3 row-span-3'

  return (
    <Link
      key={id}
      href={`/product/${slug}`}
      className={twMerge(
        'group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end',
        isOnHomePage && onHomePageClassesToAdd,
      )}
    >
      <Image
        className="group-hover:scale-105 transition-transform duration-500"
        src={image}
        width={920}
        height={920}
        quality={100}
        alt=""
      />
      <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
        <span className="text-sm truncate">{title}</span>
        <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
          {formatPrice(price, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </span>
      </div>
    </Link>
  )
}
