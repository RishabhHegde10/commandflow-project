import { chartData, dashboardStats } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    chartData,
    stats: dashboardStats,
    timestamp: new Date(),
  });
}
