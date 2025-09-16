import { useCallback, useEffect, useState } from 'react';

import cld from '@/lib/cloudinaryClient';
import type { FeedImage } from '@/types/feed';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

export interface PaginatedResponse<T> {
    posts: T[];
    total: number;
    page: number;
    limit: number;
}

export interface FeedItemBase {
    _id: string;
    imageUrl: FeedImage | null; // now normalized
}

/**
 * Extract the publicId part from a Cloudinary URL
 */
function extractPublicId(url: string): string {
    if (!url) return '';

    const parts = url.split('/upload/');
    if (parts.length < 2) return url;

    let afterUpload = parts[1].split(/[?#]/)[0];

    // Remove version prefix like v123456789/
    afterUpload = afterUpload.replace(/^v[0-9]+\/?/, '');

    // Remove file extension (.jpg, .png, etc.)
    afterUpload = afterUpload.replace(/\.[a-zA-Z0-9]+$/, '');

    return afterUpload;
}

export function useFeedFetch<T extends FeedItemBase>(url: string, limit = 5) {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPage = useCallback(
        async (pageNumber: number) => {
            setLoading(true);
            try {
                const res = await fetch(`${url}&page=${pageNumber}&limit=${limit}`);
                if (!res.ok) throw new Error('Failed to fetch feed');

                const json: PaginatedResponse<T> = await res.json();

                const updatedPosts = json.posts.map((item) => {
                    if (!item.imageUrl) {
                        return { ...item, imageUrl: null };
                    }

                    try {
                        const publicId = extractPublicId(
                            typeof item.imageUrl === 'string' ? item.imageUrl : ((item.imageUrl as any).value ?? '')
                        );

                        if (!publicId) {
                            return {
                                ...item,
                                imageUrl: { type: 'url', value: item.imageUrl as unknown as string } as FeedImage
                            };
                        }

                        const img = cld
                            .image(publicId)
                            .format('auto')
                            .quality('auto')
                            .resize(fill().width(500).height(500).gravity(autoGravity()));

                        return {
                            ...item,
                            imageUrl: { type: 'cloudinary', value: img } as FeedImage
                        };
                    } catch {
                        return {
                            ...item,
                            imageUrl: { type: 'url', value: item.imageUrl as unknown as string } as FeedImage
                        };
                    }
                });

                setData((prev) => (pageNumber === 1 ? updatedPosts : [...prev, ...updatedPosts]));
                setTotal(json.total);
            } catch (err: any) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        },
        [url, limit]
    );

    useEffect(() => {
        fetchPage(page);
    }, [page, fetchPage]);

    const loadMore = () => {
        if (data.length < total && !loading) {
            setPage((prev) => prev + 1);
        }
    };

    const refresh = async () => {
        setPage(1);
        setTotal(0);
        await fetchPage(1);
    };

    const removeItem = (id: string) => {
        setData((prev) => prev.filter((item) => item._id !== id));
        setTotal((prev) => prev - 1);
    };

    const updateItem = (id: string, updatedFields: Partial<T>) => {
        setData((prev) => prev.map((item) => (item._id === id ? { ...item, ...updatedFields } : item)));
    };

    const hasMore = data.length < total;

    return { data, loading, error, loadMore, refresh, removeItem, updateItem, hasMore };
}
