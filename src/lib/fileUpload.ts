export const FileUpload = async (files: File[], fileType: 'image' | 'pdf', folder: string): Promise<string[]> => {
    try {
        const uploadedUrls: string[] = [];
        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
            formData.append('folder', folder);

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/${fileType}/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            const data = await uploadRes.json();
            if (data.secure_url) {
                uploadedUrls.push(data.secure_url);
            }
        }

        return uploadedUrls;
    } catch (err) {
        throw new Error('File upload failed');
    }
};
