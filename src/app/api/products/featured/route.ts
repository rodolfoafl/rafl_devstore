import data from '../data.json'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  if (request.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const featuredProducts = data.products.filter((product) => product.featured)

  return NextResponse.json(featuredProducts)
}
