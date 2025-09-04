import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface GoogleProfile extends Profile {
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
  }
}

