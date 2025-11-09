// src/app/api/cleanup/route.ts
import { NextResponse } from 'next/server';

import { cleanupExpiredStories } from '@/lib/cleanupStories';

export async function GET() {
    await cleanupExpiredStories();
    return NextResponse.json({ message: 'Expired stories cleaned up' });
}
