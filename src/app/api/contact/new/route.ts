// app/api/contact/new/route.ts
import connectToDB from '@/lib/mongoose';
import Contact from "@models/Contact";

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  captchaToken: string;
}

export const POST = async (req: Request) => {
  try {
    const { name, email, subject, message, captchaToken }: ContactRequest = await req.json();

    // 1️⃣ Verify reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${captchaToken}`,
    });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return new Response(JSON.stringify({ error: "reCAPTCHA verification failed" }), { status: 400 });
    }

    // 2️⃣ Connect to database
    await connectToDB();

    // 3️⃣ Save contact message
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    return new Response(JSON.stringify(newContact), { status: 201 });

  } catch (error) {
    console.error(error);
    return new Response("Failed to save contact message", { status: 500 });
  }
};