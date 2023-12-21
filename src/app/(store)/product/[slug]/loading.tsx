import Skeleton from '@/components/skeleton'

export default function ProductLoading() {
  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <Skeleton className="col-span-3 row-span-3 h-[860px]" />
    </div>
  )
}
