import { useCallback, useEffect, useState } from 'react';

export interface PaginatedResponse<T> {
    posts: T[];
    total: number;
    page: number;
    limit: number;
}

export function useFeedFetch<T extends { _id: string }>(url: string, limit = 5) {
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
                if (!res.ok) throw new Error('Failed to fetch');

                const json: PaginatedResponse<T> = await res.json();

                setData((prev) => (pageNumber === 1 ? json.posts : [...prev, ...json.posts]));
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
        await fetchPage(1); // force reload immediately
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
