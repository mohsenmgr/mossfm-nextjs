import JobEditClient from '@/components/admin/JobEditClient';
import { JobItem } from '@/types/JobData';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
    const { id } = await params;

    // Fetch job data on the server
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/job/${id}`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch job');
    }

    const job: JobItem = await res.json();

    return <JobEditClient job={job} />;
}
