// app/api/message/new/route.ts
import connectToDB from '@/lib/mongoose';
import Message from '@/models/Message';
import { IMessagePayload } from '@/models/Message';

interface MessageRequest extends IMessagePayload {
    captchaToken: string;
}

export const POST = async (req: Request) => {
    try {
        const { name, email, subject, message, captchaToken }: MessageRequest = await req.json();

        // 1️⃣ Verify reCAPTCHA
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const recaptchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${secretKey}&response=${captchaToken}`
        });
        const recaptchaData = await recaptchaRes.json();

        if (!recaptchaData.success) {
            return new Response(JSON.stringify({ error: 'reCAPTCHA verification failed' }), { status: 400 });
        }

        // 2️⃣ Connect to database
        await connectToDB();

        // 3️⃣ Save contact message
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();

        return new Response(JSON.stringify(newMessage), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to save contact message', { status: 500 });
    }
};
