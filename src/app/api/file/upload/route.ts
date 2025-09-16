import { NextRequest, NextResponse } from 'next/server';

import cloudinary from '@/lib/cloudinary';

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const folderName = formData.get('folderName') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult: any = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: folderName }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            stream.end(buffer);
        });

        return NextResponse.json(
            {
                message: 'Upload successful',
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to upload' }, { status: 500 });
    }
};
