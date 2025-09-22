// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Job from '@/models/Job';
import { JobItem } from '@/types/JobData';

export const POST = async (req: NextRequest) => {
    try {
        // Connect to MongoDB
        await connectToDB();

        const jobItem: JobItem = await req.json();

        const newJob = new Job(jobItem);

        await newJob.save();

        // Return JSON response
        return NextResponse.json({ message: 'Job created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Failed to create job:', error);
        return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
    }
};
