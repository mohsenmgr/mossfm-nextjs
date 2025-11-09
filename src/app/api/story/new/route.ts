// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import { StreamUpload } from '@/lib/streamUpload';
import Story from '@/models/Story';

import { User } from 'lucide-react';

export const POST = async (req: NextRequest) => {
    try {
        await checkAuthority();

        // Connect to MongoDB
        await connectToDB();

        const formData = await req.formData();

        const file = formData.get('file') as File;
        const mediaType = (formData.get('mediaType') as string) || 'image';

        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

        const result = await StreamUpload(formData);

        await Story.create({
            userId: 'admin',
            mediaUrl: result.secure_url,
            mediaType
        });

        // Return JSON response
        return NextResponse.json({ message: 'Story created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Failed to create story:', error);
        return NextResponse.json({ error: 'Failed to create story' }, { status: 500 });
    }
};
