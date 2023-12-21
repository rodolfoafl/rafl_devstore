import { z } from 'zod'
import data from '../data.json'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  if (request.method !== 'GET') {
    return Response.json({ message: 'Method not allowed' }, { status: 405 })
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const slug = z.string().parse(params.slug)

  const product = data.products.find((product) => product.slug === slug)
  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 400 })
  }

  return Response.json(product)
}
