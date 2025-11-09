import { NextRequest, NextResponse } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import { StreamUpload } from '@/lib/streamUpload';

export const POST = async (req: NextRequest) => {
    try {
        await checkAuthority();

        const formData = await req.formData();
        const uploadResult = await StreamUpload(formData);

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
