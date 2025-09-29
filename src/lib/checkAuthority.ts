import { unauthorizedError } from '@/types/errors';

import { authOptions } from './authOptions';
import { getServerSession } from 'next-auth';

const checkAuthority = async function () {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
        throw unauthorizedError();
    }
};

export default checkAuthority;
