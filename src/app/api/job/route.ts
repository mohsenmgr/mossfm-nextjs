// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Job from '@/models/Job';

export const GET = async (req: NextRequest) => {
    try {
        let jobs = null;

        // Connect to MongoDB
        await connectToDB();

        const url = new URL(req.url);
        const page = Number(url.searchParams.get('page') || 1);
        const limit = Number(url.searchParams.get('limit') || 2);

        const admin = url.searchParams.get('admin') === 'true';

        if (!admin) {
            jobs = await Job.find({})
                .sort({ dateStart: -1 })
                .skip((page - 1) * limit)
                .limit(limit);
        } else {
            // Fetch all jobs from the database
            jobs = await Job.find({}).sort({ dateStart: -1 });
        }

        // Return JSON response
        return new Response(JSON.stringify(jobs));
    } catch (error) {
        console.error('Failed to fetch jobs:', error);
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }
};
