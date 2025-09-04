// app/api/prompts/route.ts
import connectToDB from '@/lib/mongoose';
import Prompt from '@/models/prompt';

export const GET = async () => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({});
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};