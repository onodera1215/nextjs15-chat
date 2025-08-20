// types/next-auth.d.ts
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    nestAccessToken?: string;
    user: { id?: string; roles?: string[] } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    nestAccessToken?: string;
    roles?: string[];
  }
}
