import cloudinary from '@/lib/cloudinary';

type UploadResult = {
    secure_url: string;
    public_id: string;
};

export const StreamUpload = async (formData: FormData): Promise<UploadResult> => {
    try {
        const file = formData.get('file') as File;
        const folderName = (formData.get('folder') as string) || 'general';

        if (!file) {
            throw new Error('No file provided');
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: folderName }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            stream.end(buffer);
        });
        if (
            !uploadResult ||
            typeof uploadResult !== 'object' ||
            !('secure_url' in uploadResult) ||
            !('public_id' in uploadResult)
        ) {
            throw new Error('Invalid upload result');
        }

        return uploadResult as UploadResult;
    } catch (err) {
        throw new Error('File upload failed');
    }
};
