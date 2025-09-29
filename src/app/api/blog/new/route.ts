// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import BlogPost from '@/models/BlogPost';

export const POST = async (req: NextRequest) => {
    try {
        await checkAuthority();
        // Connect to MongoDB
        await connectToDB();
        const { title, content, photos } = await req.json();
        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required' });
        }

        const slug = title.toLowerCase().replace(/\s+/g, '-');

        const newPost = new BlogPost({
            title,
            content,
            author: 'MossFM',
            photos: photos || [],
            slug
        });

        await newPost.save();

        // Return JSON response
        return NextResponse.json({ message: 'Blog post created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Failed to create job:', error);
        return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
    }
};
