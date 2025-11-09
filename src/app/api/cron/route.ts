import { NextRequest, NextResponse } from 'next/server';

import { cleanupExpiredStories } from '@/lib/cleanupStories';

export async function GET(req: NextRequest) {
    // Verify authorization header to protect your endpoint
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await cleanupExpiredStories();
        return NextResponse.json({ success: true, message: 'Expired stories cleaned up' });
    } catch (error: any) {
        console.error('Cron cleanup failed:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
