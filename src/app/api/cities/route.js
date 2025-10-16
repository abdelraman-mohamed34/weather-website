// /api/cities

import { NextResponse } from 'next/server'

const cities = [
    { id: 1, name: 'Cairo', country: 'Egypt' },
    { id: 2, name: 'alex', country: 'Egypt' },
]

// GET /api/cities
export async function GET() {
    return NextResponse.json(cities)
}
