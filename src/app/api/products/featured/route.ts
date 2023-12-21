import data from '../data.json'

export async function GET(request: Request) {
  if (request.method !== 'GET') {
    return Response.json({ message: 'Method not allowed' }, { status: 405 })
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const featuredProducts = data.products.filter((product) => product.featured)

  return Response.json(featuredProducts)
}
