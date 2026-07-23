import { mockOrders } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(mockOrders);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newOrder = {
    id: `ORD-${Math.random().toString().slice(2, 6)}`,
    ...body,
    date: new Date(),
  };
  return NextResponse.json(newOrder, { status: 201 });
}
