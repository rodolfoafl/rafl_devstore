import data from './data.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(data.products)
}
