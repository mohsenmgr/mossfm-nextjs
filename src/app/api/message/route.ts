// app/api/prompts/route.ts
import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import Message from '@/models/Message';

export const GET = async () => {
    try {
        await checkAuthority();
        await connectToDB();
        const contacts = await Message.find({});
        return new Response(JSON.stringify(contacts), { status: 200 });
    } catch (err) {
        return new Response('Failed to fetch prompts', { status: 500 });
    }
};
