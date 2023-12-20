import data from '../data.json'

type Product = {
  id: number
  title: string
  slug: string
  price: number
  image: string
  description: string
  featured: boolean
}

export async function GET() {
  const featuredProducts = data.products.filter(
    (product: Product) => product.featured,
  )

  return Response.json(featuredProducts)
}
