import NextAuth from "next-auth";
import type { User as NextAuthUser, Account, Profile, GoogleProfile } from "next-auth";

import GoogleProvider  from 'next-auth/providers/google'
import connectToDB from '@/lib/mongoose';

import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
  async session({ session }) {
    const sessionUser = await User.findOne({ email: session.user?.email });

    if (session.user && sessionUser) {
      session.user.id = sessionUser._id.toString();
    }

    return session;
  },

    async signIn({ account, profile }) {
        try {
            if (!account || account.provider !== "google") return false;

            const googleProfile = profile as GoogleProfile | undefined;

            if (!googleProfile?.email) return false;

            // ✅ Replace with your own email(s)
            const allowedEmails = ["mohsenmgr@gmail.com","faghfourmaghrebi@gmail.com"];

            if (!allowedEmails.includes(googleProfile.email)) {
            console.warn("Unauthorized login attempt by:", googleProfile.email);
            return false; // ❌ Reject anyone else
            }

            await connectToDB();

            const userExists = await User.findOne({ email: googleProfile.email });

            if (!userExists) {
            await User.create({
                email: googleProfile.email,
                username: googleProfile.name.replace(/\s/g, "").toLowerCase(),
                image: googleProfile.picture,
            });
            }

            return true; // ✅ Allow only your email
        } catch (error) {
            console.error("SignIn error:", error);
            return false;
        }
        },

}


    
});

export {handler as GET, handler as POST};