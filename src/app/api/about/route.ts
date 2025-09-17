// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/lib/mongoose';
import AboutMe from '@/models/About';

export const GET = async (req: NextRequest) => {
    try {
        // Connect to MongoDB
        await connectToDB();

        // Fetch all jobs from the database
        const aboutMe = await AboutMe.findOne({});

        // Return JSON response
        return NextResponse.json(aboutMe, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch AboutMe:', error);
        return NextResponse.json({ error: 'Failed to fetch AboutMe' }, { status: 500 });
    }
};
