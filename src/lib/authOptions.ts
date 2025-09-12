import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDB from "@/lib/mongoose";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
      if (!account || account.provider !== "google") return false;
      const googleProfile = profile as any;

      if (!googleProfile?.email) return false;

      const allowedEmails = ["mohsenmgr@gmail.com", "faghfourmaghrebi@gmail.com"];
      if (!allowedEmails.includes(googleProfile.email)) {
        console.warn("Unauthorized login attempt:", googleProfile.email);
        return false;
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

      return true;
    },
  },
};