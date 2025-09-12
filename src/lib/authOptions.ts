import { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
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
      // Connect to DB before querying
      await connectToDB();

      if (!session.user?.email) return session;

      const sessionUser = await User.findOne({ email: session.user.email });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },

    async signIn({ account, profile }) {
      // Connect to DB immediately
      await connectToDB();

      if (!account || account.provider !== "google") return false;

      const googleProfile = profile as GoogleProfile;
      if (!googleProfile?.email) return false;

      const allowedEmails = ["mohsenmgr@gmail.com", "faghfourmaghrebi@gmail.com"];
      if (!allowedEmails.includes(googleProfile.email)) {
        console.warn("Unauthorized login attempt:", googleProfile.email);
        return false;
      }

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
  debug: true, // optional: logs everything to Vercel logs
};