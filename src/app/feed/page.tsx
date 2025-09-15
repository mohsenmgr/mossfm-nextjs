'use client';

import Feed from '@/components/Feed';

export default function Page() {
    return (
        <div className='min-h-screen bg-gray-100 p-6 dark:bg-gray-950'>
            <Feed
                apiUrl='/api/feed?public=true' // feed endpoint with public=true to hide hidden posts
                profileImage='/images/mohsen.png'
                authorName='Mohsen FM'
            />
        </div>
    );
}
