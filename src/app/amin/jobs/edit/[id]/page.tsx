import JobEditClient from '@/components/admin/JobEditClient';
import { JobItem } from '@/types/JobData';

type paramsType = Promise<{ id: string }>;

type Props = {
    params: paramsType;
};

const Page = async ({ params }: Props) => {
    const { id } = await params;

    // Fetch job data on the server

    const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN_NAME + `/api/job/${id}`, {
        method: 'GET',
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch job');
    }

    const job: JobItem = await res.json();

    return <JobEditClient job={job} />;
};

export default Page;
