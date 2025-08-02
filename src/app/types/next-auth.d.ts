// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

// Extending NextAuth default session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      useremail: string;
      username: string;
      image?: string | null;
    } & DefaultSession["user"]; // Merge with the default user object from NextAuth
  }

  interface User {
    id: string;
    useremail: string;
    username: string;
  }

  interface JWT {
    id: string;
    useremail: string;
    username: string;
  }
}
